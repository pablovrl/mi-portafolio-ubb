import type { NextPage } from 'next';
import { requireAuth } from '../utils/requireAuth';
import Layout from '../components/Layout';
import { prisma } from '../utils/db';
import { Project, User } from '@prisma/client';
import { Box, Button, Grid, Link as MUILink, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';

export const getServerSideProps = requireAuth(async () => {
	const projects = await prisma.project.findMany({ include: { user: true } });
	return { props: { projects } };
});

interface ProjectWithUser extends Project {
  user: User;
}

interface Props {
  projects: ProjectWithUser[];
}

const ProjectCard = ({ project }: { project: ProjectWithUser }) => (
	<Box bgcolor={'#FAFAFA'} p={{ xs: 2, md: 4 }} display='flex' flexDirection={'column'} gap={1}>
		<Typography fontWeight={'bold'}>{project.technology.toUpperCase()}</Typography>
		<Typography variant='h4' fontWeight={'bold'}>{project.name.toUpperCase()}</Typography>
		<Typography fontSize={'15px'} color='grey' fontWeight={'bold'}>{project.course.toUpperCase()}</Typography>
		<Typography color='grey' textAlign={'justify'}>{project.description}</Typography>
		<Button href={`${process.env.NEXT_PUBLIC_DEPLOY}/api/file${project.file}`} variant='contained'>Descargar proyecto</Button>
		<Typography color='grey' fontWeight={'bold'}>Desarrollado por {' '}
			<Link href={`/portafolio/${project.user.email}`}>
				<MUILink sx={{ cursor: 'pointer' }}>
					{project.user.name} {project.user.lastName}
				</MUILink>
			</Link>
		</Typography>
	</Box>
);

const Proyectos: NextPage<Props> = ({ projects }) => {
	const [search, setSearch] = useState('');
	const filteredProjects = projects.filter((project) => {
		const name = project.name.toLowerCase();
		const technology = project.technology.toLowerCase();
		const course = project.course.toLowerCase();
		const searchLower = search.toLowerCase();
		return name.includes(searchLower) || technology.includes(searchLower) || course.includes(searchLower);
	});

	return (
		<Layout>
			<Box my={2}>
				<TextField
					label='Busca proyectos de tus compañeros por nombre, tecnología o curso'
					value={search}
					fullWidth
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Box>
			<Grid container spacing={2} my={2}>
				{filteredProjects.map((project) => (
					<Grid key={project.id} item xs={12} md={6}>
						<ProjectCard project={project} />
					</Grid>
				))}
			</Grid>
		</Layout>
	);
};

export default Proyectos;
