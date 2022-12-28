import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth/next';
import { prisma } from '../../../utils/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			// @ts-ignore
			async authorize(credentials) {
				const { email, password } = credentials as { email: string, password: string };
				const user = await prisma.user.findFirst({
					where: { email },
				});

				if (!user) {
					return null;
				}

				const isValid = await bcrypt.compare(password, user.password || '');
				if (!isValid) {
					return null;
				}

				return user;
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				session.user.role = token.role;
			}
			return session;
		},
	},
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/iniciar-sesion',
	},
	jwt: {
		secret: '123',
	},
	secret: '123'
};

export default NextAuth(authOptions);
