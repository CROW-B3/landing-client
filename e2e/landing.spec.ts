import { expect, test } from '@playwright/test'

test.describe('Landing Page', () => {
  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBeLessThan(500)
  })

  test('has CROW branding', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/crow/i)
  })

  test('has call-to-action button linking to auth', async ({ page }) => {
    await page.goto('/')
    const ctaLink = page.locator('a[href*="auth"], a[href*="signup"], a[href*="sign-up"]').first()
    await expect(ctaLink).toBeVisible({ timeout: 5000 })
  })

  test('has sign-in link', async ({ page }) => {
    await page.goto('/')
    const signInLink = page.locator('a[href*="login"], a[href*="sign-in"]').first()
    await expect(signInLink).toBeVisible({ timeout: 5000 })
  })

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    expect(await page.evaluate(() => document.body.scrollWidth)).toBeLessThanOrEqual(375)
  })
})
