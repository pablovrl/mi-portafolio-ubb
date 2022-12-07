import { Box, Typography } from '@mui/material';
import { getFormattedDate } from '../utils/getFormattedDate';

interface ExperienceProps {
	company: string;
	position: string;
	startedAt: Date;
	endedAt: Date;
	description: string;
}

const Experience = (props: ExperienceProps) => (
	<Box bgcolor={'#FAFAFA'} p={{ xs: 2, md: 4}} display='flex' flexDirection={'column'} gap={1}>
		<Typography fontWeight={'bold'}>{props.company.toUpperCase()}</Typography>
		<Typography variant='h5' fontWeight={'bold'}>{props.position}</Typography>
		<Typography color='grey'>{`${getFormattedDate(props.startedAt)} - ${getFormattedDate(props.endedAt)}`}</Typography>
		<Typography color='grey' textAlign={'justify'}>{props.description}</Typography>
	</Box>
);

export default Experience;