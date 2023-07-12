import { test, expect } from '@playwright/test'

test('shoud redirect to shop in root route', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('/dashboard/products/shop')
})
