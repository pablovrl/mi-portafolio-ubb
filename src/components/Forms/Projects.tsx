import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Field, FieldArray, useFormikContext } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { UserPortfolio } from '../../types';
import Helptext from './common/Helptext';
import Title from './common/Title';

const Projects = () => {
	const formik = useFormikContext<UserPortfolio>();
	const error = formik.touched.projects && Boolean(formik.errors.projects);
	return (
		<Box>
			<Title text="Proyectos" error={error} />
			{error && <Alert severity='error' >Por favor completa todos los campos.</Alert>}
			<Helptext>Añade tus proyectos desarrollados a lo largo de la carrera (también pueden ser personales).</Helptext>
			<FieldArray
				name="projects"
				render={arrayHelpers => (
					<Box>
						<Toaster />
						{formik.values.projects && formik.values.projects.length > 0 ?
							(
								<Box>
									<Button variant="outlined" onClick={() => arrayHelpers.push({ name: '', description: '', technology: '', course: '', deploy: '', file: null })}>Agregar nuevo proyecto</Button>
									{formik.values.projects.map((experience, index) => (
										<Grid container spacing={2} key={index} my={2}>
											<Grid item xs={12}>
												<Typography variant='h6'>Proyecto {index + 1}</Typography>
											</Grid>
											<Field
												name={`projects.${index}.name`}
											>
												{({ field }: any) => (
													<Grid item xs={12}>
														<TextField fullWidth error={error} {...field} label="Nombre" />
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.course`}
											>
												{({ field }: any) => (
													<Grid item xs={6}>
														<TextField fullWidth error={error} {...field} label="Asignatura" />
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.technology`}
											>
												{({ field }: any) => (
													<Grid item xs={6}>
														<TextField fullWidth error={error} {...field} label="Lenguaje de programación" />
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.description`}
											>
												{({ field }: any) => (
													<Grid item xs={12}>
														<TextField error={error} fullWidth {...field} label="Descripción" multiline minRows={3} />
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