import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { changeUserPassword } from '../api/user';
import * as yup from 'yup';
import { password } from '../utils/yupValidations';

interface DialogProps {
	open: boolean;
	onClose: () => void;
}

const validationSchema = yup.object({
	password,
	newPassword: password,
	confirmNewPassword: yup
		.string()
		.required('Confirmar contraseña es requerido')
		.oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden'),
});

const ChangePasswordDialog = ({ open, onClose }: DialogProps) => {
	const handleSubmit = async (values: { password: string, newPassword: string }) => {
		try {
			await changeUserPassword({ password: values.password, newPassword: values.newPassword });
			toast.success('Contraseña cambiada con éxito');
			onClose();
		} catch (error) {
			toast.error('Contraseña incorrecta');
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					password: '',
					newPassword: '',
					confirmNewPassword: ''
				}}
				onSubmit={handleSubmit}
			>
				{props => (
					<Box width={{ xs: '18rem', md: '25rem' }} component={'form'} onSubmit={props.handleSubmit}>
						<DialogTitle>Cambia tu contraseña</DialogTitle>
						<DialogContent>
							<Box my={1} display={'flex'} gap={2} flexDirection='column'>
								<FormControl fullWidth >
									<TextField
										type={'password'}
										label='Contraseña actual'
										onChange={props.handleChange}
										value={props.values.password}
										name='password'
										error={props.touched.password && Boolean(props.errors.password)}
										helperText={props.touched.password && props.errors.password}

									/>
								</FormControl>
								<FormControl fullWidth>
									<TextField
										type={'password'}
										label='Nueva contraseña'
										onChange={props.handleChange}
										value={props.values.newPassword}
										name='newPassword'
										error={props.touched.newPassword && Boolean(props.errors.newPassword)}
										helperText={props.touched.newPassword && props.errors.newPassword}
									/>
								</FormControl>
								<FormControl fullWidth>
									<TextField
										type={'password'}
										label='Repetir nueva contraseña'
										onChange={props.handleChange}
										value={props.values.confirmNewPassword}
										name='confirmNewPassword'
										error={props.touched.confirmNewPassword && Boolean(props.errors.confirmNewPassword)}
										helperText={props.touched.confirmNewPassword && props.errors.confirmNewPassword}
									/>
								</FormControl>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={onClose}>Cancelar</Button>
							<Button type='submit'>Guardar</Button>
						</DialogActions>
					</Box>
				)}
			</Formik>
		</Dialog>
	);
};

export default ChangePasswordDialog;