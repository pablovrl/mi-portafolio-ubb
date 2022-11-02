import axios from 'axios';
import { CreateUser } from '../types';

export const register = async (user: CreateUser) => {
	return axios.post('/api/auth/register', user);
};