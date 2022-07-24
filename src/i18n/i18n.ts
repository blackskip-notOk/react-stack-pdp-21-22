import { en } from './en';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ru } from './ru';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: 'ru',
		interpolation: {
			escapeValue: false,
		},
		resources: {
			ru: {
				translation: ru,
			},
			en: {
				translation: en,
			},
		},
	});

export default i18n;

export type NativeName = 'English' | 'Русский';

export type Language = 'en' | 'ru';

export type Languages = {
	en: { nativeName: NativeName };
	ru: { nativeName: NativeName };
};

export const languages: Languages = {
	en: { nativeName: 'English' },
	ru: { nativeName: 'Русский' },
};
