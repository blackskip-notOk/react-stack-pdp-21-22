/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupStore } from '~/store/store';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import userEvents from '@testing-library/user-event';
import type { Options } from '@testing-library/user-event/dist/types/options';
import type { ExtendedRenderOptions } from './types';

export function renderWithProviders(
	ui: ReactElement,
	{
		preloadedState = {},
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
