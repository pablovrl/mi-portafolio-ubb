import { Typography } from '@mui/material';

interface Props {
  text: string;
}
const Title = ({ text }: Props) => {
	return (
		<Typography mt={2} mb={1} variant='h5' fontWeight={'bold'} >{text}</Typography>
	);
};

export default Title;