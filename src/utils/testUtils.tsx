import { setupStore } from '~/store/store';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import '~/i18n/i18n';
import userEvents from '@testing-library/user-event';
import type { Options } from '@testing-library/user-event/dist/types/options';
import type { ExtendedRenderOptions } from './types';

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

// function to setup user-events with wrapped in providers react element
export function setup(
	jsx: ReactElement,
	renderOptions: ExtendedRenderOptions = {},
	setupOptions?: Options,
) {
	return {
		user: userEvents.setup(setupOptions),
		...renderWithProviders(jsx, renderOptions),
	};
}
