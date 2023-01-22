import type { NextPage } from 'next';
import { requireAuth } from '../utils/requireAuth';
import Layout from '../components/Layout';
import { prisma } from '../utils/db';
import { Project, User } from '@prisma/client';
import { Alert, AlertTitle, Box, Button, Grid, Link as MUILink, Pagination, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { Card } from '../components/Card';

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
	<Card>
		<Box display={'flex'} flexDirection='column' gap={1}>
			<Typography fontWeight={'bold'}>{project.technology.toUpperCase()}</Typography>
			<Typography variant='h4' fontWeight={'bold'}>{project.name.toUpperCase()}</Typography>
			<Typography fontSize={'15px'} color='grey' fontWeight={'bold'}>{project.course.toUpperCase()}</Typography>
			<Typography color='grey' textAlign={'justify'}>{project.description}</Typography>
		</Box>
		<Box display={'flex'} flexDirection='column' gap={1}>
			<Button href={`${process.env.NEXT_PUBLIC_HOST}/api/file${project.file}`} variant='contained'>Descargar proyecto</Button>
			<Typography color='grey' fontWeight={'bold'}>Desarrollado por {' '}
				<Link href={`/portafolio/${project.user.email}`}>
					<MUILink sx={{ cursor: 'pointer' }}>
						{project.user.name} {project.user.lastName}
					</MUILink>
				</Link>
			</Typography>
		</Box>
	</Card>
);

const Proyectos: NextPage<Props> = ({ projects }) => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);

	const ROWS = 4;

	const filteredProjects = projects.filter((project) => {
		const name = project.name.toLowerCase();
		const technology = project.technology.toLowerCase();
		const course = project.course.toLowerCase();
		const searchLower = search.toLowerCase();
		return name.includes(searchLower) || technology.includes(searchLower) || course.includes(searchLower);
	});

	const totalPages = Math.ceil(filteredProjects.length / ROWS);
	const currentPageData = filteredProjects.slice((page - 1) * ROWS, page * ROWS);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Layout>
			<Box my={2}>
				<TextField
					label='Busca proyectos de tus compañeros por nombre, tecnología o curso'
					value={search}
					fullWidth
					onChange={(e) => { setSearch(e.target.value); setPage(1); }}
				/>
			</Box>
			{filteredProjects.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>No se encontraron proyectos.</AlertTitle>
				</Alert>
			)}
			<Grid container spacing={2} my={2}>
				{currentPageData.map((project) => (
					<Grid key={project.id} item xs={12} md={6}>
						<ProjectCard project={project} />
					</Grid>
				))}
			</Grid>
			<Box display='flex' my={2} alignItems='center' justifyContent={'center'} flexDirection='column' gap={2}>
				<Pagination page={page} onChange={handlePageChange} count={totalPages} />
			</Box>
		</Layout>
	);
};

export default Proyectos;
