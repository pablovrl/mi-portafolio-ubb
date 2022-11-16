import { Box, Button, Divider, Grid, TextField } from '@mui/material';
import FormikInput from '../FormikInput';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';

const Experience = () => {
	const formik = useFormikContext<{
		name: string;
		lastName: string;
		email: string;
		about: string;
		experience: { company: string, position: string, startDate: Date, endDate: Date }[];
	}>();
	return (
		<Box>
			<Title text='Experiencia laboral' />
			<Helptext>Agrega aquí tu experiencia laboral más importante.
				(También puedes incluir prácticas profesionales).
			</Helptext>
			<FieldArray
				name='experience'
				render={arrayHelpers => (
					<Box>
						{formik.values.experience && formik.values.experience.length > 0 ? (
							<Box>
								{formik.values.experience.map((experience, index) => (
									<Grid container spacing={2} key={index} mb={2}>
										<Field
											name={`experience.${index}.position`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField {...field} label='Cargo' />
												</Grid>
											)}
										</Field>

										<Field
											name={`experience.${index}.company`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField {...field} label='Empresa' />
												</Grid>
											)}
										</Field>

										<Field
											name={`experience.${index}.startDate`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField {...field} type='date' />
												</Grid>
											)}
										</Field>

										<Field
											name={`experience.${index}.endDate`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField {...field} type='date' />
												</Grid>
											)}
										</Field>
										<Grid item xs={6}>
											<Button
												type="button"
												onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
												fullWidth
												variant='contained'
												color='error'
											>
											Eliminar
											</Button>
										</Grid>
										<Grid item xs={6}>
											<Button
												type="button"
												onClick={() => arrayHelpers.insert(index, { company: '', position: '', startDate: '', endDate: '' })} // insert an empty string at a position
												fullWidth
												variant='contained'
												disabled={formik.values.experience.length >= 4}
											>
											Agregar
											</Button>
										</Grid>
									</Grid>
								))}
							</Box>
						) : (
							<Button
								variant='contained'
								onClick={() => arrayHelpers.push({ company: '', position: '', startDate: '', endDate: '' })}
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