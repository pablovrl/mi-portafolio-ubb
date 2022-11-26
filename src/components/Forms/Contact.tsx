import { Box, Button, Grid, TextField } from '@mui/material';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import Helptext from './common/Helptext';
import Title from './common/Title';

const Contact = () => {
	const formik = useFormikContext<{ contact: { name: string, url: string }[] }>();
	return (
		<Box>
			<Title text="Contacto" />
			<Helptext>
				Agrega tus redes de contacto, como por ejemplo, LinkedIn, Github, Página web personal, etc.
			</Helptext>
			<FieldArray
				name="contact"
				render={arrayHelpers => (
					<Box>
						{formik.values.contact && formik.values.contact.length > 0 ? (
							<Box>
								{formik.values.contact.map((contact, index) => (
									<Grid container spacing={2} key={index} mt={2}>
										<Field
											name={`contact.${index}.name`}
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
											name={`contact.${index}.url`}
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
										{index === formik.values.contact.length - 1 &&
											<Grid item xs={6}>
												<Button
													type="button"
													onClick={() => arrayHelpers.insert(index, { name: '', url: '' })} // insert an empty string at a position
													fullWidth
													variant='contained'
													disabled={formik.values.contact.length >= 3}
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