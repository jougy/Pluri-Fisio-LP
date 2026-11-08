import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Security & HTTP Headers Audits', () => {
  const headersPath = path.resolve(process.cwd(), 'public/_headers');
  const redirectsPath = path.resolve(process.cwd(), 'public/_redirects');

  test('public/_headers file exists and has content', () => {
    expect(fs.existsSync(headersPath), 'public/_headers should exist').toBeTruthy();
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content.length).toBeGreaterThan(100);
  });

  test('enforces Strict-Transport-Security (HSTS) with preload and includeSubDomains', () => {
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content).toContain('Strict-Transport-Security:');
    expect(content).toMatch(/max-age=(31536000|63072000)/);
    expect(content).toContain('includeSubDomains');
    expect(content).toContain('preload');
  });

  test('enforces Clickjacking protection via X-Frame-Options', () => {
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content).toMatch(/X-Frame-Options:\s*(DENY|SAMEORIGIN)/);
  });

  test('enforces MIME Sniffing protection via X-Content-Type-Options: nosniff', () => {
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content).toMatch(/X-Content-Type-Options:\s*nosniff/);
  });

  test('enforces Referrer-Policy to prevent leaking confidential URLs', () => {
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content).toMatch(/Referrer-Policy:\s*strict-origin-when-cross-origin/);
  });

  test('enforces Permissions-Policy disabling camera, mic, and sensitive APIs', () => {
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content).toContain('Permissions-Policy:');
    expect(content).toContain('camera=()');
    expect(content).toContain('microphone=()');
    expect(content).toContain('geolocation=()');
  });

  test('enforces Content-Security-Policy (CSP) with essential directives', () => {
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content).toContain('Content-Security-Policy:');
    expect(content).toMatch(/default-src ('none'|'self')/);
    expect(content).toContain('script-src');
    expect(content).toContain('style-src');
    expect(content).toContain('font-src');
    expect(content).toContain('img-src');
    expect(content).toContain('connect-src');
    expect(content).toContain('frame-ancestors');
    expect(content).not.toContain("script-src 'self' 'unsafe-inline'");
  });

  test('enforces immutable long-term caching for hashed static assets', () => {
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content).toContain('/_astro/*');
    expect(content).toMatch(/max-age=31536000.*immutable/);
  });
});
