import { Box, Button, Grid, TextField } from '@mui/material';
import { Field, FieldArray, FieldProps, useFormikContext } from 'formik';
import { UserPortfolio } from '../../types';
import Helptext from './common/Helptext';
import Title from './common/Title';
import { Header, Layout } from './Layout';

interface ContactErrors {
	name: string;
	url: string;
}

const Contact = () => {
	const formik = useFormikContext<UserPortfolio>();
	return (
		<Box>
			<Title text="Contacto" />
			<Helptext>
				Agrega tus redes de contacto, como por ejemplo, LinkedIn, Github, Página web personal, etc.
			</Helptext>
			<FieldArray
				name="contacts"
				render={arrayHelpers => (
					<Box>
						{formik.values.contacts && formik.values.contacts.length > 0 ? (
							<Box>
								<Box display={'flex'} gap={1}>
									<Button
										type="button"
										onClick={() => arrayHelpers.push({ name: '', url: '' })} // insert an empty string at a position
										variant='outlined'
										disabled={formik.values.contacts.length >= 3}
									>
										Agregar nueva red de contacto
									</Button>
									<Button onClick={() => arrayHelpers.push({ name: 'Email', url: `mailto:${formik.values.email}` })} variant='outlined' size='small'>Añadir email</Button>
								</Box>

								<Grid container spacing={2} mt={1}>
									{formik.values.contacts.map((contact, index) => (
										<Layout key={index}>
											<Header title='Contacto' index={index + 1} handleDelete={arrayHelpers.handleRemove(index)} />
											<Field
												name={`contacts.${index}.name`}
											>
												{({
													field, // { name, value, onChange, onBlur }
												}: FieldProps) => (
													<Grid item xs={12}>
														<TextField
															{...field}
															fullWidth
															label='Nombre *'
															error={formik.touched.contacts && formik.touched.contacts[index] && formik.touched.contacts[index].name && formik.errors.contacts && formik.errors.contacts[index] && (formik.errors.contacts[index] as ContactErrors).name ? true : false}
															helperText={formik.touched.contacts && formik.touched.contacts[index] && formik.touched.contacts[index].name && formik.errors.contacts && formik.errors.contacts[index] && (formik.errors.contacts[index] as ContactErrors).name ? (formik.errors.contacts[index] as ContactErrors).name : null}
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
													<Grid item xs={12}>
														<TextField
															{...field}
															fullWidth
															label='Enlace *'
															error={formik.touched.contacts && formik.touched.contacts[index] && formik.touched.contacts[index].url && formik.errors.contacts && formik.errors.contacts[index] && (formik.errors.contacts[index] as ContactErrors).url ? true : false}
															helperText={formik.touched.contacts && formik.touched.contacts[index] && formik.touched.contacts[index].url && formik.errors.contacts && formik.errors.contacts[index] && (formik.errors.contacts[index] as ContactErrors).url ? (formik.errors.contacts[index] as ContactErrors).url : null}
														/>
													</Grid>
												)}
											</Field>
										</Layout>
									))}
								</Grid>

							</Box>
						) : (
							<Box display={'flex'} gap={1}>
								<Button
									variant="outlined"
									onClick={() => arrayHelpers.push({ name: '', url: '' })}
								>Agregar red de contacto</Button>
								<Button onClick={() => arrayHelpers.push({ name: 'Email', url: `mailto:${formik.values.email}` })} variant='outlined' size='small'>Añadir email</Button>
							</Box>
						)}
					</Box>
				)}
			/>
		</Box>
	);
};

export default Contact;