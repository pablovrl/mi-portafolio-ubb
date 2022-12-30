import {
	Box,
	Tabs,
	Tab,
} from '@mui/material';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { requireAuth } from '../utils/requireAuth';
import { getUserSessionWithContext } from '../utils/userSession';
import { prisma } from '../utils/db';
import { Technology, User } from '@prisma/client';
import { useState } from 'react';
import UsersTable from '../components/UsersTable';
import Technologies from '../components/TechnologiesTable';

export const getServerSideProps = requireAuth(async (ctx) => {
	const session = await getUserSessionWithContext(ctx);
	if (!session || session.user?.role !== 'ADMIN') {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	const users = await prisma.user.findMany({
		where: {
			role: 'USER'
		}
	});

	const technologies = await prisma.technology.findMany();

	return {
		props: { users, technologies }
	};
});

interface Props {
	users: User[];
	technologies: Technology[];
}

const Admin: NextPage<Props> = ({ users, technologies }) => {
	interface TabPanelProps {
		children?: React.ReactNode;
		index: number;
		value: number;
	}

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						{children}
					</Box>
				)}
			</div>
		);
	}

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Layout>
			<Box sx={{ borderBottom: 1, borderColor: 'divider', mt: {xs: '30px', md: '10px'} }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Portafolios de alumnos" {...a11yProps(0)} />
					<Tab label="Tecnologías" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<UsersTable users={users} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Technologies technologies={technologies} />
			</TabPanel>
		</Layout>
	);
};

export default Admin;