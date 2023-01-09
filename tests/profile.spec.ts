import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.getByLabel('Correo electrónico').fill('pablo.villarroel1901@alumnos.ubiobio.cl');
	await page.getByLabel('Contraseña').fill('admin123');
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();
});

test('user can change his name', async ({ page }) => {
	await page.getByTestId('MenuIcon').click();
	await page.getByRole('button', { name: 'Perfil' }).click();
	await page.getByRole('button', { name: 'Nombre' }).click();
	await page.getByRole('textbox', { name: 'Nombre' }).fill('Sebastián');
	await page.getByRole('textbox', { name: 'Apellido' }).fill('Antillanca');
	await page.getByRole('button', { name: 'Guardar' }).click();
	await page.textContent('text=Sebastián Antillanca');

	await page.getByRole('button', { name: 'Nombre' }).click();
	await page.getByRole('textbox', { name: 'Nombre' }).fill('Pablo');
	await page.getByRole('textbox', { name: 'Apellido' }).fill('Villarroel');
	await page.getByRole('button', { name: 'Guardar' }).click();
	await page.textContent('text=Pablo Villarroel');
});

test('user can change his password', async ({page}) => {

	const changePassword = async (oldPass: string, newPass: string) => {
		await page.textContent('text=Bienvenid@');
		await page.getByTestId('MenuIcon').click();
		await page.getByRole('button', { name: 'Perfil' }).click();
		await page.getByRole('button', { name: 'Contraseña ************ Editar' }).click();
		await page.getByRole('textbox', { name: 'Contraseña actual' }).fill(oldPass);
		await page.locator('input[name="newPassword"]').fill(newPass);
		await page.getByRole('textbox', { name: 'Repetir nueva contraseña' }).fill(newPass);
		await page.getByRole('button', { name: 'Guardar' }).click();
	};

	await changePassword('admin123', 'test1234');

	await page.getByRole('button', { name: 'Cerrar sesión' }).click();
	await page.getByLabel('Correo electrónico').fill('pablo.villarroel1901@alumnos.ubiobio.cl');
	await page.getByLabel('Contraseña').fill('test1234');
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();

	await changePassword('test1234', 'admin123');
});

test('user can change his career', async ({ page }) => {
	await page.getByTestId('MenuIcon').click();
	await page.getByRole('button', { name: 'Perfil' }).click();
	await page.getByRole('button', { name: 'Carrera IECI Editar' }).click();
	await page.getByRole('button', { name: 'IECI' }).click();
	await page.getByRole('option', { name: 'ICINF' }).click();
	await page.getByRole('button', { name: 'Guardar' }).click();

	await page.textContent('text=ICINF');

	await page.getByRole('button', { name: 'Carrera ICINF Editar' }).click();
	await page.getByRole('button', { name: 'ICINF' }).click();
	await page.getByRole('option', { name: 'IECI' }).click();
	await page.getByRole('button', { name: 'Guardar' }).click();

	await page.textContent('text=IECI');
});