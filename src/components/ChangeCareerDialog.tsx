import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { User } from '@prisma/client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateUser } from '../api/user';

interface DialogProps {
  open: boolean;
  onClose: () => void;
	updateUserState: (values: Partial<User>) => void;
  career: string;
}

const ChangeCareerDialog = ({open, onClose, career, updateUserState}: DialogProps) => {
	const [selectedCareer, setSelectedCareer] = useState(career);
	const changeCareer = async () => {
		if(selectedCareer === career) {
			toast('Ya perteneces a esa carrera.');
			return;
		}
		try {
			await updateUser({ career: selectedCareer as 'IECI' | 'ICINF' });
			updateUserState({ career: selectedCareer as 'IECI' | 'ICINF' });
			toast.success('Carrera actualizada con éxito.');
			onClose();
		} catch(error) {
			toast.error('Error al actualizar.');
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Selecciona tu nueva carrera</DialogTitle>
			<DialogContent>
				<Box my={1}>
					<FormControl fullWidth>
						<InputLabel>Carrera</InputLabel>
						<Select
							fullWidth
							label="Carrera"
							name="career"
							value={selectedCareer}
							onChange={(e) => {
								setSelectedCareer(e.target.value as string);
							}}
						>
							<MenuItem value="IECI">IECI</MenuItem>
							<MenuItem value="ICINF">ICINF</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancelar</Button>
				<Button onClick={changeCareer}>Guardar</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ChangeCareerDialog;