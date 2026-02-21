import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('nav links work', async ({ page }) => {
    await page.goto('/')
    const navLinks = page.locator('nav a')
    const count = await navLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test('footer is present', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
  })
})
