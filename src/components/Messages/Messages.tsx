import { SESSION_STORAGE } from '@/constants/systemConstants';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Messages: FC = () => {
	const location = useLocation();

	useEffect(() => {
		sessionStorage.setItem(SESSION_STORAGE.LOCATION, location.pathname);
	});

	return <div>Messages</div>;
};
