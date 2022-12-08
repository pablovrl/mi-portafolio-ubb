import axios from 'axios';
import { CreateUser } from '../types';

export const register = async (user: CreateUser) => {
	return await axios.post('/api/auth/register', user);
};

export const changeImage = async (image: File) => {
	const formData = new FormData();
	formData.append('image', image);
	return await axios.post('/api/user/change-image', formData);
};	


export const createPortfolio = async (data: any) => {
	const formData = new FormData();
	formData.append('about', data.about || '');
	formData.append('projects', JSON.stringify(data.projects));
	formData.append('technologies', JSON.stringify(data.technologies));
	formData.append('experience', JSON.stringify(data.experiences));
	formData.append('contact', JSON.stringify(data.contacts));
	data.projects.forEach((project: any) => {
		formData.append('project', project.file);
	});
	return await axios.post('/api/user/portfolio', formData);
};

export const deletePortfolio = async () => {
	return await axios.delete('/api/user/portfolio');
};