import { test, expect } from '@playwright/test';

test('application mounts and renders without crashing', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/');

  // Check if the root div is visible
  const rootLocator = page.locator('#root');
  await expect(rootLocator).toBeVisible();

  // Check if the Three.js canvas is rendered
  const canvasLocator = page.locator('canvas');
  await expect(canvasLocator).toBeVisible();

  // Wait a moment to catch any asynchronous errors during initial rendering
  await page.waitForTimeout(1000);

  // Assert no errors occurred
  expect(errors).toEqual([]);
});
