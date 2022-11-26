import { AppBar, Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Logo from './Logo';
import Link from 'next/link';
import { deletePortfolio } from '../api/user';

const Navbar = () => {
	const session = useSession();
	const [open, setOpen] = useState(false);
	const handleDrawerToggle = () => setOpen(!open);
	const navLinks = [
		{ text: 'Inicio', href: '/' },
		{ text: 'Mi portafolio', href: `/portafolio/${session.data?.user?.email}` },
	];

	// TODO: REFACTOR THIS COMPONENT
	const drawer = (
		<Box sx={{ textAlign: 'center' }}>
			<Box px={4} py={2}>
				<Logo />
			</Box>
			<Divider />
			<List>
				{navLinks.map(link => (
					<Link href={link.href} key={link.text}>
						<ListItemButton sx={{ textAlign: 'center' }} onClick={handleDrawerToggle}>
							<ListItemText primary={link.text} />
						</ListItemButton>
					</Link>
				))}
				<ListItemButton onClick={() => deletePortfolio()} sx={{ textAlign: 'center' }}>
					<ListItemText primary={'Borrar portafolio'} />
				</ListItemButton>
				<ListItemButton onClick={() => signOut({callbackUrl: '/iniciar-sesion'})} sx={{ textAlign: 'center' }}>
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
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '75%' },
				}}
			>
				{drawer}
			</Drawer>
			<AppBar position='static'>
				<Toolbar>
					<IconButton onClick={handleDrawerToggle} color='inherit'>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;