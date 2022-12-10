import { Box, Button } from '@mui/material';
import { Technology } from '@prisma/client';
import { Formik } from 'formik';
import { createPortfolio } from '../api/user';
import Contact from './Forms/Contact';
import Experience from './Forms/Experience';
import PersonalInfo from './Forms/PersonalInfo';
import Projects from './Forms/Projects';
import Technologies from './Forms/Technologies';
import UserImage from './Forms/UserImage';
import Layout from './Layout';
import { UserPortfolio } from '../types';
import * as yup from 'yup';
import { useRouter } from 'next/router';

const validationSchema = yup.object({
	about: yup.string().required('Este campo es requerido').max(800, 'El texto no debe superar los 700 caracteres'),	
	// validate array has at least one element
	technologies: yup.array().of(yup.object().shape({
		id: yup.number().required('Este campo es requerido'),
		name: yup.string().required('Este campo es requerido'),
		icon: yup.string().required('Este campo es requerido'),
	})).min(1, 'Debes agregar al menos una tecnología'),
	experiences: yup.array().of(yup.object().shape({
		company: yup.string().required('Este campo es requerido').max(50, 'El texto no debe superar los 50 caracteres'),
		position: yup.string().required('Este campo es requerido').max(50, 'El texto no debe superar los 50 caracteres'),
		description: yup.string().required('Este campo es requerido').max(300, 'El texto no debe superar los 300 caracteres'),
		startedAt: yup.date().required('Este campo es requerido').max(yup.ref('endedAt'), 'La fecha de inicio debe ser anterior a la fecha de fin'),
		endedAt: yup.date().required('Este campo es requerido').min(yup.ref('startedAt'), 'La fecha de fin debe ser posterior a la fecha de inicio'),
	})),
	projects: yup.array().of(yup.object().shape({
		name: yup.string().required('Este campo es requerido').max(50, 'El texto no debe superar los 50 caracteres'),
		description: yup.string().required('Este campo es requerido').max(300, 'El texto no debe superar los 300 caracteres'),
		course: yup.string().required('Este campo es requerido').max(50, 'El texto no debe superar los 50 caracteres'),
		technology: yup.string().required('Este campo es requerido').max(50, 'El texto no debe superar los 50 caracteres'),
		file: yup.string().required('Este campo es requerido').nullable(),
	})),
	contacts: yup.array().of(yup.object().shape({
		name: yup.string().required('Este campo es requerido').max(50, 'El texto no debe superar los 50 caracteres'),
		url: yup.string().required('Este campo es requerido').max(200, 'El texto no debe superar los 200 caracteres'),
	}))
});
interface Props {
  user: UserPortfolio;
	technologies: Technology[];
}

const PortfolioForm = ({ user, technologies }: Props) => {
	const router = useRouter();
	const userTechnologies = user.technologies.map((t) => t.technology);
	const userExperiences = user.experiences.map((e) => {
		const startDate = new Date(e.startedAt);
		const endDate = new Date(e.endedAt);
		const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1 < 10 ? '0' : ''}${startDate.getMonth() + 1}-${startDate.getDate() < 10 ? '0' : ''}${startDate.getDate()}`;
		const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1 < 10 ? '0' : ''}${endDate.getMonth() + 1}-${endDate.getDate() < 10 ? '0' : ''}${endDate.getDate()}`;
		return {
			...e,
			startedAt: formattedStartDate,
			endedAt: formattedEndDate,
		};
	});	

	return (
		<Layout>
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					...user,
					experiences: userExperiences,
					technologies: userTechnologies,
				}}
				onSubmit={async (values) => {
					await createPortfolio(values);
					router.replace(`/portafolio/${user.email}`);
				}}
			>
				{props => (
					<Box component={'form'} onSubmit={props.handleSubmit}> 
						<UserImage user={user} />
						<PersonalInfo />
						<Technologies technologies={technologies}/>
						<Experience />
						<Projects />
						<Contact />
						<Button type='submit' fullWidth variant='contained' sx={{ marginTop: 2 }}>Guardar cambios</Button>
					</Box>
				)}
			</Formik>
		</Layout>
	);
};

export default PortfolioForm;