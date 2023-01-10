import { test } from '@playwright/test';

test('has login page', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.textContent('text=Iniciar sesión');
});

test('user can login', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.getByLabel('Correo electrónico').fill(process.env.TEST_EMAIL || 'test@ubiobio.cl');
	await page.getByLabel('Contraseña').fill(process.env.TEST_PASSWORD || 'testubb123');
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();

	await page.textContent('text=Bienvenid@');
});

test('user can logout', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.getByLabel('Correo electrónico').fill(process.env.TEST_EMAIL || 'test@ubiobio.cl');
	await page.getByLabel('Contraseña').fill(process.env.TEST_PASSWORD || 'testubb123');
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();

	await page.textContent('text=Bienvenid@');
	await page.getByRole('button', { name: 'Cerrar sesión' }).click();
	await page.textContent('text=Iniciar sesión');
});