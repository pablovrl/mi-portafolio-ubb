import axios from 'axios';

export const deleteFile = async (path: string) => {
	return await axios.delete('/api/file', { data: { path } });
};