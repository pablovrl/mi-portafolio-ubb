import { FormatLineSpacing } from '@mui/icons-material';
import { Box, Button, FormHelperText, Grid, TextField } from '@mui/material';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import { toast } from 'react-hot-toast';
import { UserPortfolio } from '../../types';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Header, Layout } from './Layout';


interface ProjectErrors {
	name: string;
	description: string;
	technology: string;
	course: string;
	deploy: string;
	file: string;
}

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
										<Button variant="outlined" onClick={() => arrayHelpers.push({ name: '', description: '', technology: '', course: '', deploy: '', file: null })}>Agregar nuevo proyecto</Button>
									</Box>
									<Grid container spacing={2} mt={1}>
										{formik.values.projects.map((experience, index) => (
											<Layout key={index}>
												<Header title='proyecto' index={index + 1} handleDelete={arrayHelpers.handleRemove(index)} />	
												<Field
													name={`projects.${index}.name`}
												>
													{({ field }: FieldProps) => (
														<Grid item xs={12}>
															<TextField
																{...field}
																fullWidth
																label="Nombre *"
																error={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index].name && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).name ? true : false}
																helperText={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index].name && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).name ? (formik.errors.projects[index] as ProjectErrors).name : null}
															/>
														</Grid>
													)}
												</Field>
												<Field
													name={`projects.${index}.course`}
												>
													{({ field }: FieldProps) => (
														<Grid item xs={6}>
															<TextField
																{...field}
																fullWidth
																label="Asignatura *"
																error={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index].course && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).course ? true : false}
																helperText={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index].course && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).course ? (formik.errors.projects[index] as ProjectErrors).course : null}
															/>
														</Grid>
													)}
												</Field>
												<Field
													name={`projects.${index}.technology`}
												>
													{({ field }: FieldProps) => (
														<Grid item xs={6}>
															<TextField
																{...field}
																fullWidth
																label="Lenguaje de programación *"
																error={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index].technology && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).technology ? true : false}
																helperText={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index].technology && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).technology ? (formik.errors.projects[index] as ProjectErrors).technology : null}
															/>
														</Grid>
													)}
												</Field>
												<Field
													name={`projects.${index}.description`}
												>
													{({ field }: FieldProps) => (
														<Grid item xs={12}>
															<TextField
																{...field}
																fullWidth
																label="Descripción *"
																multiline
																minRows={3}
																error={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index].description && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).description ? true : false}
																helperText={formik.touched.projects && formik.touched.projects[index] && formik.touched.projects[index].description && formik.errors.projects && formik.errors.projects[index] && (formik.errors.projects[index] as ProjectErrors).description ? (formik.errors.projects[index] as ProjectErrors).description : null}
															/>
														</Grid>
													)}
												</Field>
												{formik.values.projects[index].file ? (
													<Grid item xs={12}>
														<Button variant='outlined' fullWidth color="error" onClick={() => {
															formik.setFieldValue(`projects.${index}.file`, null);
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
										onClick={() => arrayHelpers.push({ name: '', description: '', course: '', deploy: '', file: null })}
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