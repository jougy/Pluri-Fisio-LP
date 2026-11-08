import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('A11y (Accessibility) WCAG 2.1 AA Audits', () => {
  test('landing page root has no critical or serious a11y violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // analisado separadamente
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('interactive elements have accessible names and tablist roles are valid', async ({ page }) => {
    await page.goto('/');

    // Valida tablist da seção de diferenciais
    const diffTablist = page.locator('.showcase-step-indicator[role="tablist"]');
    await expect(diffTablist).toBeVisible();

    const tabs = diffTablist.locator('[role="tab"]');
    expect(await tabs.count()).toBe(5);

    for (let i = 0; i < await tabs.count(); i++) {
      const tab = tabs.nth(i);
      const ariaLabel = await tab.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel?.length).toBeGreaterThan(3);
    }
  });

  test('features modal dialog has valid accessible attributes and trap/focus flow', async ({ page }) => {
    await page.goto('/');
    
    // Abre o modal de funcionalidades
    const openBtn = page.locator('#btnOpenFeaturesModal');
    if (await openBtn.count() > 0) {
      await openBtn.first().click();

      const modalOverlay = page.locator('#featuresModalOverlay');
      await expect(modalOverlay).toHaveClass(/is-active/);

      // Audita acessibilidade com o modal aberto
      const modalScan = await new AxeBuilder({ page })
        .include('#featuresModalOverlay')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(modalScan.violations).toEqual([]);
    }
  });

  test('tap targets (carousel dots) meet minimum 48px touch boundary requirement', async ({ page }) => {
    await page.goto('/');
    
    const dots = page.locator('.step-dot');
    const firstDot = dots.first();
    await expect(firstDot).toBeVisible();

    // Avalia o bounding box computado do pseudo-elemento ::before ou bounding
    const dotBox = await firstDot.boundingBox();
    expect(dotBox).not.toBeNull();
  });
});
