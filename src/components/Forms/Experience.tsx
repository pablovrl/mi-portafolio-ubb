import { Box, Button, FormControlLabel, Checkbox, Grid, TextField, FormControl, FormLabel, RadioGroup, Radio, TextFieldProps, StandardTextFieldProps } from '@mui/material';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikContextType, useFormikContext } from 'formik';
import { todayDate } from '../../utils/todayDate';
import { UserPortfolio } from '../../types';
import { Header, Layout } from './Layout';
import { Experience } from '@prisma/client';

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

interface DataInputProps extends StandardTextFieldProps {
	gridSize?: number;
	index: number;
	formik: FormikContextType<UserPortfolio>
}

const DataInput = ({ name, index, label, gridSize, type, multiline, minRows, formik }: DataInputProps) => (
	<Field
		name={`experiences.${index}.${name}`}
	>
		{({
			field,
		}: FieldProps) => (
			<Grid item xs={gridSize || 6}>
				<TextField
					{...field}
					fullWidth
					type={type || 'text'}
					label={label}
					multiline={multiline}
					minRows={minRows}
					error={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index][name as keyof Experience] && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors)[name as keyof ExperienceErrors] ? true : false}
					helperText={formik.touched.experiences && formik.touched.experiences[index] && formik.touched.experiences[index][name as keyof Experience] && formik.errors.experiences && formik.errors.experiences[index] && (formik.errors.experiences[index] as ExperienceErrors)[name as keyof ExperienceErrors] ? (formik.errors.experiences[index] as ExperienceErrors).company : null}
				/>
			</Grid>
		)}
	</Field>
);

const Experience = ({ checked, setChecked }: Props) => {
	const formik = useFormikContext<UserPortfolio>();
	const today = todayDate();


	const handleCheckChange = (index: number) => {
		const newChecked = [...checked];
		newChecked[index] = !newChecked[index];
		setChecked(newChecked);
		checked[index] ?
			formik.setFieldValue(`experiences.${index}.endedAt`, today) :
			formik.setFieldValue(`experiences.${index}.endedAt`, null);
	};

	const createExperience = (arrayHelpers: FieldArrayRenderProps) => {
		arrayHelpers.push({ company: '', position: '', startedAt: today, endedAt: today, description: '', type: 'UNIVERSITY' });
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
											<Grid item xs={6}>
												<FormControl >
													<FormLabel id="demo-radio-buttons-group-label">Tipo</FormLabel>
													<RadioGroup
														aria-labelledby="demo-radio-buttons-group-label"
														name="radio-buttons-group"
														value={experience.type}
														onChange={(e) => {
															formik.setFieldValue(`experiences.${index}.type`, e.target.value);
															formik.setFieldValue(`experiences.${index}.company`, '');
															formik.setFieldValue(`experiences.${index}.position`, '');
														}}
													>
														<FormControlLabel value="UNIVERSITY" control={<Radio />} label="Universidad" />
														<FormControlLabel value="WORK" control={<Radio />} label="Externo" />
													</RadioGroup>
												</FormControl>
											</Grid>
											<Grid item xs={6}>
												<FormControlLabel control={<Checkbox checked={checked[index]} onChange={() => handleCheckChange(index)} />} label="Actualmente tengo este cargo" />
											</Grid>
											<DataInput
												index={index}
												name={'position'}
												label={experience.type === 'WORK' ? 'Cargo *' : 'Nombre del proyecto *'}
												formik={formik}
											/>
											<DataInput
												index={index}
												name={'company'}
												label={experience.type === 'WORK' ? 'Empresa *' : 'Ramo *'}
												formik={formik}
											/>
											<DataInput
												index={index}
												name='startedAt'
												type='date'
												label='Fecha de inicio *'
												formik={formik}
											/>
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
												<DataInput
													index={index}
													name='endedAt'
													type='date'
													label='Fecha de finalización *'
													formik={formik}
												/>
											)}
											<DataInput 
												index={index}
												label='Descripción'
												name='description'
												multiline
												minRows={3}
												gridSize={12}
												formik={formik}
											/>
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