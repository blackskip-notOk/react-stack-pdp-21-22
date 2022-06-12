import { object, string } from 'yup';

export const profileStatusSchema = object({
	status: string().defined().optional().max(300, 'Maximum 300 symbols'),
});
