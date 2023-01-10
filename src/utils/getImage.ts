export const getImage = (path: string) => {
	return `${process.env.NEXTAUTH_URL}/api/file${path}`;
};