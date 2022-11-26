import { Grid, Box } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import FormikInput from '../FormikInput';
import Helptext from './common/Helptext';
import Title from './common/Title';

const PersonalInfo = () => {
	const formik = useFormikContext<{ about: string }>();
	return (
		<Box>
			<Title text='Perfil' />
			<Helptext>Los reclutadores tienen muy poco tiempo para leer sobre los postulantes, se breve.
				Escibre sobre ti y tu experiencia.</Helptext>
			<Grid item xs={12}>
				<FormikInput
					name='about'
					label='Sobre mi'
					multiline
					onChange={(e) => {
						formik.setFieldValue('about', e.target.value);
					}}
					minRows={3}
				/>
			</Grid>
		</Box>
	);
};

export default PersonalInfo;