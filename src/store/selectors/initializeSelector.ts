import { RootState } from '../store';

export const getInitializeState = (state: RootState) => state.initialize;
export const getIsInitialize = (state: RootState) => state.initialize.initialize;
