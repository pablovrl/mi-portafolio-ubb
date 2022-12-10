import { Box, Button, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { Field, FieldArray, useFormikContext } from 'formik';
import { toast } from 'react-hot-toast';
import { UserPortfolio } from '../../types';
import Helptext from './common/Helptext';
import Title from './common/Title';

const Projects = () => {
	const formik = useFormikContext<UserPortfolio>();
	const error = formik.touched.projects && Boolean(formik.errors.projects);
	return (
		<Box>
			<Title text="Proyectos" error={error} />
			<Helptext>Añade tus proyectos desarrollados a lo largo de la carrera (también pueden ser personales).</Helptext>
			<FieldArray
				name="projects"
				render={arrayHelpers => (
					<Box>
						{formik.values.projects && formik.values.projects.length > 0 ?
							(
								<Box>
									<Box mb={2}>
										<Button variant="outlined" onClick={() => arrayHelpers.push({ name: '', description: '', technology: '', course: '', deploy: '', file: null })}>Agregar nuevo proyecto</Button>
									</Box>
									{formik.values.projects.map((experience, index) => (
										<Grid container spacing={2} key={index} mb={2}>
											<Grid item xs={12}>
												<Typography variant='h6'>Proyecto {index + 1}</Typography>
											</Grid>
											<Field
												name={`projects.${index}.name`}
											>
												{({ field }: any) => (
													<Grid item xs={12}>
														<TextField 
															{...field} 
															fullWidth 
															label="Nombre" 
															error={formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].name ? true : false}
															helperText={formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].name ? formik.errors.projects[index].name : null}
														/>
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.course`}
											>
												{({ field }: any) => (
													<Grid item xs={6}>
														<TextField 
															{...field} 
															fullWidth 
															label="Asignatura" 
															error={formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].course ? true : false}
															helperText={formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].course ? formik.errors.projects[index].course : null}
														/>
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.technology`}
											>
												{({ field }: any) => (
													<Grid item xs={6}>
														<TextField 
															{...field} 
															fullWidth 
															label="Lenguaje de programación" 
															error={formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].technology ? true : false}
															helperText={formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].technology ? formik.errors.projects[index].technology : null}
														/>
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.description`}
											>
												{({ field }: any) => (
													<Grid item xs={12}>
														<TextField 
															{...field} 
															fullWidth 
															label="Descripción" 
															multiline 
															minRows={3} 
															error={formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].description ? true : false}
															helperText={formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].description ? formik.errors.projects[index].description : null}
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
																if(fileSize > 10) {
																	toast.error('El archivo no puede pesar más de 10MB');
																	return;
																}
																formik.setFieldValue(`projects.${index}.file`, e.target.files[0]);
															}
														}} />
													</Button>
													{formik.touched.projects && formik.errors.projects && formik.errors.projects[index] && formik.errors.projects[index].file ? (
														<FormHelperText error>{formik.errors.projects[index].file}</FormHelperText>
													) : null}
												</Grid>
											)}
											<Grid item xs={6}>
												<Button fullWidth variant="outlined" color="error" onClick={() => arrayHelpers.remove(index)}>Eliminar Proyecto</Button>
											</Grid>
										</Grid>
									))}
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