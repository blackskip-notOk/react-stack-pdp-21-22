import { useSetSessionLocation } from '@/hooks/useSetSessionLocation';
import { FC } from 'react';

export const Messages: FC = () => {
	useSetSessionLocation();

	return <div>Messages</div>;
};
