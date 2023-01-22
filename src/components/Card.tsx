import { Box } from '@mui/material';

interface CardProps {
	children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => (
	<Box height={'100%'} bgcolor={'#FAFAFA'} p={{ xs: 2, md: 4 }} display='flex' flexDirection={'column'} gap={2} justifyContent='space-between'>
		{children}
	</Box>
);