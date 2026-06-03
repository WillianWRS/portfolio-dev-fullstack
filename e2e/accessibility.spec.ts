import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Acessibilidade', () => {
  test('página inicial sem violações críticas ou sérias (axe)', async ({ page }) => {
    await page.goto('/');
    await page.locator('.loading-screen').waitFor({ state: 'hidden', timeout: 5_000 });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('.loading-screen')
      .analyze();

    const blocking = results.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious',
    );

    const summary = blocking
      .map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`)
      .join('\n');

    expect(blocking, summary).toEqual([]);
  });
});
