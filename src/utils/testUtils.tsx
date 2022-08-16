import { setupStore } from '~/store/store';
import type { RootState, AppStore } from '~/store/store';
import type { PreloadedState } from '@reduxjs/toolkit';
import { RenderOptions } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import '~/i18n/i18n';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {},
) {
	function Wrapper({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element {
		return (
			<HashRouter>
				<Provider store={store}>{children}</Provider>
			</HashRouter>
		);
	}
	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
