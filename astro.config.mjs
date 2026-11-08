// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import path from 'node:path';

/**
 * Astro Integration that computes cryptographic SHA-384 hashes for all static scripts
 * and injects Subresource Integrity (SRI) attributes into the final HTML output.
 */
function sriInjectionIntegration() {
  return {
    name: 'sri-injector',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        logger.info('Injecting Subresource Integrity (SRI) hashes into HTML...');
        const distDir = fileURLToPath(dir);
        const indexPath = path.join(distDir, 'index.html');

        try {
          let html = fs.readFileSync(indexPath, 'utf-8');
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

          fs.writeFileSync(indexPath, html, 'utf-8');
          logger.info('Successfully injected Subresource Integrity (SRI) into index.html');
        } catch (err) {
          logger.error('Failed to inject SRI: ' + String(err));
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  integrations: [sriInjectionIntegration()],
});
