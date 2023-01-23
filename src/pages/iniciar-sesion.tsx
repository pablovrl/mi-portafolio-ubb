import {
	Alert,
	Button,
	CssBaseline,
	Box,
	Typography,
	Container,
	Dialog,
	Link as MuiLink,
	TextField,
} from '@mui/material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Logo from '../components/Logo';
import { Formik } from 'formik';
import * as yup from 'yup';
import { email, password } from '../utils/yupValidations';
import FormikInput from '../components/FormikInput';
import { useState } from 'react';
import { resetUserPassword } from '../api/user';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import Loading from '../components/Loading';

const validationSchema = yup.object({
	email,
	password
});

// create dialog mui component
const PasswordRecoveryDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
	const mutation = useMutation((data: { email: string }) => resetUserPassword(data), {
		onSuccess: () => {
			toast.success('Se ha enviado un correo para recuperar tu contraseña', {
				duration: 5000
			});
			onClose();
		},
		onError: () => {
			toast.error('Error al enviar el correo');
		}
	});
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<Loading open={mutation.isLoading} />
			<Box p={2}>
				<Typography variant="h6" component="h2">
					Recuperar contraseña
				</Typography>
				<Typography variant="body2" component="p">
					Ingresa tu correo electrónico y te enviaremos un enlace para que puedas
					recuperar tu contraseña.
				</Typography>
				<Formik
					validationSchema={yup.object({
						email: email
					})}
					initialValues={{ email: '' }}
					onSubmit={async (values) => {
						mutation.mutate(values);
					}}
				>
					{props => (
						<Box component={'form'} onSubmit={props.handleSubmit} display='flex' flexDirection={'column'}>
							<Box my={2}>
								<TextField
									name='email'
									onChange={props.handleChange}
									label='Correo electrónico'
									fullWidth
									error={props.touched.email && Boolean(props.errors.email)}
									helperText={props.touched.email && props.errors.email}
								/>
							</Box>
							<Box alignSelf={'end'}>
								<Button>Cancelar</Button>
								<Button type='submit'>Enviar</Button>
							</Box>
						</Box>
					)}
				</Formik>
			</Box>
		</Dialog>
	);
};

export default function SignIn() {
	const router = useRouter();
	const { error } = router.query;
	const [isOpen, setOpen] = useState(false);

	return (
		<Container component="main" maxWidth="xs">
			<PasswordRecoveryDialog isOpen={isOpen} onClose={() => setOpen(false)} />
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
							<Box display={'flex'} justifyContent='flex-end' width={'100%'}>
								<Link href={'/portafolios'}>
									<Button
										href='/portafolios'
										type="submit"
										color="warning"
										variant="outlined"
										sx={{ mt: 0, mb: 2, }}
									>
										Entrar como invitado
									</Button>
								</Link>
							</Box>
							<Box mb={1} display={'flex'} justifyContent='flex-end'>
								<MuiLink onClick={() => setOpen(true)} variant="body2" sx={{ cursor: 'pointer' }}>
									¿Olvidaste tu contraseña?
								</MuiLink>
							</Box>
							<Box display={'flex'} justifyContent='flex-end'>
								<Link href={'/registrarse'}>
									<MuiLink variant="body2" sx={{ cursor: 'pointer' }}>
										¿Aún no tienes una cuenta? Regístrate
									</MuiLink>
								</Link>
							</Box>
						</Box>
					)}
				</Formik>
			</Box>
		</Container>
	);
}
