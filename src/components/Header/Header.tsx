import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { FC, type SyntheticEvent, useReducer, type MouseEvent, useEffect } from 'react';
import logo from '@/image/React-icon.svg.png';
import styles from './Header.module.less';
import { MODAL_SHOW_DURATION } from '@/constants/systemConstants';
import { ReasonModalClose } from '@/commonTypes';
import { useNavigate } from 'react-router-dom';
import { NAVLINKS } from '@/constants/routerConstants';
import { LoadingButton } from '@mui/lab';
import { useLogoutMutation } from '@/store/slices/apiSlice';

export const Header: FC = () => {
	const navigate = useNavigate();

	const [logout, { isLoading: loadingLogout, isSuccess: successLogout }] = useLogoutMutation();

	const [openModal, setOpenModal] = useReducer((openModal: boolean) => !openModal, false);

	useEffect(() => {
		if (successLogout) {
			navigate(NAVLINKS.LOGIN);
		}
	}, [successLogout]);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		console.info('Breadcrumb click');
	};

	const handleCloseModal = (event: SyntheticEvent, reason: ReasonModalClose): void => {
		if (reason === 'escapeKeyDown') {
			setOpenModal();
		}
	};

	const handleLogout = async () => {
		await logout(null);
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
					<LoadingButton
						color='success'
						variant='contained'
						size='large'
						onClick={handleLogout}
						disabled={loadingLogout}
						loading={loadingLogout}
					>
						{'Ok'}
					</LoadingButton>
					<Button color='warning' variant='contained' size='large' onClick={() => setOpenModal()}>
						{'Отмена'}
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
};
