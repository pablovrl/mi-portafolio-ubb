import { Box, Button, Container, CssBaseline, FormControl, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { changeUserPassword } from '../../api/user';
import Logo from '../../components/Logo';
import { password } from '../../utils/yupValidations';
import * as yup from 'yup';

const validationSchema = yup.object({
	password: password,
	confirmPassword: yup
		.string()
		.required('Confirmar contraseña es requerido')
		.oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
});

const RecuperarContraseña: NextPage = () => {
	const { token } = useRouter().query;
	const router = useRouter();
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box mb={2}>
					<Logo />
				</Box>
				<Typography component="h1" variant="h5">
					Recuperar contraseña
				</Typography>
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						password: '',
						confirmPassword: '',
					}}
					onSubmit={async (values) => {
						try {
							await changeUserPassword({ token: token as string, newPassword: values.password });
							toast.success('Contraseña cambiada');
							router.push('/iniciar-sesion');
						} catch (e) {
							toast.error('Error al cambiar la contraseña');
						}
					}}
				>
					{props => (
						<Box component="form" onSubmit={props.handleSubmit} mt={1}>
							<Box my={2}>
								<FormControl fullWidth >
									<TextField
										type={'password'}
										label='Nueva contraseña'
										onChange={props.handleChange}
										value={props.values.password}
										name='password'
										error={props.touched.password && Boolean(props.errors.password)}
										helperText={props.touched.password && props.errors.password}

									/>
								</FormControl>
							</Box>
							<FormControl fullWidth>
								<TextField
									type={'password'}
									label='Confirmar nueva contraseña'
									onChange={props.handleChange}
									value={props.values.confirmPassword}
									name='confirmPassword'
									error={props.touched.confirmPassword && Boolean(props.errors.confirmPassword)}
									helperText={props.touched.confirmPassword && props.errors.confirmPassword}
								/>
							</FormControl>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Cambiar contraseña
							</Button>
						</Box>
					)}
				</Formik>
			</Box>
		</Container>
	);
};

export default RecuperarContraseña;