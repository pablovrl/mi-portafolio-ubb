import { Box, Typography } from '@mui/material';
import { ExperienceType } from '@prisma/client';
import { getFormattedDate } from '../utils/getFormattedDate';
import { Card } from './Card';

interface ExperienceProps {
	company: string;
	position: string;
	startedAt: string;
	endedAt: string | null;
	description: string;
	type: ExperienceType;
}

const Experience = (props: ExperienceProps) => (
	<Card>
		<Box display={'flex'} flexDirection='column' gap={1}>
			<Typography>
				<Typography component={'span'} fontWeight={'bold'}>{props.company.toUpperCase() + ' '}</Typography>
				<Typography component={'span'} color='grey' >{props.type === 'UNIVERSITY' ? '(Universidad)' : '(Externo)'}</Typography>
			</Typography>
			<Typography variant='h5' fontWeight={'bold'}>{props.position}</Typography>
			{props.endedAt === null ?
				<Typography color='grey'>{`${getFormattedDate(props.startedAt)} - Actualidad`}</Typography> :
				<Typography color='grey'>{`${getFormattedDate(props.startedAt)} - ${getFormattedDate(props.endedAt)}`}</Typography>
			}
			<Typography color='grey' textAlign={'justify'}>{props.description}</Typography>
		</Box>
	</Card>
);

export default Experience;