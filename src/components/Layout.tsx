import { Box } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Box>
			<Navbar />
			<Box overflow="hidden" pb={2} px={2}>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;