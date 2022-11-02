import {
	Button,
	CssBaseline,
	TextField,
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
	Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import Logo from '../components/Logo';
import * as yup from 'yup';
import { name, lastName, email, password, career } from '../utils/yupValidations';
import { useMutation } from 'react-query';
import axios from 'axios';
import Router from 'next/router';

const validationSchema = yup.object({
	name,
	lastName,
	email,
	password,
	career
});

export default function SignUp() {
	const formik = useFormik({
		initialValues: {
			name: '',
			lastName: '',
			career: '',
			email: '',
			password: ''
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			mutation.mutate(values);
		}
	});
	const mutation = useMutation((user: typeof formik.values) => axios.post('/api/auth/register', user), {
		onSuccess: () => {
			Router.replace('/signin');
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
					Registrarse
				</Typography>
				<Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="name"
								required
								fullWidth
								id="name"
								label="Nombre"
								autoFocus
								value={formik.values.name}
								onChange={formik.handleChange}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Apellido"
								name="lastName"
								autoComplete="family-name"
								value={formik.values.lastName}
								onChange={formik.handleChange}
								error={formik.touched.lastName && Boolean(formik.errors.lastName)}
								helperText={formik.touched.lastName && formik.errors.lastName}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth
								error={formik.touched.career && Boolean(formik.errors.career)}
							>
								<InputLabel
								>Carrera *</InputLabel>
								<Select
									required
									fullWidth
									label="Carrera"
									name="career"
									value={formik.values.career}
									onChange={formik.handleChange}
								>
									<MenuItem value="IECI">IECI</MenuItem>
									<MenuItem value="ICINF">ICINF</MenuItem>
								</Select>
								<FormHelperText>{formik.errors.career}</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Correo electrónico"
								name="email"
								autoComplete="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Contraseña"
								type="password"
								id="password"
								autoComplete="new-password"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={formik.touched.password && Boolean(formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
							/>
						</Grid>
						<Grid item xs={12}></Grid>
					</Grid>
					{mutation.isError && <Alert severity='error' sx={{ width: '100%' }}>El correo electrónico ya ha sido registrado</Alert>}
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
							<Link href={'/signin'}>
								<MuiLink variant="body2" sx={{ cursor: 'pointer' }}>
									¿Ya tienes una cuenta? Inicia sesión
								</MuiLink>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
