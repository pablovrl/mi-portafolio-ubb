import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import { Field, FieldArray, useFormikContext } from 'formik';
import { UserPortfolio } from '../../types';
import Helptext from './common/Helptext';
import Title from './common/Title';

const Projects = () => {
	const formik = useFormikContext<UserPortfolio>();
	const error = formik.touched.projects && Boolean(formik.errors.projects);
	return (
		<Box>
			<Title text="Proyectos" error={error}/>
			{error && <Alert severity='error' >Por favor completa todos los campos.</Alert>}
			<Helptext>Añade tus proyectos desarrollados a lo largo de la carrera (también pueden ser personales).</Helptext>
			<FieldArray
				name="projects"
				render={arrayHelpers => (
					<Box>
						{formik.values.projects && formik.values.projects.length > 0 ?
							(
								<Box>
									{formik.values.projects.map((experience, index) => (
										<Grid container spacing={2} key={index} mb={2}>
											<Field
												name={`projects.${index}.name`}
											>
												{({ field }: any) => (
													<Grid item xs={6}>
														<TextField fullWidth error={error} {...field} label="Nombre" />
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.deploy`}
											>
												{({ field }: any) => (
													<Grid item xs={6}>
														<TextField fullWidth error={error} {...field} label="URL" />
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.course`}
											>
												{({ field }: any) => (
													<Grid item xs={12}>
														<TextField fullWidth error={error} {...field} label="Asignatura" />
													</Grid>
												)}
											</Field>
											<Field
												name={`projects.${index}.technology`}
											>
												{({ field }: any) => (
													<Grid item xs={12}>
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
														<input type="file" hidden onChange={(e) => {
															if (e.target.files) {
																formik.setFieldValue(`projects.${index}.file`, e.target.files[0]);
															}
														}} />
													</Button>
												</Grid>
											)}
											<Grid item xs={6}>
												<Button fullWidth variant="outlined" onClick={() => arrayHelpers.insert(index, {name: '', description: '', technology: '', course: '', deploy: '', file: null})}>Agregar proyecto</Button>
											</Grid>
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