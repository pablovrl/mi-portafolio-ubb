import { Box, Button, FormHelperText, Grid, StandardTextFieldProps, TextField } from '@mui/material';
import { Project } from '@prisma/client';
import { Field, FieldArray, FieldProps, FormikContextType, useFormikContext } from 'formik';
import { toast } from 'react-hot-toast';
import { deleteFile } from '../../api/file';
import { UserPortfolio } from '../../types';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Header, Layout } from './Layout';


interface ProjectErrors {
	name: string;
	description: string;
	technology: string;
	course: string;
	file: string;
}
interface DataInputProps extends StandardTextFieldProps {
	gridSize?: number;
	index: number;
	formik: FormikContextType<UserPortfolio>
}

const DataInput = ({ name, index, label, gridSize, type, multiline, minRows, formik }: DataInputProps) => (
	<Field
		name={`projects.${index}.${name}`}
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
					error={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index][name as keyof Project] && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors)[name as keyof ProjectErrors] ? true : false}
					helperText={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index][name as keyof Project] && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors)[name as keyof ProjectErrors] ? (formik.errors.projects[index] as ProjectErrors)[name as keyof ProjectErrors] : null}
				/>
			</Grid>
		)}
	</Field>
);

const Projects = () => {
	const formik = useFormikContext<UserPortfolio>();
	return (
		<Box>
			<Title text="Proyectos" />
			<Helptext>Añade tus proyectos desarrollados a lo largo de la carrera (también pueden ser personales).</Helptext>
			<FieldArray
				name="projects"
				render={arrayHelpers => (
					<Box>
						{formik.values.projects && formik.values.projects.length > 0 ?
							(
								<Box>
									<Box>
										<Button variant="outlined" onClick={() => arrayHelpers.push({ name: '', description: '', technology: '', course: '', file: null })}>Agregar nuevo proyecto</Button>
									</Box>
									<Grid container spacing={2} mt={1}>
										{formik.values.projects.map((experience, index) => (
											<Layout key={index}>
												<Header title='proyecto' index={index + 1} file={experience.file} handleDelete={arrayHelpers.handleRemove(index)}
												/>
												<DataInput
													name='name'
													label="Nombre *"
													formik={formik}
													index={index}
												/>
												<DataInput
													name='course'
													label="Asignatura *"
													formik={formik}
													index={index}
												/>
												<DataInput
													name='technology'
													label="Lenguaje de programación *"
													formik={formik}
													index={index}
													gridSize={12}
												/>
												<DataInput
													name='description'
													formik={formik}
													index={index}
													label="Descripción *"
													multiline
													minRows={3}
													gridSize={12}
												/>
												{formik.values.projects[index].file ? (
													<Grid item xs={12}>
														<Button variant='outlined' fullWidth color="error" onClick={() => {
															formik.setFieldValue(`projects.${index}.file`, null);
															deleteFile(formik.values.projects[index].file);
														}}>Eliminar archivo</Button>
													</Grid>
												) : (
													<Grid item xs={12}>
														<Button fullWidth variant="contained" component='label'>Añadir archivo (.zip)
															<input accept='.zip' type="file" hidden onChange={(e) => {
																if (e.target.files) {
																	const fileSize = e.target.files[0].size / 1024 / 1024;
																	if (fileSize > 10) {
																		toast.error('El archivo no puede pesar más de 10MB');
																		return;
																	}
																	formik.setFieldValue(`projects.${index}.file`, e.target.files[0]);
																}
															}} />
														</Button>
														{formik.touched.projects && formik.touched.projects[index] && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).file ? (
															<FormHelperText error>{(formik.errors.projects[index] as ProjectErrors).file}</FormHelperText>
														) : null}
													</Grid>
												)}
											</Layout>
										))}
									</Grid>

								</Box>
							) : (
								<Box>
									<Button
										variant="outlined"
										onClick={() => arrayHelpers.push({ name: '', description: '', course: '', file: null })}
									>
										Agregar proyecto
									</Button>
								</Box>
							)}
					</Box>
				)}
			/>
		</Box>
	);
};

export default Projects;