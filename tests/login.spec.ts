import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


test.beforeEach(async ({ page }) => {
	await page.goto(process.env.NEXTAUTH_URL!);
});

test('user can login', async ({ page }) => {
	await page.getByLabel('Correo electrónico').fill(process.env.TEST_EMAIL || 'test@ubiobio.cl');
	await page.getByLabel('Contraseña').fill(process.env.TEST_PASSWORD || 'testubb123');
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();

	await page.textContent('text=Bienvenid@');
});

test('user can logout', async ({ page }) => {
	await page.getByLabel('Correo electrónico').fill(process.env.TEST_EMAIL || 'test@ubiobio.cl');
	await page.getByLabel('Contraseña').fill(process.env.TEST_PASSWORD || 'testubb123');
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();

	await page.textContent('text=Bienvenid@');
	await page.getByRole('button', { name: 'Cerrar sesión' }).click();
	await page.textContent('text=Iniciar sesión');
});