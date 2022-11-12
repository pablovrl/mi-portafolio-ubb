import { AppBar, Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Logo from './Logo';
import Link from 'next/link';

const navLinks = [
	{ text: 'Inicio', href: '/' },
	{ text: 'Mi portafolio', href: '/' },
];

const editLinks = [
	{ text: 'Información Personal', href: 'edit/informacion-personal' },
	{ text: 'Tecnologías', href: '/edit/tecnologías' },
	{ text: 'Experiencia', href: '/edit/experiencia' },
	{ text: 'Proyectos', href: '/edit/proyectos' }
];

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const handleDrawerToggle = () => setOpen(!open);
	const [isEditOpen, setEditOpen] = useState(false);

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
				<ListItemButton sx={{ textAlign: 'center' }} onClick={() => setEditOpen(!isEditOpen)}>
					<ListItemText primary={'Editar datos'} />
				</ListItemButton>
				{isEditOpen && (
					editLinks.map(link => (
						<Link key={link.text} href={link.href}>
							<ListItemButton sx={{ textAlign: 'center' }} onClick={handleDrawerToggle}>
								<ListItemText primary={link.text} />
							</ListItemButton>
						</Link>
					))
				)}
				<ListItemButton onClick={() => signOut()} sx={{ textAlign: 'center' }}>
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