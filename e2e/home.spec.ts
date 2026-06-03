import { test, expect } from '@playwright/test';

test.describe('Página inicial', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Cortina CSS do loader some após ~2.1s; aguarda para não interferir em cliques.
    await page.locator('.loading-screen').waitFor({ state: 'hidden', timeout: 5_000 });
  });

  test('exibe perfil e navegação principal', async ({ page }) => {
    await expect(page.locator('#profile')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Willian');
    await expect(page.getByRole('navigation', { name: /principal|main/i })).toBeVisible();
  });

  test('alterna idioma para EN', async ({ page }) => {
    await page.getByRole('button', { name: 'EN', exact: true }).click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    const nav = page.getByRole('navigation', { name: /principal|main/i });
    await expect(nav.getByRole('link', { name: 'Projects', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View projects' })).toBeVisible();
  });

  test('navega para a seção de projetos via âncora', async ({ page }) => {
    await page
      .getByRole('navigation', { name: /principal|main/i })
      .getByRole('link', { name: 'Projetos', exact: true })
      .click();

    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('registra interação na área principal sem erro', async ({ page }) => {
    await page.locator('main').click({ position: { x: 200, y: 400 } });
    await expect(page.locator('#profile')).toBeVisible();
  });
});
