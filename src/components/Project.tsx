import { Box, Button, Typography } from '@mui/material';
import { Card } from './Card';

interface ProjectProps {
	technology: string;
	name: string;
	description: string;
	link: string;
	course: string;
}

const Project = (props: ProjectProps) => {
	return (
		<Card>
			<Box display={'flex'} flexDirection='column' gap={1} >
				<Typography fontWeight={'bold'}>{props.technology.toUpperCase()}</Typography>
				<Typography variant='h4' fontWeight={'bold'}>{props.name.toUpperCase()}</Typography>
				<Typography fontSize={'15px'} color='grey' fontWeight={'bold'}>{props.course.toUpperCase()}</Typography>
				<Typography color='grey' textAlign={'justify'}>{props.description}</Typography>
			</Box>
			<Button href={`${process.env.NEXT_PUBLIC_HOST}/api/file${props.link}`} variant='contained'>Descargar proyecto</Button>
		</Card>
	);
};

export default Project;