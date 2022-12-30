export const getImage = (path: string) => {
	return `${process.env.NEXT_PUBLIC_DEPLOY}/api/file${path}`;
};