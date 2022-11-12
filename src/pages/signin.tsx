import {
	Alert,
	Button,
	CssBaseline,
	Grid,
	Box,
	Typography,
	Container,
	Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Logo from '../components/Logo';
import { Formik } from 'formik';
import * as yup from 'yup';
import { email, password } from '../utils/yupValidations';
import FormikInput from '../components/FormikInput';

const validationSchema = yup.object({
	email,
	password
});

export default function SignIn() {
	const router = useRouter();
	const { error } = router.query;

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
					Iniciar sesión
				</Typography>
				{error && (
					<Alert severity="error" sx={{ width: '100%', mt: 2 }}>
						Las credenciales ingresadas no son válidas.
					</Alert>
				)}
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						email: '',
						password: ''
					}}
					onSubmit={values => {
						signIn('credentials', {
							callbackUrl: '/',
							email: values.email,
							password: values.password,
						});
					}}
				>
					{props => (
						<Box component="form" onSubmit={props.handleSubmit} mt={1}>
							<FormikInput
								autoFocus
								name='email'
								label='Correo electrónico'
								margin="normal"
							/>
							<FormikInput
								autoFocus
								name='password'
								label='Contraseña'
								type={'password'}
								margin="normal"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Iniciar sesión
							</Button>
							<Grid container>
								<Grid item xs></Grid>
								<Grid item>
									<Link href={'/signup'}>
										<MuiLink variant="body2" sx={{ cursor: 'pointer' }}>
											¿Aún no tienes una cuenta? Regístrate
										</MuiLink>
									</Link>
								</Grid>
							</Grid>
						</Box>
					)}
				</Formik>
			</Box>
		</Container>
	);
}
