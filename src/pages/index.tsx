import type { NextPage } from 'next';
import { requireAuth } from '../utils/requireAuth';
import { Box, Typography, Container, Button, Link as MUILink } from '@mui/material';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const getServerSideProps = requireAuth(async () => {
	return {
		props: {}
	};
});

const Home: NextPage = () => {
	const session = useSession();
	return (
		<Box width='100vw' height={'100vh'} display='fl/ubb-color.pngex' justifyContent={'center'} alignItems={{ md: 'center' }} >
			<Navbar />
			<Container>
				<Box mt={{ xs: '70px' }} display={'flex'} alignItems='center' flexDirection={{ xs: 'column', md: 'row' }}>
					<Box>
						<Typography variant='h2'>Mi Portafolio UBB</Typography>
						<Typography variant='h6' color='grey'>
							Crea tu portafolio, descríbete, comparte tu experiencia laboral y sube tus proyectos, empieza a construir tu marca personal!
						</Typography>
						<Box display={'flex'} gap={1} my={2} flexDirection='column' width={'fit-content'}>
							<Button LinkComponent={'a'} href={`/portafolio/${session.data?.user?.email}`} size='large' variant='contained'>Crear portafolio</Button>
							<Link href={'/portafolios'}>
								<MUILink sx={{cursor: 'pointer'}}>
									También puedes buscar portafolios de tus compañeros
								</MUILink>
							</Link>
						</Box>
					</Box>
					<Box display={{ xs: 'none', md: 'block' }}>
						<img src="ubb-color.png" alt="Logo universidad del bío-bío" width={'500px'} />
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Home;
