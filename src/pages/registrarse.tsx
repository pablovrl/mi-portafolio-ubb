import {
	Button,
	CssBaseline,
	Grid,
	Box,
	Typography,
	Container,
	Link as MuiLink,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
	Alert
} from '@mui/material';
import { Formik } from 'formik';
import Link from 'next/link';
import Logo from '../components/Logo';
import * as yup from 'yup';
import { name, lastName, email, password, career } from '../utils/yupValidations';
import { useMutation } from 'react-query';
import { CreateUser } from '../types';
import FormikInput from '../components/FormikInput';
import { register } from '../api/user';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const validationSchema = yup.object({
	name,
	lastName,
	email,
	password,
	career
});

export default function SignUp() {
	const mutation = useMutation((user: CreateUser) => register(user));
	const router = useRouter();
	if(mutation.isSuccess) {
		toast.success('Usuario registrado con éxito.');
		router.replace('/iniciar-sesion');
	}

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
					Registrarse
				</Typography>
				{mutation.isError &&
					<Alert severity="error" sx={{ width: '100%', mt: 2 }}>
						El correo electrónico ingresado ya está en uso.
					</Alert>
				}
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						name: '',
						lastName: '',
						career: '',
						email: '',
						password: ''
					}}
					onSubmit={async values => {
						mutation.mutate(values);
					}}
				>
					{props => (
						<Box component="form" onSubmit={props.handleSubmit} sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<FormikInput
										label='Nombre'
										name='name'
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormikInput
										label='Apellido'
										name='lastName'
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl fullWidth
										error={props.touched.career && Boolean(props.errors.career)}
									>
										<InputLabel>Carrera</InputLabel>
										<Select
											fullWidth
											label="Carrera"
											name="career"
											value={props.values.career}
											onChange={props.handleChange}
										>
											<MenuItem value="IECI">IECI</MenuItem>
											<MenuItem value="ICINF">ICINF</MenuItem>
										</Select>
										{(props.touched.career && Boolean(props.errors.career)) && <FormHelperText>{props.errors.career}</FormHelperText>}
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<FormikInput
										label='Correo electrónico'
										name='email'
									/>
								</Grid>
								<Grid item xs={12}>
									<FormikInput
										label='Contraseña'
										name='password'
										type='password'
									/>
								</Grid>
								<Grid item xs={12}></Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								disabled={mutation.isLoading}
							>
								Registrarse
							</Button>
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link href={'/iniciar-sesion'}>
										<MuiLink variant="body2" sx={{ cursor: 'pointer' }}>
											¿Ya tienes una cuenta? Inicia sesión
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
