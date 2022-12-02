import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { Technology } from '@prisma/client';
import { Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { createPortfolio } from '../../api/user';
import Contact from '../../components/Forms/Contact';
import Experience from '../../components/Forms/Experience';
import PersonalInfo from '../../components/Forms/PersonalInfo';
import Projects from '../../components/Forms/Projects';
import Technologies from '../../components/Forms/Technologies';
import UserImage from '../../components/Forms/UserImage';
import Layout from '../../components/Layout';
import StudentPortfolio from '../../components/StudentPortfolio';
import { UserPortfolio } from '../../types';
import { prisma } from '../../utils/db';
import { refreshPage } from '../../utils/refreshPage';
import { getUserSessionWithContext } from '../../utils/userSession';
import * as yup from 'yup';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { email } = ctx.query;
	const user = await prisma.user.findFirst({
		where: { email: email as string },
		include: {
			technologies: { include: { technology: true } },
			projects: true,
			experiences: true,
			contacts: true,
		},
	});

	if (!user)
		return { notFound: true };

	const session = await getUserSessionWithContext(ctx);

	if (session?.user?.email !== user.email && user.portfolio === false)
		return { notFound: true };

	const technologies = await prisma.technology.findMany();
	return { props: { email, stringifiedUser: JSON.stringify(user), technologies } };
};

interface PortfolioProps {
	email: string;
	stringifiedUser: string;
	technologies: Technology[];
}

const validationSchema = yup.object({
	about: yup.string().required('Este campo es requerido'),	
	// validate array has at least one element
	technologies: yup.array().of(yup.object().shape({
		id: yup.number().required('Este campo es requerido'),
		name: yup.string().required('Este campo es requerido'),
		icon: yup.string().required('Este campo es requerido'),
	})).min(1, 'Debes agregar al menos una tecnología'),
	experiences: yup.array().of(yup.object().shape({
		company: yup.string().required('Este campo es requerido'),
		position: yup.string().required('Este campo es requerido'),
		description: yup.string().required('Este campo es requerido'),
		startedAt: yup.date().required('Este campo es requerido'),
		endedAt: yup.date().required('Este campo es requerido'),
	})),
	projects: yup.array().of(yup.object().shape({
		name: yup.string().required('Este campo es requerido'),
		description: yup.string().required('Este campo es requerido'),
		course: yup.string().required('Este campo es requerido'),
		deploy: yup.string().required('Este campo es requerido'),
		technology: yup.string().required('Este campo es requerido'),
		file: yup.string().required('Este campo es requerido'),
	})),
	contacts: yup.array().of(yup.object().shape({
		name: yup.string().required('Este campo es requerido'),
		url: yup.string().required('Este campo es requerido'),
	}))
});


const Portfolio: NextPage<PortfolioProps> = ({ email, stringifiedUser, technologies }) => {
	const { data } = useSession();
	const user = JSON.parse(stringifiedUser) as UserPortfolio;

	// Eres creador y no tienes portafolio
	if (email === data?.user?.email && user.portfolio === false)
		return (
			<Layout>
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						id: user.id,
						name: user.name,
						lastName: user.lastName,
						career: user.career,
						email: user.email,
						image: user.image,
						password: '',
						portfolio: user.portfolio,
						about: '',
						experiences: user.experiences,
						technologies: user.technologies, 
						projects: user.projects,
						contacts: user.contacts,
					}}
					onSubmit={async (values: UserPortfolio) => {
						await createPortfolio(values);
						refreshPage();
					}}
				>
					{props => (
						<Box component='form' onSubmit={props.handleSubmit}>
							<Alert severity='info'>
								<AlertTitle>Aún no tienes un portafolio :(</AlertTitle>
								Sigue los siguientes pasos para crear uno.
							</Alert>
							<UserImage user={user} />
							<PersonalInfo />
							<Technologies technologies={technologies} />
							<Experience />
							<Projects />
							<Contact />
							<Button type='submit' fullWidth variant='contained' sx={{ marginTop: 2 }}> Crear portafolio</Button>
						</Box>
					)}
				</Formik>
			</Layout>
		);

	// Eres el creador y tienes portafolio
	if (email === data?.user?.email)
		return <Layout>
			<StudentPortfolio user={user} />
		</Layout>;


	return (
		<Layout noNavbar>
			<StudentPortfolio user={user} />
		</Layout>
	);
};

export default Portfolio;