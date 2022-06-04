import { Dispatch, SetStateAction } from 'react';

export type Variants = 'error' | 'info' | 'success' | 'warning';

export enum Variant {
	error = 'error',
	info = 'info',
	success = 'success',
	warning = 'warning',
}

export interface SuccessMessageProps {
	open: boolean;
	duration?: number;
	message: string;
	variant?: Variants;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}
