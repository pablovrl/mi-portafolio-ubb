import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { Portfolio, Technology, User } from '@prisma/client';
import { Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Experience from '../../components/Forms/Experience';
import PersonalInfo from '../../components/Forms/PersonalInfo';
import Technologies from '../../components/Forms/Technologies';
import UserImage from '../../components/Forms/UserImage';
import Layout from '../../components/Layout';
import { prisma } from '../../utils/db';
import { getUserSessionWithContext } from '../../utils/userSession';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { email } = ctx.query;
	const user = await prisma.user.findFirst({
		where: { email: email as string },
		include: { portfolio: true }
	});

	if (!user)
		return { notFound: true };

	const session = await getUserSessionWithContext(ctx);

	if (session?.user?.email !== user.email && user.portfolio === null)
		return { notFound: true };

	const technologies = await prisma.technology.findMany();
	return { props: { email, user, technologies } };
};

interface PortfolioProps {
	email: string;
	user: User & { portfolio?: Portfolio };
	technologies: Technology[];
}

const Portfolio: NextPage<PortfolioProps> = ({ email, user, technologies }) => {
	const { data } = useSession();

	// Eres creador y no tienes portafolio
	if (email === data?.user?.email && user.portfolio === null)
		return (
			<Layout>
				<Formik
					initialValues={{
						name: user.name,
						lastName: user.lastName,
						email: user.email,
						about: '',
						experience: []
					}}
					onSubmit={async (values) => console.log(values)}
				>
					{props => (
						<Box component='form' onSubmit={props.handleSubmit}>
							<Alert severity='info'>
								<AlertTitle>Aún no tienes un portafolio :(</AlertTitle>
							Sigue los siguientes pasos para crear uno.
							</Alert>
							<UserImage user={user} />
							<PersonalInfo user={user} />
							<Technologies technologies={technologies} />
							<Experience />
							<Button type='submit' fullWidth variant='contained' sx={{ marginTop: 2 }}> Crear portafolio</Button>
						</Box>
					)}
				</Formik>
			</Layout>
		);

	// Eres el creador y tienes portafolio
	if (email === data?.user?.email)
		return (
			<p>Eres el creador y tienes portafolio</p>
		);

	return (
		<p>No eres el creador</p>
	);
};

export default Portfolio;