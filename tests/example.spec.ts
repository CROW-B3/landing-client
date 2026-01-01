import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/CROW/);
});

test('landing page loads', async ({ page }) => {
  await page.goto('/');

  // Check that the page loaded successfully
  await expect(page).toHaveURL('/');
});
