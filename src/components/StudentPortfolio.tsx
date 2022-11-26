import { Box, Button, Grid, Typography } from '@mui/material';
import { UserPortfolio } from '../types';
import Image from 'next/image';
import { getFormattedDate } from '../utils/getFormattedDate';
import Link from 'next/link';

interface Props {
	user: UserPortfolio;
}

const Title = ({ text }: { text: string }) => (
	<Box width={'fit-content'} mb={2} >
		<Typography borderBottom={'3px solid black'} variant='h5' my={1} >{text}</Typography>
	</Box>
);

const StudentPortfolio = ({ user }: Props) => {
	return (
		<>
			<Typography fontWeight={'bold'} variant='h4' mb={1}>{user.name} {user.lastName}</Typography>
			<Typography>
				{user.career === 'IECI' ? 'Ingeniería de Ejecución en Computación e Informática' : 'Ingeniería Civil Informática'}
			</Typography>
			<Box display="flex" gap={1}>
				{user.contacts.map((contact) => (
					<Box key={contact.id} mb={2}>
						<Link href={contact.url}>
							<a target='_blank' rel='noreferrer'> {contact.name} </a>
						</Link>
					</Box>
				))}
			</Box>
			<Box display={'flex'} justifyContent='center'>
				<Box position='relative' height='200px' width='200px' display={'flex'}>
					<Image src={user.image || ''} layout='fill' style={{ borderRadius: '50%' }} objectFit='cover' />
				</Box>
			</Box>
			<Title text='Sobre mí' />
			<Typography textAlign={'justify'} variant='body1'>{user.about}</Typography>
			<Title text='Tecnologías' />
			<Grid container spacing={2}>
				{user.technologies.map((tech) => (
					<Grid item xs={4} key={tech.technology.id}>
						<Box flexDirection={'column'} border={'2px solid #eeeee4'} borderRadius="15px" p={1} display="flex" alignItems={'center'} gap={1}>
							<i className={tech.technology.icon} style={{ fontSize: '40px' }} />
							<Typography variant='body1'>{tech.technology.name}</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
			<Title text='Experiencia' />
			<Box>
				{user.experiences.map((exp) => (
					<Box key={exp.id} mb={2}>
						<Typography variant='h6'>{exp.company}</Typography>
						<Typography variant='body1'>{getFormattedDate(exp.startedAt)} - {getFormattedDate(exp.endedAt)}</Typography>
						<Box ml={3} mt={1}>
							<Typography fontWeight={'bold'} variant='body1'>{exp.position}</Typography>
							<Typography textAlign='justify' variant='body1'>{exp.description}</Typography>
						</Box>
					</Box>
				))}
			</Box>
			<Title text="Proyectos" />
			<Box>
				{user.projects.map((project) => (
					<Box key={project.id} mb={2}>
						<Typography variant='h6'>{project.name}</Typography>
						<Box ml={3} mt={1} display="flex" flexDirection={'column'} gap={1}>
							<Typography textAlign='justify' variant='body1'>{project.description}</Typography>
							{project.deploy && (
								<Link href={project.deploy} target="_blank" passHref>
									<Button fullWidth variant="contained" color='secondary'>Ver proyecto</Button>
								</Link>
							)}
							<Button variant='contained' fullWidth href={project.file}>
								Descargar código
							</Button>
						</Box>
					</Box>
				))}
			</Box>
		</>
	);
};

export default StudentPortfolio;