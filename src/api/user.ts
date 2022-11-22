import axios from 'axios';
import { CreateUser } from '../types';

export const register = async (user: CreateUser) => {
	return axios.post('/api/auth/register', user);
};

export const changeImage = async (image: File) => {
	const formData = new FormData();
	formData.append('image', image);
	return axios.post('/api/user/change-image', formData);
};	


export const createPortfolio = async (data: any) => {
	return axios.post('/api/user/portfolio', data);
}