import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import { todayDate } from '../../utils/todayDate';
import { UserPortfolio } from '../../types';

const Experience = () => {
	const formik = useFormikContext<UserPortfolio>();
	const today = todayDate();
	const error = formik.touched.experiences && Boolean(formik.errors.experiences);

	return (
		<Box>
			<Title error={error} text='Experiencia laboral' />
			{error && <Alert severity='error' >Por favor completa todos los campos correctamente.</Alert>}
			<Helptext>Agrega aquí tu experiencia laboral más importante
				(también puedes incluir prácticas profesionales).
			</Helptext>
			<FieldArray
				name='experiences'
				render={arrayHelpers => (
					<Box>
						{formik.values.experiences && formik.values.experiences.length > 0 ? (
							<Box>
								<Button
									type="button"
									onClick={() => arrayHelpers.push({ company: '', position: '', startedAt: today, endedAt: today, description: '' })} // insert an empty string at a position
									variant='outlined'
									disabled={formik.values.experiences.length >= 4}
								>
												Agregar nueva experiencia laboral
								</Button>
								{formik.values.experiences.reverse().map((experience, index) => (
									<Grid container spacing={2} key={index} mb={2}>
										<Grid item xs={12}>
											<Typography variant='h6'>Experiencia {index + 1}</Typography>
										</Grid>
										<Field
											name={`experiences.${index}.position`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField fullWidth {...field} label='Cargo' error={error} />
												</Grid>
											)}
										</Field>

										<Field
											name={`experiences.${index}.company`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField fullWidth {...field} label='Empresa' error={error} />
												</Grid>
											)}
										</Field>

										<Field
											name={`experiences.${index}.startedAt`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField fullWidth {...field} type='date' error={error} />
												</Grid>
											)}
										</Field>

										<Field
											name={`experiences.${index}.endedAt`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField fullWidth  {...field} type='date' error={error} />
												</Grid>
											)}
										</Field>
										<Field
											name={`experiences.${index}.description`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={12}>
													<TextField error={error} label='Descripción' fullWidth multiline minRows={3} {...field} />
												</Grid>
											)}
										</Field>
										<Grid item xs={6}>
											<Button
												type="button"
												onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
												fullWidth
												variant='outlined'
												color='error'
											>
												Eliminar experiencia laboral
											</Button>
										</Grid>
									</Grid>
								))}
							</Box>
						) : (
							<Button
								variant='outlined'
								onClick={() => arrayHelpers.push({ company: '', position: '', startedAt: today, endedAt: today, description: '' })}
							>
								Agregar experiencia
							</Button>
						)}
					</Box>
				)}
			/>
		</Box>
	);
};
export default Experience;