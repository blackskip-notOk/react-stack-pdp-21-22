import { SUCCESS_MESSAGE_DURATION } from '@/constants/systemConstants';
import { Alert, AlertTitle, Slide, Snackbar } from '@mui/material';
import { FC } from 'react';
import { SuccessMessageProps, Variant } from './types';

export const Message: FC<SuccessMessageProps> = ({
	open,
	message,
	duration,
	setIsOpen,
	variant = 'success',
}) => {
	const handleClose = () => {
		setIsOpen(false);
	};

	const currentDuration = duration ?? SUCCESS_MESSAGE_DURATION;
	const title = variant === Variant.success ? 'Успешно' : 'Неудачно';

	return (
		<Snackbar
			open={open}
			onClose={handleClose}
			autoHideDuration={currentDuration}
			TransitionComponent={(props) => <Slide {...props} direction='up' />}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
		>
			<Alert variant='filled' onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
				<AlertTitle>{title}</AlertTitle>
				{message}
			</Alert>
		</Snackbar>
	);
};
