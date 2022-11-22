import { Grid, Box } from '@mui/material';
import { User } from '@prisma/client';
import { Formik } from 'formik';
import FormikInput from '../FormikInput';
import Helptext from './common/Helptext';
import Title from './common/Title';

interface PersonalInfoProps {
	user: User;
}

const PersonalInfo = ({ user }: PersonalInfoProps) => {
	const handleFormSubmit = () => {
		console.log();
	};

	return (
		<Box>
			<Title text='Detalles personales' />
			<Grid container spacing={2} mt={1}>
				<Grid item xs={6}>
					<FormikInput
						name='name'
						label='Nombre'
					/>
				</Grid>
				<Grid item xs={6}>
					<FormikInput
						name='lastName'
						label='Apellido'
					/>
				</Grid>
				<Grid item xs={12}>
					<FormikInput
						name='email'
						label='Correo electrónico'
					/>
				</Grid>
			</Grid>
			<Title text='Perfil' />
			<Helptext>Los reclutadores tienen muy poco tiempo para leer sobre los postulantes, se breve. 
						Escibre sobre ti y tu experiencia.</Helptext>
			<Grid item xs={12}>
				<FormikInput
					name='about'
					label='Sobre mi'
					multiline
					minRows={3}
					placeholder="Ingresa una breve descripción sobre ti."
				/>
			</Grid>
		</Box>
	);
};

export default PersonalInfo;