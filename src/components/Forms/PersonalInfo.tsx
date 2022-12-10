import { Grid, Box, TextField } from '@mui/material';
import { Field, FieldProps, useFormikContext } from 'formik';
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
				<Field name='about'>
					{({ field }: FieldProps) => (
						<TextField
							{...field}
							fullWidth
							label='Sobre mi *'
							multiline
							onChange={(e) => {
								formik.setFieldValue('about', e.target.value);
							}}
							minRows={3}
							error={formik.touched.about && Boolean(formik.errors.about)}
							helperText={formik.touched.about && formik.errors.about}
						/>
					)}
				</Field>
			</Grid>
		</Box>
	);
};

export default PersonalInfo;