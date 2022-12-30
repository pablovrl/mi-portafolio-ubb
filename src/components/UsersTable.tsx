import { Link as MUILink, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography } from '@mui/material';
import { User } from '@prisma/client';
import { deletePortfolioAsAdmin } from '../api/user';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

interface Props {
  users: User[];
}
const UsersTable = ({ users }: Props) => {
	const deletePortfolio = useMutation((email: string) => deletePortfolioAsAdmin(email), {
		onSuccess: () => {
			toast.success('Portafolio eliminado');
			window.location.reload();
		}
	});

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nombre</TableCell>
						<TableCell>Correo</TableCell>
						<TableCell>Carrera</TableCell>
						<TableCell>Portafolio</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.name} {user.lastName}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.career}</TableCell>
							<TableCell>
								{user.portfolio ? (
									<Box display={'flex'} alignItems='center'>
										<MUILink target={'_blank'} href={`/portafolio/${user.email}`}>Ver portafolio</MUILink>
										<IconButton onClick={() => deletePortfolio.mutate(user.email)} color='error'>
											<DeleteForeverIcon />
										</IconButton>
									</Box>
								) : (
									<Typography variant={'body2'} color={'textSecondary'}>No tiene portafolio</Typography>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UsersTable;