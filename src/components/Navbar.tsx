import { AppBar, Box, Button, Dialog, DialogActions, DialogTitle, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Logo from './Logo';
import Link from 'next/link';
import { deletePortfolio, getCurrentUser } from '../api/user';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { User } from '@prisma/client';

const Navbar = () => {
	const session = useSession();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const handleDrawerToggle = () => setOpen(!open);
	const query = useQuery<{ data: User }, Error>('user', getCurrentUser);
	const navLinks = [
		{ text: 'Inicio', href: '/', disabled: false },
		{ text: 'Mi portafolio', href: `/portafolio/${session.data?.user?.email}`, disabled: false },
		{ text: 'Editar portafolio', href: '/portafolio/editar', disabled: !query.data?.data.portfolio },
	];

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};



	const mutation = useMutation(deletePortfolio, {
		onSuccess: () => {
			toast.success('Portafolio eliminado');
			router.push('/');
		},
	});


	const handleDeletePortfolio = async () => {
		mutation.mutate();
	};

	// TODO: REFACTOR THIS COMPONENT
	const drawer = query.isSuccess && (
		<Box sx={{ textAlign: 'center' }}>
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>Estás seguro?, no podrás recuperar los datos.</DialogTitle>	
				<DialogActions>
					<Button onClick={handleDialogClose}>Volver</Button>
					<Button onClick={handleDeletePortfolio} color='error'>Eliminar</Button>
				</DialogActions>
			</Dialog>
			<Box px={4} py={2}>
				<Logo />
			</Box>
			<Divider />
			<List>
				{navLinks.map(link => (
					<Link href={link.href} key={link.text}>
						<ListItemButton disabled={link.disabled} sx={{ textAlign: 'center' }} onClick={handleDrawerToggle}>
							<ListItemText primary={link.text} />
						</ListItemButton>
					</Link>
				))}
				<ListItemButton disabled={!query.data.data.portfolio} onClick={handleDialogOpen} sx={{ textAlign: 'center' }}>
					<ListItemText primary={'Borrar portafolio'} />
				</ListItemButton>
				<ListItemButton onClick={() => signOut({ callbackUrl: '/iniciar-sesion' })} sx={{ textAlign: 'center' }}>
					<ListItemText primary={'Cerrar sesión'} />
				</ListItemButton>
			</List>
		</Box>
	);

	return (
		<Box mb={2}>
			<Drawer
				variant='temporary'
				open={open}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: '75%', md: '25%' } },
				}}
			>
				{drawer}
			</Drawer>
			<AppBar position='static'>
				<Toolbar>
					<Box display='flex' justifyContent={'space-between'} width='100%'>
						<IconButton onClick={handleDrawerToggle} color='inherit'>
							<MenuIcon />
						</IconButton>
						<Box>
							<img src='/ubb.png' width={'100px'} />
						</Box>
						<Box height={'40px'} width='40px' />
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;