import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { Technology, User } from '@prisma/client';
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
import StudentPortfolio from '../../components/Portfolio';
import { UserPortfolio } from '../../types';
import { prisma } from '../../utils/db';
import { refreshPage } from '../../utils/refreshPage';
import { getUserSessionWithContext } from '../../utils/userSession';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { email } = ctx.query;
	const user = await prisma.user.findFirst({
		where: { email: email as string },
		include: {
			technologies: {include: {technology: true}},
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

const Portfolio: NextPage<PortfolioProps> = ({ email, stringifiedUser, technologies }) => {
	const { data } = useSession();
	const user = JSON.parse(stringifiedUser) as UserPortfolio;

	// Eres creador y no tienes portafolio
	if (email === data?.user?.email && user.portfolio === false)
		return (
			<Layout>
				<Formik
					initialValues={{
						name: user.name,
						lastName: user.lastName,
						email: user.email,
						about: '',
						experience: [],
						technologies: [],
						projects: [],
						contact: [],
					}}
					onSubmit={async (values) => {
						createPortfolio(values);
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
		return <StudentPortfolio user={user} />


	return (
		<p>No eres el creador</p>
	);
};

export default Portfolio;