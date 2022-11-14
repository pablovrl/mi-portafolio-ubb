import { Typography } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const Helptext = ({ children }: Props) => {
	return (
		<Typography mb={1} color='gray'>
			{children}
		</Typography>
	);
};

export default Helptext;