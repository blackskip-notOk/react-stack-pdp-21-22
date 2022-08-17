import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import type { AppStore, RootState } from '~/store/store';

export type ClearObject = (obj: Record<string, string | null>) => Record<string, string> | null;

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}
