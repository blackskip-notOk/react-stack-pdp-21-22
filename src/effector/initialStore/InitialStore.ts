import { createEvent, createStore } from "effector";
import { Inizialize } from './types';

const defaultStore = {
    inizialized: false,
    message: ''
}

export const $inizialize = createStore<Inizialize>(defaultStore);

export const inizialize = createEvent<Inizialize>();

const updateStore = (state: Inizialize, data: Inizialize) => {
    if (!state.inizialized) {
        state.inizialized = data.inizialized;
        state.message = data.message;
    }
    return {...state}
};

$inizialize
.on(inizialize, updateStore);