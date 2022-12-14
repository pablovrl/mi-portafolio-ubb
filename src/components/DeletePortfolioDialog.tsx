import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { deletePortfolio } from '../api/user';

interface Props {
  open: boolean;
  onClose: () => void;
}

const DeletePortfolioDialog = ({ open, onClose }: Props) => {
	const router = useRouter();
	const mutation = useMutation(deletePortfolio, {
		onSuccess: () => {
			toast.success('Portafolio eliminado');
			router.push('/portafolios');
		},
	});

	const handleDeletePortfolio = async () => {
		mutation.mutate();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Estás seguro?, no podrás recuperar los datos.</DialogTitle>
			<DialogActions>
				<Button onClick={onClose}>Volver</Button>
				<Button onClick={handleDeletePortfolio} color='error'>Eliminar</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeletePortfolioDialog;