import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { requireAuth } from '../utils/requireAuth';
import Layout from '../components/Layout';

export const getServerSideProps = requireAuth(async () => {
	return { props: {} };
});

const Home: NextPage = () => {
	const { status } = useSession();
	return (
		<Layout>
			<h1>{status}</h1>
		</Layout>
	);
};

export default Home;
