import { Contact, Experience, Project, Technology, User } from '@prisma/client';

export interface CreateUser {
	[name: string]: string,
	lastName: string,
	career: string,
	email: string,
	password: string
}

export interface UserPortfolio extends User {
	technologies: {technology: Technology}[];
	experiences: Experience[];
	contacts: Contact[];
	projects: Project[];
}