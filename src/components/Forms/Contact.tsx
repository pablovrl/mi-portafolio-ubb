import { Box, Button, Grid, TextField, Alert, Typography } from '@mui/material';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import { UserPortfolio } from '../../types';
import Helptext from './common/Helptext';
import Title from './common/Title';

const Contact = () => {
	const formik = useFormikContext<UserPortfolio>();
	const error = formik.touched.contacts && Boolean(formik.errors.contacts);
	return (
		<Box>
			<Title text="Contacto" error={error} />
			<Helptext>
				Agrega tus redes de contacto, como por ejemplo, LinkedIn, Github, Página web personal, etc.
			</Helptext>
			<FieldArray
				name="contacts"
				render={arrayHelpers => (
					<Box>
						{formik.values.contacts && formik.values.contacts.length > 0 ? (
							<Box>
								<Grid item xs={6}>
									<Button
										type="button"
										onClick={() => arrayHelpers.push({ name: '', url: '' })} // insert an empty string at a position
										variant='outlined'
										disabled={formik.values.contacts.length >= 3}
									>
										Agregar nueva red de contacto
									</Button>
								</Grid>
								{formik.values.contacts.map((contact, index) => (
									<Grid container spacing={2} key={index} mb={2}>
										<Grid item xs={12}>
											<Typography variant='h6' mt={1}>Contacto {index + 1}</Typography>
										</Grid>
										<Field
											name={`contacts.${index}.name`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField 
														{...field}
														fullWidth 
														label='Nombre' 
														error={formik.touched.contacts && formik.errors.contacts && formik.errors.contacts[index] && formik.errors.contacts[index].name ? true : false}
														helperText={formik.touched.contacts && formik.errors.contacts && formik.errors.contacts[index] && formik.errors.contacts[index].name ? formik.errors.contacts[index].name : null}
													/>
												</Grid>
											)}
										</Field>
										<Field
											name={`contacts.${index}.url`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField 
														{...field} 
														fullWidth 
														label='URL' 
														error={formik.touched.contacts && formik.errors.contacts && formik.errors.contacts[index] && formik.errors.contacts[index].url ? true : false}
														helperText={formik.touched.contacts && formik.errors.contacts && formik.errors.contacts[index] && formik.errors.contacts[index].url ? formik.errors.contacts[index].url : null}
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
												Eliminar
											</Button>
										</Grid>
									</Grid>
								))}
							</Box>
						) : (
							<Box>
								<Button
									variant="outlined"
									onClick={() => arrayHelpers.push({ name: '', url: '' })}
								>Agregar red de contacto</Button>
							</Box>
						)}
					</Box>
				)}
			/>
		</Box>
	);
};

export default Contact;