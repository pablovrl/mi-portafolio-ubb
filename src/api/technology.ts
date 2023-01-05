import axios from 'axios';

interface TechnologyCreateInput {
	name: string;
	icon?: File;
}

export const createTechnology = async (data: TechnologyCreateInput) => {
	const formData = new FormData();
	formData.append('name', data.name);
	if (data.icon)
		formData.append('image', data.icon);

	return await axios.post('/api/technology', formData);
};

export const deleteTechnology = async (id: number) => {
	return await axios.delete(`/api/technology/${id}`);
};
