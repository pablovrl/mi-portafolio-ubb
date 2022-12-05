import { Box, Button } from '@mui/material';
import { Technology, User } from '@prisma/client';
import { Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { createPortfolio, deletePortfolio } from '../../api/user';
import Contact from '../../components/Forms/Contact';
import Experience from '../../components/Forms/Experience';
import PersonalInfo from '../../components/Forms/PersonalInfo';
import Projects from '../../components/Forms/Projects';
import Technologies from '../../components/Forms/Technologies';
import UserImage from '../../components/Forms/UserImage';
import Layout from '../../components/Layout';
import { UserPortfolio } from '../../types';
import { prisma } from '../../utils/db';
import { refreshPage } from '../../utils/refreshPage';
import { getUserSessionWithContext } from '../../utils/userSession';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getUserSessionWithContext(ctx);
	const user = await prisma.user.findFirst({
		where: { email: session?.user?.email as string },
		include: {
			technologies: { include: { technology: true } },
			projects: true,
			experiences: true,
			contacts: true,
		},
	});

	const technologies = await prisma.technology.findMany();

	return {
		props: {
			stringifiedUser: JSON.stringify(user),
			technologies,
		},
	};
};

interface Props {
  stringifiedUser: string;
	technologies: Technology[];
}

const Editar: NextPage<Props> = ({ stringifiedUser, technologies }) => {
	const user = JSON.parse(stringifiedUser) as UserPortfolio;
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
				initialValues={{
					...user,
					experiences: userExperiences,
					technologies: userTechnologies,
				}}
				onSubmit={async (values: UserPortfolio) => {
					createPortfolio(values);
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

export default Editar;