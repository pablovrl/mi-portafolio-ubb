import { AppBar, Box, Button, Dialog, DialogActions, DialogTitle, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
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
		{ text: 'Buscar portafolios', href: '/portafolios', disabled: false },
		{ text: 'Buscar proyectos', href: '/proyectos', disabled: false },
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
			router.push('/portafolios');
		},
	});

	const handleDeletePortfolio = async () => {
		mutation.mutate();
	};

	const handleSignOut = async () => {
		await	signOut({ callbackUrl: '/iniciar-sesion' });
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
				<ListItemButton onClick={handleSignOut} sx={{ textAlign: 'center' }}>
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
			<AppBar position='fixed'>
				<Toolbar>
					<Box display={'flex'} justifyContent='space-between' width={'100%'}>
						<Box display={'flex'} gap={2}>
							<IconButton onClick={handleDrawerToggle} color='inherit'>
								<MenuIcon />
							</IconButton>
							<Box sx={{textDecoration: 'none'}} component={'a'} href='/portafolios' color={'inherit'} display={'flex'} alignItems='center' gap={1}>
								<Box>
									<img src='/ubb.png' width={'20px'} />
								</Box>
								<Typography display={{xs: 'none', md: 'block'}} variant='h6'>Mi Portafolio UBB</Typography>
							</Box>
						</Box>
						<Button variant='text' color='inherit' onClick={handleSignOut}>
							Cerrar sesión
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;