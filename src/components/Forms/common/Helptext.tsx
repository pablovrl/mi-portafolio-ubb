import { Typography } from '@mui/material';

interface Props {
	children: React.ReactNode;
	error?: boolean;
}

const Helptext = ({ error, children }: Props) => {
	return (
		<Typography color={error ? 'error' : 'gray'} mb={1}>
			{children}
		</Typography>
	);
};

export default Helptext;