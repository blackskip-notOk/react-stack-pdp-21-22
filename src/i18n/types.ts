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