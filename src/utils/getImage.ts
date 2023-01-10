export const getImage = (path: string) => {
	return `${process.env.NEXT_PUBLIC_HOST}/api/file${path}`;
};