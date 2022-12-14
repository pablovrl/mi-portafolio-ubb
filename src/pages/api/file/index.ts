import { unlinkSync, existsSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		const { path } = req.body;
		const filePath =  `public/${path}`;
		// if the file exists, delete it
		if (existsSync(filePath)) unlinkSync(filePath);
		console.log(`Deleted file: ${filePath}`);
		return res.status(200).json({ message: 'File deleted' });
	}

}
