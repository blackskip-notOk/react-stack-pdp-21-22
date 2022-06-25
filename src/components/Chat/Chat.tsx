import { startListeningMessages, stopListeningMessages } from '@/features/chat/chatSlice';
import { useAppDispatch } from '@/hooks/storeHooks';
import { FC, useEffect } from 'react';
import { AddMessageForm } from '../Messages/AddMessageForm';
import { Messages } from '../Messages/Messages';

export const Chat: FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(startListeningMessages());

		return () => {
			dispatch(stopListeningMessages());
		};
	}, [dispatch]);

	return (
		<div>
			<Messages />
			<AddMessageForm />
		</div>
	);
};
