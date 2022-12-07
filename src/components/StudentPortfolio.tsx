import { Box, Grid, Typography, Link as MUILink } from '@mui/material';
import { UserPortfolio } from '../types';
import Project from './Project';
import React from 'react';
import Experience from './Experience';
import ProfileImage from './ProfileImage';
import Layout from './Layout';
import { useSession } from 'next-auth/react';

const Title = ({children}: {children: React.ReactNode}) => (
	<Typography fontWeight={'bold'} variant='h5' fontFamily={'monospace'}>{children}</Typography>
);

const StudentPortfolio = ({ user }: {user: UserPortfolio}) => {
	const session = useSession();
	return (
		<Layout noNavbar={session.status === 'unauthenticated' ? true : false}>
			<Box>
				<Box display={'flex'} justifyContent='space-between' flexDirection='row' gap={3} alignItems='center'>
					<Box display='flex' flexDirection={'column'} gap={2}>
						<Typography fontWeight={'bold'} variant='h3' mb={1}>{user.name} {user.lastName}</Typography>
						<Typography variant='h5'>
							{user.career === 'IECI' ? 'Ingeniería de Ejecución en Computación e Informática' : 'Ingeniería Civil Informática'}
						</Typography>
						<Box display={{xs: 'none', md: 'flex'}} gap={2} >
							{user.contacts.map(contact => (
								<Box key={contact.id}>
									<MUILink href={contact.url} fontSize={'20px'} target='_blank'>
										{contact.name}
									</MUILink>
								</Box>
							))}
						</Box>
					</Box>
					<Box display={{xs: 'none', md: 'flex'}}>
						<ProfileImage src={user.image!} size='180px' />
					</Box>
				</Box>
				<Box display={'flex'} flexDirection='column' gap={2} mt={{xs: 2, md: 0}}>
					<Box display={'flex'} flexDirection='column' gap={2}>
						<Title>SOBRE MÍ</Title>
						<Typography textAlign={'justify'}>
							{user.about}
						</Typography>
					</Box>
					<Box display={{xs: 'flex', md: 'none'}} gap={2} alignItems='center' flexDirection={'row'}>
						<ProfileImage src={user.image!} size='120px' />
						{user.contacts.map(contact => (
							<Box key={contact.id}>
								<MUILink href={contact.url} fontSize={'20px'} target='_blank'>
									{contact.name}
								</MUILink>
							</Box>
						))}
					</Box>
					<Box display='flex' flexDirection={'column'} gap={2}>
						<Title>TECNOLOGÍAS</Title>
						<Grid container spacing={2} >
							{user.technologies.map(technology => (
								<Grid 
									item
									xs={6}
									md={2}
									key={technology.technology.id} 
								>
									<Box
										bgcolor={'#FAFAFA'} 
										display='flex'
										flexDirection={'column'}
										gap={1}
										p={4}
										alignItems='center'
									>
										<i style={{fontSize: '40px'}} className={technology.technology.icon} />
										<Typography>{technology.technology.name.toUpperCase()}</Typography>
									</Box>
								</Grid>
							))}
						</Grid>
					</Box>
					{user.projects.length > 0 && (
						<Box display={'flex'} flexDirection='column' gap={2}>
							<Title>PROYECTOS</Title>
							<Grid container spacing={2}>
								{user.projects.map(project => (
									<Grid key={project.id} item xs={12} md={6}> 
										<Project 
											name={project.name} 
											description={project.description} 
											link={project.file}
											technology={project.technology}
											course={project.course}
										/>
									</Grid>
								))}
							</Grid>
						</Box>
					)}
					{user.experiences.length > 0 && (
						<Box display={'flex'} flexDirection='column' gap={2}>
							<Title>EXPERIENCIA</Title>
							<Grid container spacing={2}>
								{user.experiences.map(exp => (
									<Grid item key={exp.id} xs={12} md={6}>
										<Experience
											company={exp.company}
											position={exp.position}
											startedAt={exp.startedAt}
											endedAt={exp.endedAt}
											description={exp.description}
										/>
									</Grid>
								))}
							</Grid>
						</Box>
					)}
				</Box>
			</Box>
		</Layout>
	);
};

export default StudentPortfolio;