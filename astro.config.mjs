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

          // 1. Transform bundled module scripts into deferred low-priority classic scripts (IIFE-wrapped)
          // and inject Subresource Integrity (SRI) for all external scripts
          const scriptRegex = /<script\s+([^>]*?)src=[\"']([^\"']+)[\"']([^>]*?)><\/script>/g;
          html = html.replace(scriptRegex, (match, before, src, after) => {
            if (before.includes('integrity=') || after.includes('integrity=')) return match;
            const filePath = path.join(distDir, src.startsWith('/') ? src.slice(1) : src);
            if (fs.existsSync(filePath)) {
              let fileContent = fs.readFileSync(filePath, 'utf-8');
              const isModule = /\btype=[\"']module[\"']/i.test(before) || /\btype=[\"']module[\"']/i.test(after);
              if (isModule && src.startsWith('/_astro/')) {
                if (!fileContent.startsWith('(()=>{')) {
                  fileContent = `(()=>{${fileContent.trim()}})();\n`;
                  fs.writeFileSync(filePath, fileContent, 'utf-8');
                }
              }
              const hash = 'sha384-' + crypto.createHash('sha384').update(fileContent, 'utf-8').digest('base64');
              const cleanBefore = before.replace(/\btype=[\"']module[\"']/gi, '').trim();
              const cleanAfter = after.replace(/\btype=[\"']module[\"']/gi, '').trim();
              const hasDefer = /\bdefer\b/i.test(cleanBefore) || /\bdefer\b/i.test(cleanAfter);
              const hasFetchPriority = /\bfetchpriority=/i.test(cleanBefore) || /\bfetchpriority=/i.test(cleanAfter);
              const extraAttrs = [
                !hasDefer ? 'defer' : '',
                !hasFetchPriority ? 'fetchpriority="low"' : '',
              ].filter(Boolean).join(' ');
              return `<script ${cleanBefore ? cleanBefore + ' ' : ''}${extraAttrs ? extraAttrs + ' ' : ''}src="${src}" integrity="${hash}" crossorigin="anonymous"${cleanAfter ? ' ' + cleanAfter : ''}></script>`;
            }
            return match;
          });

          // 2. Extract and split Critical vs Non-Critical (below-the-fold) CSS
          // Below-the-fold components and modals (Platform, Workflow, Pricing, Modal, Footer)
          // are separated into a deferred external stylesheet to eliminate unused CSS in initial fold!
          const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
          if (styleMatches.length > 0) {
            const fullCss = styleMatches[0][1];
            
            // Helper to parse CSS blocks respecting nested braces (@media, @keyframes)
            const parseCssBlocks = (css) => {
              const blocks = [];
              let i = 0;
              const n = css.length;
              while (i < n) {
                const brace = css.indexOf('{', i);
                if (brace === -1) break;
                let depth = 1;
                let j = brace + 1;
                while (j < n && depth > 0) {
                  if (css[j] === '{') depth++;
                  else if (css[j] === '}') depth--;
                  j++;
                }
                blocks.push(css.slice(i, j));
                i = j;
              }
              return blocks;
            };

            const allBlocks = parseCssBlocks(fullCss);
            const critBlocks = [];
            const deferBlocks = [];

            for (const block of allBlocks) {
              const cids = [...block.matchAll(/data-astro-cid-([a-z0-9]+)/g)].map(m => m[1]);
              // If block contains elements from below-fold or modal components, defer it
              if (cids.length > 0 && cids.some(cid => cid !== 'ckidf7ss' && cid !== 'ssxvyu24')) {
                deferBlocks.push(block);
              } else {
                critBlocks.push(block);
              }
            }

            const criticalCss = critBlocks.join('');
            const deferredCss = deferBlocks.join('');

            // Write deferred CSS chunk with content hash
            const deferHash = crypto.createHash('md5').update(deferredCss).digest('hex').slice(0, 8);
            const deferFilename = `deferred.${deferHash}.css`;
            const astroAssetsDir = path.join(distDir, '_astro');
            if (!fs.existsSync(astroAssetsDir)) {
              fs.mkdirSync(astroAssetsDir, { recursive: true });
            }
            fs.writeFileSync(path.join(astroAssetsDir, deferFilename), deferredCss, 'utf-8');

            // Replace full inlined <style> with critical <style> + deferred <link>
            const deferredLink = `<link rel="stylesheet" href="/_astro/${deferFilename}" media="print" onload="this.media='all'" />`;
            const replacement = `<style>${criticalCss}</style>\n    ${deferredLink}`;
            html = html.replace(styleMatches[0][0], replacement);
            logger.info(`Separated CSS: Critical inline (${(criticalCss.length / 1024).toFixed(2)} KiB), Deferred external (${(deferredCss.length / 1024).toFixed(2)} KiB saved from initial load).`);
          }

          // Extract hashes from all remaining inline <style> tags
          const finalStyleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
          const styleHashes = finalStyleMatches.map(m => {
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
      target: 'esnext',
      assetsInlineLimit: 0,
    },
  },
  integrations: [sriAndCspIntegration()],
});
