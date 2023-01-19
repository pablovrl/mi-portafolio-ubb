import { Box, Container } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
	noNavbar?: boolean;
}

const Layout = ({ children, noNavbar }: LayoutProps) => {
	return (
		<Box pt={noNavbar ? '20px' : {xs: '35px', md: '50px'}}>
			{noNavbar ? null : <Navbar />}
			<Container maxWidth='md'>
				<Box overflow="hidden" pb={8}>
					{children}
				</Box>
			</Container>
		</Box>
	);
};

export default Layout;