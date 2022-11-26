import { Contact, Experience, Project, Technology, User } from "@prisma/client"

export interface CreateUser {
	[name: string]: string,
	lastName: string,
	career: string,
	email: string,
	password: string
}

export interface UserPortfolio extends User {
	technologies: {technology: Technology}[];
	experience: Experience[];
	contact: Contact[];
	projects: Project[];
}