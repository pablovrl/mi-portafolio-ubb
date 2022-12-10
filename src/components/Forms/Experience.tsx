import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import { todayDate } from '../../utils/todayDate';
import { UserPortfolio } from '../../types';

const Experience = () => {
	const formik = useFormikContext<UserPortfolio>();
	const today = todayDate();
	const error = formik.touched.experiences && Boolean(formik.errors.experiences);

	// const errors: Partial<UserPortfolio> = formik.errors;
	// if(errors.experiences && errors.experiences[0])
	// 	console.log(errors.experiences[0].position);

	return (
		<Box>
			<Title error={error} text='Experiencia laboral' />
			<Helptext>Agrega aquí tu experiencia laboral más importante
				(también puedes incluir prácticas profesionales).
			</Helptext>
			<FieldArray
				name='experiences'
				render={arrayHelpers => (
					<Box>
						{formik.values.experiences && formik.values.experiences.length > 0 ? (
							<Box>
								<Box mb={2}>
									<Button
										type="button"
										onClick={() => arrayHelpers.push({ company: '', position: '', startedAt: today, endedAt: today, description: '' })} // insert an empty string at a position
										variant='outlined'
									>
										Agregar nueva experiencia laboral
									</Button>
								</Box>
								{formik.values.experiences.map((experience, index) => (
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
													<TextField
														{...field}
														fullWidth
														label='Cargo'
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].position ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].position ? formik.errors.experiences[index].position : null}
													/>
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
													<TextField 
														{...field} 
														fullWidth
														label='Empresa' 
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].company ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].company ? formik.errors.experiences[index].company : null}
													/>
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
													<TextField 
														{...field} 
														fullWidth 
														type='date' 
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].startedAt ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].startedAt ? formik.errors.experiences[index].startedAt : null}
													/>
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
													<TextField 
														{...field} 
														fullWidth 
														type='date' 
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].endedAt ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].endedAt ? formik.errors.experiences[index].startedAt : null}
													/>
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
													<TextField 
														{...field} 
														label='Descripción' 
														fullWidth 
														multiline 
														minRows={3} 
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].description ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && formik.errors.experiences[index].description ? formik.errors.experiences[index].description : null}
													/>
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