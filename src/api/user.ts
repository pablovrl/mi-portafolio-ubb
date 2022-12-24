import { Project, User } from '@prisma/client';
import axios from 'axios';
import { CreateUser, CreatePortfolio } from '../types';

export const register = async (user: CreateUser) => {
	return await axios.post('/api/auth/register', user);
};

export async function getCurrentUser(): Promise<{ data: User }> {
	return await axios.get('/api/user/me');
}

export const changeImage = async (image: File) => {
	const formData = new FormData();
	formData.append('image', image);
	return await axios.post('/api/user/change-image', formData);
};

export const createPortfolio = async (data: CreatePortfolio) => {
	const formData = new FormData();
	formData.append('about', data.about || '');
	formData.append('projects', JSON.stringify(data.projects));
	formData.append('technologies', JSON.stringify(data.technologies));
	formData.append('experience', JSON.stringify(data.experiences));
	formData.append('contact', JSON.stringify(data.contacts));
	data.projects.forEach((project: Project) => {
		formData.append('project', project.file);
	});
	return await axios.post('/api/user/portfolio', formData);
};

export const deletePortfolio = async () => {
	return await axios.delete('/api/user/portfolio');
};

export const updateUser = async (data: Partial<User>) => {
	return await axios.put('/api/user/me', data);
};

export const changeUserPassword = async (data: { password: string, newPassword: string }) => {
	return await axios.post('/api/user/change-password', data);
};

export const resetUserPassword = async (data: { email: string }) => {
	return await axios.post('/api/user/forgot-password', data);
};