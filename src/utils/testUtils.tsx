/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState, setupStore } from '~/store/store';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import '~/i18n/i18n';
import userEvents from '@testing-library/user-event';
import type { Options } from '@testing-library/user-event/dist/types/options';
import type { ExtendedRenderOptions } from './types';
import type { AnyAction, EnhancedStore, Middleware, Reducer } from '@reduxjs/toolkit';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

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

export function renderWithContext(element: ReactElement, state?: RootState) {
	const store = setupStore(state);

	const utils = render(
		<Provider store={store}>
			<HashRouter>{element}</HashRouter>
		</Provider>,
	);

	return { store, ...utils };
}

export function setupApiStore<
	A extends {
		reducer: Reducer<any, any>;
		reducerPath: string;
		middleware: Middleware;
		util: { resetApiState(): any };
	},
	R extends Record<string, Reducer<any, any>> = Record<never, never>,
>(api: A, extraReducers?: R): { api: any; store: EnhancedStore } {
	/*
	 * Modified version of RTK Query's helper function:
	 * https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/query/tests/helpers.tsx
	 */
	const getStore = (): EnhancedStore =>
		configureStore({
			reducer: combineReducers({
				[api.reducerPath]: api.reducer,
				...extraReducers,
			}),
			middleware: (gdm) =>
				gdm({ serializableCheck: false, immutableCheck: false }).concat(api.middleware),
		});

	type StoreType = EnhancedStore<
		{
			api: ReturnType<A['reducer']>;
		} & {
			[K in keyof R]: ReturnType<R[K]>;
		},
		AnyAction,
		ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M> ? M : never
	>;

	const initialStore = getStore() as StoreType;
	const refObj = {
		api,
		store: initialStore,
	};
	const store = getStore() as StoreType;
	refObj.store = store;

	return refObj;
}
