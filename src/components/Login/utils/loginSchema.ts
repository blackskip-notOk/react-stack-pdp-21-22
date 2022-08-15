import { useTranslation } from 'react-i18next';
import { object, boolean, string } from 'yup';

export const useLoginSchema = () => {
	const { t } = useTranslation();

	return object({
		email: string().defined().email(t('errors.invalidEmail')).required(t('errors.requiredEmail')),
		password: string().defined().required(t('errors.requiredPassword')),
		rememberMe: boolean().optional(),
		serverError: string(),
		captcha: string(),
	});
};
