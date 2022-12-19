import { Button, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { User } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import ChangeCareerDialog from '../components/ChangeCareerDialog';
import ChangeNameDialog from '../components/ChangeNameDialog';
import Layout from '../components/Layout';
import { prisma } from '../utils/db';
import { getUserSessionWithContext } from '../utils/userSession';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getUserSessionWithContext(ctx);

	if (!session) return { notFound: true };

	const user = await prisma.user.findFirst({
		where: { email: session.user?.email as string },
	});

	return {
		props: { stringifiedUser: JSON.stringify(user) }
	};
};

interface ListItemProps {
  label: string;
  value: string;
  onClick?: () => void;
}


const ListItem = ({ label, value, onClick }: ListItemProps) => {
	return (
		<ListItemButton onClick={onClick}>
			<ListItemText>{label}</ListItemText>
			<ListItemText>{value}</ListItemText>
			<Button variant='outlined'>Editar</Button>
		</ListItemButton>
	);
};

interface PageProps {
  stringifiedUser: string;
}
const Perfil: NextPage<PageProps> = ({ stringifiedUser }) => {
	const user = JSON.parse(stringifiedUser) as User;
	const [openCareerDialog, setOpenCareerDialog] = useState(false);
	const [openNameDialog, setOpenNameDialog] = useState(false);

	return (
		<Layout>
			<ChangeCareerDialog career={user.career} open={openCareerDialog} onClose={() => setOpenCareerDialog(false)} />
			<ChangeNameDialog name={user.name} lastName={user.lastName} open={openNameDialog} onClose={() => setOpenNameDialog(false)} />
			<Typography variant='h5' my={2}>Actualiza tus datos personales</Typography>
			<List>
				<ListItem label='Nombre' value={`${user.name} ${user.lastName}`} onClick={() => setOpenNameDialog(true)} />
				<ListItem label='Contraseña' value='************' />
				<ListItem label='Carrera' value={user.career} onClick={() => setOpenCareerDialog(true)} />
			</List>
		</Layout>
	);
};

export default Perfil;