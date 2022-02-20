import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface CustomInputProps {
	name: string,
	register: UseFormRegister<any>,
	type: HTMLInputTypeAttribute,
	placeholder?: string,
};
