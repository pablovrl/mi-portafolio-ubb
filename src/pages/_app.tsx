import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={pageProps.session}>
				<Head>
					<title>Mi portafolio UBB</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
				</Head>
				<Component {...pageProps} />
			</SessionProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
