import * as yup from 'yup';

export const email = yup
	.string()
	.email('Ingrese un correo electrónico válido')
	.required('Debe ingresar un correo electrónico');

export const password = yup
	.string()
	.matches(/^[^\s]+$/, 'La contraseña no puede contener espacios')
	.min(8, 'La contraseña debe tener un mínimo de 8 caracteres')
	.required('Debe ingresar una contraseña');

export const name = yup
	.string()
	// el nombre solo puede contener letras y tilde
	.matches(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/, 'El nombre solo puede contener letras')
	.min(3, 'El nombre debe tener un mínimo de 3 caracteres')
	.required('Debe ingresar un nombre')
	.max(20, 'El nombre debe tener un máximo de 20 caracteres');

export const lastName = yup
	.string()
	.matches(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/, 'El apellido solo puede contener letras')
	.min(3, 'El apellido debe tener un mínimo de 3 caracteres')
	.required('Debe ingresar un apellido')
	.max(20, 'El apellido debe tener un máximo de 20 caracteres');

export const career = yup
	.string()
	.required('Debe ingresar una carrera');