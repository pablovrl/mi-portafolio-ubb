import { Box, Grid, IconButton, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { deleteFile } from '../../api/file';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
	<Grid item xs={12} md={6}>
		<Box bgcolor={'#fcfcfb'} borderRadius='10px' p={{ xs: 1, md: 2 }} >
			<Grid display={'flex'} alignItems='center' container spacing={2} mb={2}>
				{children}
			</Grid>
		</Box>
	</Grid>
);

interface HeaderProps {
	index: number;
	title: string;
	handleDelete: () => void;
	file?: string;
}

export const Header = ({ index, title, handleDelete, file }: HeaderProps) => (
	<Grid item xs={12}>
		<Box display={'flex'} alignItems='center' justifyContent={'space-between'}>
			<Typography variant='h5' fontWeight={'bold'}>{title.toUpperCase()} {index}</Typography>
			<IconButton onClick={() => { handleDelete(); if(file) deleteFile(file); }}>
				<HighlightOffIcon color="error" />
			</IconButton>
		</Box>
	</Grid>
);