import { test, expect } from '@playwright/test';

test('has login view', async ({ page }) => {
	await page.goto('http://localhost:3000/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Mi Portafolio UBB/);
});

// test('get started link', async ({ page }) => {
// 	await page.goto('https://playwright.dev/');

// 	// Click the get started link.
// 	await page.getByRole('link', { name: 'Get started' }).click();

// 	// Expects the URL to contain intro.
// 	await expect(page).toHaveURL(/.*intro/);
// });
