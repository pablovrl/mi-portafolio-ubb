import * as yup from 'yup';

export const email = yup
	.string()
	.email('Ingrese un correo electrónico válido')
	.required('Debe ingresar un correo electrónico');

export const password = yup
	.string()
	.min(8, 'La contraseña debe tener un mínimo de 8 caracteres')
	.required('Debe ingresar una contraseña');

export const name = yup
	.string()
	.min(3, 'El nombre debe tener un mínimo de 3 caracteres')
	.required('Debe ingresar un nombre');

export const lastName = yup
	.string()
	.min(3, 'El apellido debe tener un mínimo de 3 caracteres')
	.required('Debe ingresar un apellido');

export const career = yup
	.string()
	.required('Debe ingresar una carrera');