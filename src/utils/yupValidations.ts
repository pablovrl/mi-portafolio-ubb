import * as yup from 'yup';


export const createPortfolioSchema = yup.object({
	// about cant have letters, numbers, spaces, and special characters, but not only spaces
	about: yup.string().required('Este campo es requerido')
		.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
		.max(800, 'El texto no debe superar los 800 caracteres'),

	technologies: yup.array().of(yup.object().shape({
		id: yup.number().required('Este campo es requerido'),
		name: yup.string().required('Este campo es requerido'),
		icon: yup.string().required('Este campo es requerido'),
	})).min(1, 'Debes agregar al menos una tecnología'),

	experiences: yup.array().of(yup.object().shape({
		company: yup.string()
			.required('Este campo es requerido')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(50, 'El texto no debe superar los 50 caracteres'),
		position: yup.string().required('Este campo es requerido')
			.matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/, 'El texto solo puede contener letras, espacios y guiones')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(50, 'El texto no debe superar los 50 caracteres'),
		description: yup.string().required('Este campo es requerido')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(600, 'El texto no debe superar los 600 caracteres'),
		startedAt: yup.date().required('Este campo es requerido')
			.max(new Date(), 'La fecha de inicio no puede ser posterior a la fecha actual'),
		endedAt: yup.date().nullable().min(yup.ref('startedAt'), 'La fecha de fin debe ser posterior a la fecha de inicio')
			.max(new Date(), 'La fecha de fin no puede ser posterior a la fecha actual'),
	})),

	projects: yup.array().of(yup.object().shape({
		name: yup.string()
			.required('Este campo es requerido')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(50, 'El texto no debe superar los 50 caracteres'),
		description: yup.string()
			.required('Este campo es requerido')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(600, 'El texto no debe superar los 600 caracteres'),
		course: yup.string()
			.required('Este campo es requerido')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(50, 'El texto no debe superar los 50 caracteres'),
		technology: yup.string()
			.required('Este campo es requerido')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(50, 'El texto no debe superar los 50 caracteres'),
		file: yup.string().required('Este campo es requerido').nullable(),
	})),

	contacts: yup.array().of(yup.object().shape({
		name: yup.string()
			.required('Este campo es requerido')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(50, 'El texto no debe superar los 50 caracteres'),
		url: yup.string()
			.required('Este campo es requerido')
			.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
			.max(200, 'El texto no debe superar los 200 caracteres'),
	}))
});

export const email = yup
	.string()
	.email('Ingrese un correo electrónico válido')
	.required('Debe ingresar un correo electrónico')
	.matches(/@(ubiobio\.cl|alumnos\.ubiobio\.cl)$/, 'Debes ingresar un correo institucional');

export const password = yup
	.string()
	.matches(/^[^\s]+$/, 'La contraseña no puede contener espacios')
	.min(8, 'La contraseña debe tener un mínimo de 8 caracteres')
	.required('Debe ingresar una contraseña');

export const name = yup
	.string()
	// el nombre solo puede contener letras y tilde
	.matches(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/, 'El nombre solo puede contener letras')
	.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
	.min(3, 'El nombre debe tener un mínimo de 3 caracteres')
	.required('Debe ingresar un nombre')
	.max(20, 'El nombre debe tener un máximo de 20 caracteres');

export const lastName = yup
	.string()
	.matches(/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/, 'El apellido solo puede contener letras')
	.matches(/^(?!\s+$).*/, 'El texto no puede contener solo espacios')
	.min(3, 'El apellido debe tener un mínimo de 3 caracteres')
	.required('Debe ingresar un apellido')
	.max(20, 'El apellido debe tener un máximo de 20 caracteres');

export const career = yup
	.string()
	.required('Debe ingresar una carrera');