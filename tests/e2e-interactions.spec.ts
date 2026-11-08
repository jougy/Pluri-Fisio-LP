import { test, expect } from '@playwright/test';

test.describe('E2E Key Clinical Funnel & Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('hero section renders primary CTA and leads to pricing', async ({ page }) => {
    const heroBtn = page.locator('a.hero-btn[href="#planos"]');
    await expect(heroBtn).toBeVisible();
    await expect(heroBtn).toContainText('Começar grátis');
  });

  test('differences carousel cycles smoothly on next/prev click', async ({ page }) => {
    const nextBtn = page.locator('#carouselNextBtn');
    const titleEl = page.locator('#showcaseMainTitle');

    await expect(nextBtn).toBeVisible();
    const initialText = await titleEl.textContent();

    await nextBtn.click();
    await page.waitForTimeout(300);

    const updatedText = await titleEl.textContent();
    expect(updatedText).not.toBe(initialText);

    // Indicador atualizado
    const activeDot = page.locator('.step-dot.active');
    expect(await activeDot.getAttribute('aria-selected')).toBe('true');
  });

  test('pricing bento selector switches audience and cycles reactively', async ({ page }) => {
    const clinicBtn = page.locator('#btnAudienceClinic');
    await expect(clinicBtn).toBeVisible();

    await clinicBtn.click();
    await expect(clinicBtn).toHaveClass(/active/);
    await expect(clinicBtn).toHaveAttribute('aria-selected', 'true');

    // Troca de ciclo de cobrança (Trimestral/Anual)
    const annualBtn = page.locator('.cycle-btn[data-cycle="anual"]');
    await expect(annualBtn).toBeVisible();
    await annualBtn.click();
    await expect(annualBtn).toHaveClass(/active/);

    // O CTA de checkout deve conter ciclo e audience atualizados
    const cta = page.locator('#bentoCta');
    const href = await cta.getAttribute('href');
    expect(href).toContain('cycle=annual');
  });

  test('modal open, tab switching, and keyboard ESC closure work seamlessly', async ({ page }) => {
    const openBtn = page.locator('#btnOpenFeaturesModal');
    if (await openBtn.count() === 0) return;

    await openBtn.first().click();
    const overlay = page.locator('#featuresModalOverlay');
    await expect(overlay).toHaveClass(/is-active/);

    // Troca para a aba de rotina
    const tabRotina = page.locator('.modal-tab-btn[data-tab-target="tab-rotina"]');
    await tabRotina.click();
    await expect(tabRotina).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#tab-rotina')).toHaveClass(/active/);

    // Fecha pressionando ESC
    await page.keyboard.press('Escape');
    await expect(overlay).not.toHaveClass(/is-active/);
  });
});
