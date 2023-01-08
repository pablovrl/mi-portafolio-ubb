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
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { createPortfolioSchema } from '../utils/yupValidations';

interface Props {
	user: UserPortfolio;
	technologies: Technology[];
}

const PortfolioForm = ({ user, technologies }: Props) => {
	const router = useRouter();
	const userTechnologies = user.technologies.map((t) => t.technology);
	const userExperiences = user.experiences.map((e) => {
		const startDate = new Date(e.startedAt.split('T')[0].replace('-', '/'));
		let endDate = null;
		if(e.endedAt !== null) endDate = new Date(e.endedAt.split('T')[0].replace('-', '/'));
		const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1 < 10 ? '0' : ''}${startDate.getMonth() + 1}-${startDate.getDate() < 10 ? '0' : ''}${startDate.getDate()}`;
		let formattedEndDate = null;
		if(endDate !== null) formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1 < 10 ? '0' : ''}${endDate.getMonth() + 1}-${endDate.getDate() < 10 ? '0' : ''}${endDate.getDate()}`;
		return {
			...e,
			startedAt: formattedStartDate,
			endedAt: formattedEndDate,
		};
	});

	const [checked, setChecked] = useState<boolean[]>(userExperiences.map((el) => {
		if (el.endedAt === null) {
			return true;
		}
		return false;
	}));

	return (
		<Layout>
			<Formik
				validationSchema={createPortfolioSchema}
				initialValues={{
					...user,
					about: user.about || '',
					experiences: userExperiences,
					technologies: userTechnologies,
				}}
				onSubmit={async (values) => {
					await createPortfolio(values);
					toast.success('Se han guardado los cambios');
					router.replace(`/portafolio/${user.email}`);
				}}
			>
				{props => (
					<Box component={'form'} onSubmit={props.handleSubmit}>
						<UserImage user={user} />
						<PersonalInfo />
						<Technologies technologies={technologies} />
						<Experience checked={checked} setChecked={setChecked} />
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