import { Box, Button, FormControlLabel, Checkbox, Grid, TextField } from '@mui/material';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, useFormikContext } from 'formik';
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

interface Props {
	checked: boolean[];
	setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
}
const Experience = ({checked, setChecked}: Props) => {
	const formik = useFormikContext<UserPortfolio>();
	const today = todayDate();


	const handleCheckChange = (index: number) => {
		const newChecked = [...checked];
		newChecked[index] = !newChecked[index];
		setChecked(newChecked);
		if (!checked[index]) {
			formik.setFieldValue(`experiences.${index}.endedAt`, null);
		} else {
			formik.setFieldValue(`experiences.${index}.endedAt`, today);
		}
	};

	const createExperience = (arrayHelpers: FieldArrayRenderProps) => {
		arrayHelpers.push({ company: '', position: '', startedAt: today, endedAt: today, description: '' });
		checked.push(false);
	};

	const deleteChecked = (index: number) => {
		const newChecked = [...checked];
		newChecked.splice(index - 1, 1);
		setChecked(newChecked);
	};

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
										onClick={() => createExperience(arrayHelpers)}
										variant='outlined'
									>
										Agregar nueva experiencia laboral
									</Button>
								</Box>
								<Grid container spacing={2} mt={1}>

									{formik.values.experiences.map((experience, index) => (
										<Layout key={index}>
											<Header deleteChecked={deleteChecked} title='experiencia' index={index + 1} handleDelete={arrayHelpers.handleRemove(index)} />
											<Grid item xs={12}>
												<FormControlLabel control={<Checkbox checked={checked[index]} onChange={() => handleCheckChange(index)} />} label="Actualmente tengo este cargo" />
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
															error={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].position && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).position ? true : false}
															helperText={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].position && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).position ? (formik.errors.experiences[index] as ExperienceErrors).position : null}
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
															error={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].company && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).company ? true : false}
															helperText={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].company && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).company ? (formik.errors.experiences[index] as ExperienceErrors).company : null}
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
															error={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].startedAt && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).startedAt ? true : false}
															helperText={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].startedAt && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).startedAt ? (formik.errors.experiences[index] as ExperienceErrors).startedAt : null}
														/>
													</Grid>
												)}
											</Field>
											{formik.values.experiences[index].endedAt === null ? (
												<Grid item xs={6}>
													<TextField 
														fullWidth 
														type={'date'}
														disabled={true}
														error={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].endedAt && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).endedAt ? true : false}
														helperText={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].endedAt && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).endedAt ? (formik.errors.experiences[index] as ExperienceErrors).endedAt : null}
													/>
												</Grid>) : (
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
																error={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].endedAt && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).endedAt ? true : false}
																helperText={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].endedAt && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).endedAt ? (formik.errors.experiences[index] as ExperienceErrors).endedAt : null}
															/>
														</Grid>
													)}
												</Field>
											)}
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
															error={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].description && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).description ? true : false}
															helperText={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index].description && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors).description ? (formik.errors.experiences[index] as ExperienceErrors).description : null}
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
								onClick={() => createExperience(arrayHelpers)}
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