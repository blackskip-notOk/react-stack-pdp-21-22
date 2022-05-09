import { SESSION_STORAGE } from '@/constants/systemConstants';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSetSessionLocation = (): void => {
	const location = useLocation();

	useEffect(() => {
		sessionStorage.setItem(SESSION_STORAGE.LOCATION, location.pathname);
	});
};
