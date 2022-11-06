import { AppBar, Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const handleDrawerToggle = () => setOpen(!open);

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				Mi Portafolio UBB
			</Typography>
			<Divider />
			<List>
				<ListItemButton onClick={() => signOut()} sx={{ textAlign: 'center' }}>
					<ListItemText primary={'Cerrar sesión'} />
				</ListItemButton>
			</List>
		</Box>
	);

	return (
		<>
			<Drawer
				variant="temporary"
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
					<IconButton onClick={handleDrawerToggle} color="inherit">
						<MenuIcon />
					</IconButton>
					<Typography>Mi Portafolio UBB</Typography>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;