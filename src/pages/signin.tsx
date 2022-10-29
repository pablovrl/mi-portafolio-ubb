import {
	Alert,
	Button,
	CssBaseline,
	TextField,
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
import { useFormik } from 'formik';
import * as yup from 'yup';
import { email, password } from '../utils/yupValidations';

const validationSchema = yup.object({
	email,
	password
});

export default function SignIn() {
	const router = useRouter();
	const { error } = router.query;

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			signIn('credentials', {
				callbackUrl: '/',
				email: values.email,
				password: values.password,
			});
		}
	});

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Logo />
				<Typography component="h1" variant="h5">
          Iniciar sesión
				</Typography>
				<Box component="form" onSubmit={formik.handleSubmit} noValidate mt={1}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Correo electrónico"
						name="email"
						autoComplete="email"
						autoFocus
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Contraseña"
						type="password"
						id="password"
						autoComplete="current-password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					{error && (
						<Alert severity="error" sx={{ width: '100%' }}>
              Las credenciales ingresadas no son válidas.
						</Alert>
					)}
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
			</Box>
		</Container>
	);
}
