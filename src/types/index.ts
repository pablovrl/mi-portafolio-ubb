import { Contact, Experience, Project, Technology, User } from '@prisma/client';

export interface CreateUser {
	[name: string]: string,
	lastName: string,
	career: string,
	email: string,
	password: string
}

export interface UserPortfolio extends User {
	technologies: { technology: Technology }[];
	experiences: Experience[];
	contacts: Contact[];
	projects: Project[];
}

export type CreatePortfolio = User & {
	contacts: Contact[];
	projects: Project[];
	technologies: Technology[];
	experiences: {
		id: number;
		userId: number;
		company: string;
		position: string;
		description: string;
		startedAt: string;
		endedAt: string;
	}[]
}

export type ChangeUserPassword = {
	password?: string,
	newPassword: string,
	token?: string
}