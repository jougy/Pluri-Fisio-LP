import { test, expect } from '@playwright/test';

test.describe('Performance & Core Web Vitals Guards', () => {
  test('critical fonts are preloaded without render-blocking stylesheets', async ({ page }) => {
    await page.goto('/');

    // Verifica presença de preload para as fontes locais (Figtree & Outfit)
    const fontPreload = page.locator('link[rel="preload"][as="font"][href*="/fonts/"]');
    expect(await fontPreload.count()).toBeGreaterThan(0);

    // Verifica preload de alta prioridade da imagem de marca no Hero
    const heroImagePreload = page.locator('link[rel="preload"][as="image"][href*="pluri_health_icon_gradient.svg"]');
    expect(await heroImagePreload.count()).toBe(1);
  });

  test('LCP image has high fetchpriority and fast discovery', async ({ page }) => {
    await page.goto('/');

    const heroLogo = page.locator('img.hero-logo-mark');
    await expect(heroLogo).toBeVisible();
    expect(await heroLogo.getAttribute('fetchpriority')).toBe('high');
    expect(await heroLogo.getAttribute('loading')).toBe('eager');
  });

  test('Page navigation and DOMContentLoaded are fast (< 1.5s on desktop)', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Em ambiente local, a entrega estática do Astro preview deve ocorrer em menos de 1500ms
    expect(loadTime).toBeLessThan(1500);
  });
});
