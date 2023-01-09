import { expect, test } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.getByLabel('Correo electrónico').fill('pablo.villarroel1901@alumnos.ubiobio.cl');
	await page.getByLabel('Contraseña').fill('admin123');
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();
});

test('user can create and delete portfolio', async ({ page }) => {
	await page.textContent('text=Bienvenid@');
	await page.getByRole('link', { name: 'Crear portafolio' }).click();

	// About input
	await page.getByLabel('Sobre mi *').fill('Esta es mi descripción');

	// Technologies input
	await page.getByPlaceholder('Tecnologías').fill('type');
	await page.getByText('typescript').click();

	// Experience section
	await page.getByRole('button', { name: 'Agregar experiencia' }).click();

	const universityRadioButton = page.getByLabel('Universidad');
	const workRadioButton = page.getByLabel('Externo');

	await expect(universityRadioButton).toBeChecked();
	await expect(workRadioButton).not.toBeChecked();

	page.getByLabel('Nombre del proyecto *');
	page.getByLabel('Ramo *');

	await workRadioButton.check();
	await expect(workRadioButton).toBeChecked();
	await expect(universityRadioButton).not.toBeChecked();

	await page.getByLabel('Cargo *').fill('Desarrollador');
	await page.getByLabel('Empresa *').fill('Google');

	await page.getByLabel('Fecha de inicio *').fill('2022-08-09');
	await page.getByLabel('Descripción').fill(
		'Esta es la descripción de la experiencia'
	);

	// Project section
	await page.getByRole('button', { name: 'Agregar proyecto' }).click();
	await page.getByLabel('Nombre *').fill('Proyecto 1');
	await page.getByLabel('Asignatura *').fill('Ingeniería de Software');
	await page.getByLabel('Lenguaje de programación *').fill('typescript');
	await page.getByLabel('Descripción *').fill('Esta es la descripción de mi proyeto.');

	const filePath = path.join(__dirname, '/files/test-file.zip');
	await page.getByRole(
		'button', { name: 'Añadir archivo (.zip)' })
		.setInputFiles(filePath);

	// Contact section
	await page.getByRole('button', { name: 'Añadir email' }).click();

	// Send form
	await page.getByRole('button', { name: 'guardar cambios' }).click();

	// Check info
	await page.textContent('text=Universidad del Bío-Bío');

	await page.textContent('text=Esta es mi descripción');
	await page.textContent('text=TYPESCRIPT');

	await page.textContent('text=PROYECTO 1');
	await page.textContent('text=INGENIERÍA DE SOFTWARE');
	await page.textContent('text=Esta es la descripción de mi proyeto.');
  
	await page.textContent('text=GOOGLE');
	await page.textContent('text=Externo');
	await page.textContent('text=Desarrollador');
	await page.textContent('text=Ago 2022');
	await page.textContent('text=Esta es la descripción de la experiencia');

	await page.getByRole('button', { name: 'tools' }).hover();
	await page.getByRole('menuitem', { name: 'Eliminar' }).click();
	await page.getByRole('button', { name: 'Eliminar' }).click();
	await page.textContent('text=No se encontraron portafolios.');
});
