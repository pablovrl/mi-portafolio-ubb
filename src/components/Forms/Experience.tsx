import { Box, Button, Grid, TextField } from '@mui/material';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import { todayDate } from '../../utils/todayDate';
import { UserPortfolio } from '../../types';
import { Header, Layout } from './Layout';

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
								<Grid container spacing={2} mt={1}>

									{formik.values.experiences.map((experience, index) => (
										<Layout key={index}>
											<Header title='experiencia' index={index + 1} handleDelete={arrayHelpers.handleRemove(index)} />
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
										</Layout>
									))}
								</Grid>
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