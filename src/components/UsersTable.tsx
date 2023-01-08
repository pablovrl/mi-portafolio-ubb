import { Link as MUILink, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, TextField, Pagination } from '@mui/material';
import { User } from '@prisma/client';
import { deletePortfolioAsAdmin } from '../api/user';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useState } from 'react';

const ROWS = 5;
interface Props {
	users: User[];
}
const UsersTable = ({ users }: Props) => {
	const [filter, setFilter] = useState('');
	const [page, setPage] = useState(1);

	const filteredData = users.filter((user) =>
		user.name?.toLowerCase().includes(filter.toLowerCase()) ||
		user.lastName?.toLowerCase().includes(filter.toLowerCase()) ||
		user.email?.toLowerCase().includes(filter.toLowerCase())
	);

	const totalPages = Math.ceil(filteredData.length / ROWS);

	const currentPageData = filteredData.slice((page - 1) * ROWS, page * ROWS);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const deletePortfolio = useMutation((email: string) => deletePortfolioAsAdmin(email), {
		onSuccess: () => {
			toast.success('Portafolio eliminado');
			window.location.reload();
		}
	});

	return (
		<Box>
			<Box mb={2}>
				<TextField label="Busca usuarios por su nombre, apellido o correo electrónico" fullWidth onChange={(e) => { setFilter(e.target.value); setPage(1); }} />
			</Box>
			<TableContainer sx={{height: '360px'}}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nombre</TableCell>
							<TableCell>Correo</TableCell>
							<TableCell>Carrera</TableCell>
							<TableCell>Portafolio</TableCell>
							<TableCell>Eliminar portafolio</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currentPageData.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.name} {user.lastName}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.career}</TableCell>
								<TableCell>
									{user.portfolio ? (
										<Box display={'flex'} alignItems='center'>
											<MUILink target={'_blank'} href={`/portafolio/${user.email}`}>Ver portafolio</MUILink>
										</Box>
									) : (
										<Typography variant={'body2'} color={'textSecondary'}>No tiene portafolio</Typography>
									)}
								</TableCell>
								<TableCell>
									<IconButton disabled={!user.portfolio} onClick={() => deletePortfolio.mutate(user.email)} color='error'>
										<DeleteForeverIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box display='flex' my={2} alignItems='center' justifyContent={'center'} flexDirection='column' gap={2}>
				<Pagination size='small' page={page} onChange={handleChange} count={totalPages} />
			</Box>
		</Box>
	);
};

export default UsersTable;