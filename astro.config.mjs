// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import path from 'node:path';

/**
 * Astro Integration that:
 * 1. Computes cryptographic SHA-384 hashes for all static scripts and injects Subresource Integrity (SRI).
 * 2. Computes cryptographic SHA-256 hashes for all inline <style> tags and injects them into CSP headers.
 * 3. Eliminates 'unsafe-inline' from style-src in public/_headers and dist/_headers.
 */
function sriAndCspIntegration() {
  return {
    name: 'sri-and-csp-injector',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        logger.info('Processing SRI hashes and CSP style hashes...');
        const distDir = fileURLToPath(dir);
        const indexPath = path.join(distDir, 'index.html');

        try {
          let html = fs.readFileSync(indexPath, 'utf-8');

          // 1. Inject SRI for external scripts
          const scriptRegex = /<script\s+([^>]*?)src=[\"']([^\"']+)[\"']([^>]*?)><\/script>/g;
          html = html.replace(scriptRegex, (match, before, src, after) => {
            if (before.includes('integrity=') || after.includes('integrity=')) return match;
            const filePath = path.join(distDir, src.startsWith('/') ? src.slice(1) : src);
            if (fs.existsSync(filePath)) {
              const fileContent = fs.readFileSync(filePath);
              const hash = 'sha384-' + crypto.createHash('sha384').update(fileContent).digest('base64');
              const cleanBefore = before.trim();
              const cleanAfter = after.trim();
              return `<script ${cleanBefore ? cleanBefore + ' ' : ''}src="${src}" integrity="${hash}" crossorigin="anonymous"${cleanAfter ? ' ' + cleanAfter : ''}></script>`;
            }
            return match;
          });

          // 2. Extract hashes from all inline <style> tags
          const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
          const styleHashes = styleMatches.map(m => {
            const h = crypto.createHash('sha256').update(m[1]).digest('base64');
            return `'sha256-${h}'`;
          });

          fs.writeFileSync(indexPath, html, 'utf-8');
          logger.info(`Successfully injected SRI and found ${styleHashes.length} inline style tags.`);

          // 3. Update Content-Security-Policy in _headers files (dist and public)
          const updateHeaders = (headersPath) => {
            if (!fs.existsSync(headersPath)) return;
            let headers = fs.readFileSync(headersPath, 'utf-8');
            
            // Build style-src directive without 'unsafe-inline' and without googleapis
            const styleSources = ["'self'", ...styleHashes].join(' ');
            
            headers = headers.replace(
              /style-src\s+[^;]+;/g,
              `style-src ${styleSources};`
            );
            
            // Also ensure font-src is strictly 'self' data: (no google gstatic needed)
            headers = headers.replace(
              /font-src\s+[^;]+;/g,
              `font-src 'self' data:;`
            );

            fs.writeFileSync(headersPath, headers, 'utf-8');
          };

          updateHeaders(path.join(distDir, '_headers'));
          updateHeaders(path.join(process.cwd(), 'public', '_headers'));
          logger.info('Updated Content-Security-Policy in _headers with strict style hashes (unsafe-inline eliminated).');
        } catch (err) {
          logger.error('Failed in SRI/CSP integration: ' + String(err));
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  integrations: [sriAndCspIntegration()],
});
