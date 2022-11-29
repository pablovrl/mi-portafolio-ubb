import { Typography } from '@mui/material';

interface Props {
  text: string;
	error?: boolean;
}
const Title = ({ text, error }: Props) => {
	return (
		<Typography color={error ? 'error' : ''} mt={2} mb={1} variant='h5' fontWeight={'bold'} >{text}</Typography>
	);
};

export default Title;