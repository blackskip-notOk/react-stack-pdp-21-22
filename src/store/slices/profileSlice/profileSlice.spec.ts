import profileSliceReducer, { setProfileData, setProfileAvatar } from './index';
import { ProfileState } from './types';

describe('profile slice', () => {
	const initialState: ProfileState = {
		userId: undefined,
		lookingForAJob: false,
		lookingForAJobDescription: undefined,
		fullName: undefined,
		contacts: {
			github: undefined,
			vk: undefined,
			facebook: undefined,
			instagram: undefined,
			twitter: undefined,
			website: undefined,
			youtube: undefined,
			mainLink: undefined,
		},
		photos: { small: null, large: null },
	};

	const profileState = {
		userId: 1,
		aboutMe: 'test aboutMe',
		lookingForAJob: true,
		lookingForAJobDescription: 'test description',
		fullName: 'Test Name',
		contacts: {},
		photos: { small: null, large: null },
	};

	const profileAvatar = { small: 'test small avatar', large: 'test large avatar' };

	it('should return the initial state when passed an empty action', () => {
		const state = undefined;
		const action = { type: '' };
		const result = profileSliceReducer(state, action);

		expect(result).toEqual(initialState);
	});
	it('if set profileData, should fill profile info from action', () => {
		const state = undefined;
		const action = setProfileData(profileState);
		const result = profileSliceReducer(state, action);

		expect(result).toEqual(profileState);
		expect(result.fullName).toBe('Test Name');
	});
	it('if set profileAvatar, should fill photos data from action', () => {
		const state = undefined;
		const action = setProfileAvatar(profileAvatar);
		const result = profileSliceReducer(state, action);

		expect(result).toEqual({ ...initialState, photos: profileAvatar });
		expect(result.photos.large).toBe('test large avatar');
	});
});
