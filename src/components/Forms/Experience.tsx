import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import { todayDate } from '../../utils/todayDate';
import { UserPortfolio } from '../../types';

interface ExperienceErrors {
	company: string;
	position: string;
	description: string;
	startedAt: string;
	endedAt: string;
}

const Experience = () => {
	const formik = useFormikContext<UserPortfolio>();
	const today = todayDate();

	return (
		<Box>
			<Title text='Experiencia laboral' />
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
														label='Cargo *'
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).position ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).position ? (formik.errors.experiences[index] as ExperienceErrors).position : null}
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
														label='Empresa *' 
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).company ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).company ? (formik.errors.experiences[index] as ExperienceErrors).company : null}
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
														label='Fecha de inicio *'
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).startedAt ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).startedAt ? (formik.errors.experiences[index] as ExperienceErrors).startedAt : null}
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
														label='Fecha de finalización *'
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).endedAt ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).endedAt ? (formik.errors.experiences[index] as ExperienceErrors).startedAt : null}
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
														label='Descripción *' 
														fullWidth 
														multiline 
														minRows={3} 
														error={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).description ? true : false}
														helperText={formik.touched.experiences && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).description ? (formik.errors.experiences[index] as ExperienceErrors).description : null}
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