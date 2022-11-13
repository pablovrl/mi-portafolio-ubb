import { Box } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Box overflow="hidden">
			<Navbar />
			{children}
		</Box>
	);
};

export default Layout;