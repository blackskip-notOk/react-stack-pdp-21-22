import { CONNECTION_STATUS, SUCCESS_MESSAGE_DURATION } from '~/constants/systemConstants';
import { startListeningMessages, stopListeningMessages } from '~/store/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { Alert, AlertTitle, Slide, Snackbar } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { AddMessageForm } from '../Messages/AddMessageForm';
import { Messages } from '../Messages/Messages';

export const Chat: FC = () => {
	const dispatch = useAppDispatch();
	const connectionStatus = useAppSelector((state) => state.chat.status);

	const [isShowStatusInfo, setIsShowStatusInfo] = useState(false);

	useEffect(() => {
		if (connectionStatus === CONNECTION_STATUS.ready) {
			setIsShowStatusInfo(true);
		}
	}, [connectionStatus]);

	useEffect(() => {
		dispatch(startListeningMessages());

		return () => {
			dispatch(stopListeningMessages());
		};
	}, [dispatch]);

	const handleClose = () => {
		setIsShowStatusInfo(false);
	};

	return (
		<>
			<Snackbar
				open={isShowStatusInfo}
				onClose={handleClose}
				autoHideDuration={SUCCESS_MESSAGE_DURATION}
				TransitionComponent={(props) => <Slide {...props} direction='down' />}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert variant='filled' onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					<AlertTitle>Успешно</AlertTitle>
					соединение по WebSocet открыто
				</Alert>
			</Snackbar>
			<div>
				<Messages />
				<AddMessageForm />
			</div>
		</>
	);
};
