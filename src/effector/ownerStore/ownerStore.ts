import { createEvent, createStore } from "effector";
import { Owner } from './types';

const defaultStore = {
    isOwner: false,
    ownerId: null
}

export const $owner = createStore<Owner>(defaultStore);

export const setOwner = createEvent<Owner>();

const updateStore = (state: Owner, data: Owner) => {
    if (!state.isOwner) {
        state.isOwner = data.isOwner;
        state.ownerId = data.ownerId;
    }
    return {...state}
};

$owner
.on(setOwner, updateStore);