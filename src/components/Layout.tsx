import { Box } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
	noNavbar?: boolean;
}

const Layout = ({ children, noNavbar }: LayoutProps) => {
	return (
		<Box pt={noNavbar ? '20px' : ''} >
			{noNavbar ? null : <Navbar />}
			<Box overflow="hidden" pb={2} px={2}>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;