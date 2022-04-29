import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { FC, type SyntheticEvent, useReducer, type MouseEvent } from 'react';
import { logoutFx } from '@/models/login';
import logo from '@/image/React-icon.svg.png';
import styles from './Header.module.less';
import { MODAL_SHOW_DURATION } from '@/constants/systemConstants';
import { ReasonModalClose } from '@/commonTypes';

export const Header: FC = () => {
	const [openModal, setOpenModal] = useReducer((openModal) => !openModal, false);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		console.info('Breadcrumb click');
	};

	const handleCloseModal = (event: SyntheticEvent, reason: ReasonModalClose): void => {
		if (reason === 'escapeKeyDown') {
			setOpenModal();
		}
	};

	const handleLogout = () => {
		logoutFx();
	};

	return (
		<div className={styles.headerContainer}>
			<div role='presentation' onClick={handleClick}>
				<img src={logo} alt='react-logo' className={styles.logo} />
			</div>
			<div className={styles.logoutContainer}>
				<Button
					color='secondary'
					variant='contained'
					size='large'
					endIcon={<LogoutIcon />}
					onClick={() => setOpenModal()}
				>
					Логаут
				</Button>
			</div>
			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				transitionDuration={MODAL_SHOW_DURATION}
				aria-labelledby='logout'
				aria-describedby='logout'
				disableEscapeKeyDown={false}
			>
				<DialogTitle id='logout' className={styles.modal}>
					<Typography align='center' className={styles.modalTitle}>
						{'Выйти из аккаунта?'}
					</Typography>
				</DialogTitle>
				<DialogContent dividers className={`${styles.modal} ${styles.buttonContainer}`}>
					<Button color='success' variant='contained' size='large' onClick={handleLogout}>
						{'Ok'}
					</Button>
					<Button color='warning' variant='contained' size='large' onClick={() => setOpenModal()}>
						{'Отмена'}
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
};
