import { Box, Button, Grid, TextField, Alert } from '@mui/material';
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
			{error && <Alert severity='error' >Por favor completa todos los campos.</Alert>}
			<Helptext>
				Agrega tus redes de contacto, como por ejemplo, LinkedIn, Github, Página web personal, etc.
			</Helptext>
			<FieldArray
				name="contacts"
				render={arrayHelpers => (
					<Box>
						{formik.values.contacts && formik.values.contacts.length > 0 ? (
							<Box>
								{formik.values.contacts.map((contact, index) => (
									<Grid container spacing={2} key={index} mb={2}>
										<Field
											name={`contacts.${index}.name`}
										>
											{({
												field, // { name, value, onChange, onBlur }
											}: FieldProps) => (
												<Grid item xs={6}>
													<TextField {...field} fullWidth label='Nombre' />
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
													<TextField {...field} fullWidth label='URL' />
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
										{index === formik.values.contacts.length - 1 &&
											<Grid item xs={6}>
												<Button
													type="button"
													onClick={() => arrayHelpers.insert(index, { name: '', url: '' })} // insert an empty string at a position
													fullWidth
													variant='contained'
													disabled={formik.values.contacts.length >= 3}
												>
													Agregar
												</Button>
											</Grid>
										}
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