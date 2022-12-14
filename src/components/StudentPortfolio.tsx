import { Box, Grid, Typography, Link as MUILink } from '@mui/material';
import { UserPortfolio } from '../types';
import Project from './Project';
import Experience from './Experience';
import ProfileImage from './ProfileImage';
import Layout from './Layout';
import { useSession } from 'next-auth/react';
import { getImage } from '../utils/getImage';
import PortfolioSpeedDial from './PortfolioSpeedDial';

const Title = ({ children }: { children: React.ReactNode }) => (
	<Typography fontWeight={'bold'} variant='h5' fontFamily={'monospace'}>{children}</Typography>
);

const StudentPortfolio = ({ user }: { user: UserPortfolio }) => {
	const session = useSession();
	return (
		<Layout noNavbar={session.status === 'unauthenticated' || session.status === 'loading' ? true : false}>
			<PortfolioSpeedDial user={user} />
			<Box mt={4}>
				<Box display={'flex'} justifyContent='space-between' flexDirection='row' gap={3} alignItems='center'>
					<Box display='flex' flexDirection={'column'} gap={2}>
						<Typography fontWeight={'bold'} variant='h3' mb={1}>{user.name} {user.lastName}</Typography>
						<Box>
							<Typography variant='h5'>
								{user.career === 'IECI' ? 'Ingeniería de Ejecución en Computación e Informática' : 'Ingeniería Civil Informática'}
							</Typography>
							<Typography mt={1} variant='h6' color='gray'>
								Universidad del Bío-Bío
							</Typography>
						</Box>
						<Box display={{ xs: 'none', md: 'flex' }} gap={2} mb={2} >
							{user.contacts.map(contact => (
								<Box key={contact.id}>
									<MUILink href={contact.url} fontSize={'20px'} target='_blank'>
										{contact.name}
									</MUILink>
								</Box>
							))}
						</Box>
					</Box>
					<Box display={{ xs: 'none', md: 'flex' }}>
						<ProfileImage src={user.image || ''} size='180px' />
					</Box>
				</Box>
				<Box display={'flex'} flexDirection='column' gap={2} mt={{ xs: 2, md: 0 }}>
					<Box display={'flex'} flexDirection='column' gap={2}>
						<Title>SOBRE MÍ</Title>
						<Typography textAlign={'justify'}>
							{user.about}
						</Typography>
					</Box>
					<Box display={{ xs: 'flex', md: 'none' }} gap={2} alignItems='center' flexDirection={'row'}>
						<ProfileImage src={user.image || ''} size='120px' />
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
										overflow={'hidden'}
									>
										{technology.technology.icon.includes('uploads/images') ? (
											<img
												src={getImage(technology.technology.icon)}
												alt={technology.technology.name}
												style={{ width: '50px', height: '50px' }}
											/>
										) : (
											<i style={{ fontSize: '50px' }} className={technology.technology.icon} />
										)}
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
											endedAt={exp.endedAt || null}
											description={exp.description}
											type={exp.type}
										/>
									</Grid>
								))}
							</Grid>
						</Box>
					)}
				</Box>
			</Box>
		</Layout >
	);
};

export default StudentPortfolio;