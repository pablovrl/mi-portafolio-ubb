import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { updateUser } from '../api/user';
import * as yup from 'yup';
import { name, lastName } from '../utils/yupValidations';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  name: string;
  lastName: string;
}

const validationSchema = yup.object({
	name,
	lastName
});

const ChangeNameDialog = ({ open, onClose, name, lastName }: DialogProps) => {
	const router = useRouter();

	const handleSubmit = async (values: {name: string, lastName: string})  => {
		const res = await updateUser(values);
		if (res.status === 200) {
			router.reload();
			toast.success('Nombre y apellido actualizado con éxito.');
			onClose();
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					name,
					lastName
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
										label='Nombre' 
										onChange={props.handleChange} 
										value={props.values.name} 
										name='name' 
										error={props.touched.name && Boolean(props.errors.name)} 
										helperText={props.touched.name && props.errors.name}

									/>
								</FormControl>
								<FormControl fullWidth>
									<TextField 
										label='Apellido' 
										onChange={props.handleChange} 
										value={props.values.lastName} 
										name='lastName' 
										error={props.touched.lastName && Boolean(props.errors.lastName)} 
										helperText={props.touched.lastName && props.errors.lastName}
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

export default ChangeNameDialog;