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
	password: password,
	newPassword: password,
	repeatNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Las contraseña no coincide')
});

const ChangePasswordDialog = ({ open, onClose}: DialogProps) => {
	const handleSubmit = async (values: { password: string, newPassword: string }) => {
		try {
			await changeUserPassword({ password: values.password, newPassword: values.newPassword });
			toast.success('Contraseña cambiada con éxito');
			onClose();
		} catch(error) {
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
					repeatNewPassword: ''
				}}
				onSubmit={handleSubmit}
			>
				{props => (
					<Box component={'form'} onSubmit={props.handleSubmit}>
						<DialogTitle>Cambia tu nombre o apellido</DialogTitle>
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
										value={props.values.repeatNewPassword}
										name='repeatNewPassword'
										error={props.touched.repeatNewPassword && Boolean(props.errors.repeatNewPassword)}
										helperText={props.touched.repeatNewPassword && props.errors.repeatNewPassword}
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