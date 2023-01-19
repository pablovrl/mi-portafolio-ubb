import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  action: () => void;
}

export const DeleteDialog = ({ open, onClose, action }: DeleteDialogProps) => {
	return (
		<Dialog open={open} onClose={onClose} >
			<DialogTitle>Estás seguro?, no podrás recuperar los datos.</DialogTitle>
			<DialogActions>
				<Button onClick={onClose}>Volver</Button>
				<Button onClick={action} color='error'>Eliminar</Button>
			</DialogActions>
		</Dialog >
	);
};
