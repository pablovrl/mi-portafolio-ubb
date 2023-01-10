import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useSession } from 'next-auth/react';
import DeletePortfolioDialog from './DeletePortfolioDialog';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createPdf } from '../utils/createPortfolioPdf';
import { UserPortfolio } from '../types';

const PortfolioSpeedDial = ({ user }: { user: UserPortfolio }) => {
	const session = useSession();
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleCopy = () => {
		toast.success('Enlace copiado en el portapapeles', {
			duration: 5000,
		});
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleCreatePdf = async () => {
		createPdf(user);
	};

	return (
		<>
			<DeletePortfolioDialog onClose={handleDialogClose} open={dialogOpen} />
			<SpeedDial
				ariaLabel='tools'
				sx={{ position: 'fixed', bottom: { xs: 20, md: 50 }, right: { xs: 20, md: 50 }, zIndex: '1' }}
				icon={<SpeedDialIcon />}
			>
				{session.data?.user?.email === user.email ? (
					<SpeedDialAction
						tooltipTitle='Eliminar'
						icon={<DeleteIcon />}
						onClick={handleDialogOpen}
					/>
				) : null}
				{session.data?.user?.email === user.email ? (
					<SpeedDialAction
						tooltipTitle='Editar'
						icon={<EditIcon />}
						onClick={() => router.replace('/portafolio/editar')}
					/>
				) : null}
				<SpeedDialAction
					tooltipTitle='Generar PDF'
					icon={<FileDownloadIcon />}
					onClick={handleCreatePdf}
				/>
				<CopyToClipboard onCopy={handleCopy} text={`${process.env.NEXTAUTH_URL}${router.asPath}`}>
					<SpeedDialAction
						tooltipTitle='Compartir'
						icon={<ShareIcon />}
					/>
				</CopyToClipboard>
			</SpeedDial>
		</>
	);
};

export default PortfolioSpeedDial;