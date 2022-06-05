import { Dispatch, SetStateAction } from 'react';

export interface HomeProps {
	showGreeting: boolean;
	setShowGreeting: Dispatch<SetStateAction<boolean>>;
}
