import {
	clearObject,
	getFriendParam,
	getSearchParamsFromUrl,
	idGenerator,
	searchParamsSerializer,
} from '~/utils';
import { FollowResponse } from '~/store/slices/usersSlice/types';
import { Description, ServerMessage } from '~/constants/serverMessages';
import { getFollowResult } from '.';

describe('app utils functions', () => {
	describe('getFollowResult util', () => {
		const resultSuccess: FollowResponse = {
			messages: [],
			resultCode: 0,
			data: {},
		};

		const resultFollowFailed: FollowResponse = {
			messages: [ServerMessage.alreadyFollow],
			resultCode: 1,
			data: {},
		};

		const resultUnFollowFailed: FollowResponse = {
			messages: [ServerMessage.alreadyUnfollow],
			resultCode: 1,
			data: {},
		};

		const resultFailed: FollowResponse = {
			messages: [],
			resultCode: 10,
			data: {},
		};

		const userName = 'test user';
		const successMessageFollow = `${Description.successFollow} ${userName}`;
		const unSuccessMessageFollow = Description.alreadyFollow;
		const successMessageUnFollow = `${Description.successUnFollow} ${userName}`;
		const unSuccessMessageUnFollow = Description.alreadyUnFollow;

		const follow = true;
		const unfollow = false;

		it('if response is undefined, should return failed answer', () => {
			expect(getFollowResult(undefined, userName, follow)).toStrictEqual({
				isSuccess: false,
				message: Description.someError,
			});

			expect(getFollowResult(undefined, userName, unfollow)).toStrictEqual({
				isSuccess: false,
				message: Description.someError,
			});
		});

		it('if follow to new user success, should return answer with success message', () => {
			expect(getFollowResult(resultSuccess, userName, follow)).toStrictEqual({
				isSuccess: true,
				message: successMessageFollow,
			});
			expect(
				getFollowResult({ ...resultSuccess, messages: ['any test message'] }, userName, follow),
			).toStrictEqual({
				isSuccess: true,
				message: successMessageFollow,
			});
		});

		it('if unfollow from user success, should return answer with success message', () => {
			expect(getFollowResult(resultSuccess, userName, unfollow)).toStrictEqual({
				isSuccess: true,
				message: successMessageUnFollow,
			});
			expect(
				getFollowResult({ ...resultSuccess, messages: ['any test message'] }, userName, unfollow),
			).toStrictEqual({
				isSuccess: true,
				message: successMessageUnFollow,
			});
		});

		it('if already follow to user, should return answer with error message', () => {
			expect(getFollowResult(resultFollowFailed, userName, follow)).toStrictEqual({
				isSuccess: false,
				message: unSuccessMessageFollow,
			});
		});

		it('if already unfollow from user, should return answer with error message', () => {
			expect(getFollowResult(resultUnFollowFailed, userName, unfollow)).toStrictEqual({
				isSuccess: false,
				message: unSuccessMessageUnFollow,
			});
		});

		it('if unexpectable error occur, shoult return error message', () => {
			expect(getFollowResult(resultFailed, userName, follow)).toEqual({
				isSuccess: false,
				message: Description.someError,
			});
			expect(getFollowResult(resultFailed, userName, unfollow)).toEqual({
				isSuccess: false,
				message: Description.someError,
			});
		});
	});

	describe('idGenerator', () => {
		it('should return a sequence of numbers', () => {
			const it = idGenerator();

			expect(it.next().value).toBe(1);

			it.next();
			it.next();
			it.next();
			it.next();
			it.next();

			expect(it.next().value).toBe(7);
		});
	});

	describe('clearObject', () => {
		const noNullObj = {
			page: '2',
			count: '25',
			term: 'test user',
			friend: '1',
		};

		const nullObj = {
			page: null,
			count: '25',
			term: null,
			friend: '1',
		};

		const cleanObj = {
			count: '25',
			friend: '1',
		};

		it('if object does not have field with null value, should return the same object', () => {
			expect(clearObject(noNullObj)).toStrictEqual(noNullObj);
		});

		it('if object have field with null value, should return clean object', () => {
			expect(clearObject(nullObj)).toStrictEqual(cleanObj);
		});

		it('if object have only fields with null value, should return null', () => {
			expect(clearObject({ page: null, count: null, term: null, friend: null })).toBeNull();
		});
	});

	describe('searchParamsSerializer', () => {
		it('if does not set params, should return null', () => {
			expect(searchParamsSerializer({ page: 1, count: 10 })).toBeNull();
		});

		it('if set params, should return correct object', () => {
			expect(searchParamsSerializer({ page: 2, count: 100 })).toStrictEqual({
				page: '2',
				count: '100',
			});
			expect(searchParamsSerializer({ page: 1, count: 25 })).toStrictEqual({ count: '25' });
			expect(searchParamsSerializer({ page: 2, count: 10 })).toStrictEqual({ page: '2' });
			expect(searchParamsSerializer({ page: 2, count: 100 })).toStrictEqual({
				page: '2',
				count: '100',
			});
			expect(searchParamsSerializer({ page: 1, count: 10, term: 'test user' })).toStrictEqual({
				term: 'test user',
			});
			expect(searchParamsSerializer({ page: 2, count: 10, term: 'test user' })).toStrictEqual({
				page: '2',
				term: 'test user',
			});
			expect(searchParamsSerializer({ page: 1, count: 25, term: 'test user' })).toStrictEqual({
				count: '25',
				term: 'test user',
			});
			expect(
				searchParamsSerializer({ page: 1, count: 10, term: 'test user', friend: true }),
			).toStrictEqual({
				term: 'test user',
				friend: '1',
			});
			expect(
				searchParamsSerializer({ page: 1, count: 10, term: 'test user', friend: false }),
			).toStrictEqual({
				term: 'test user',
				friend: '0',
			});
			expect(
				searchParamsSerializer({ page: 2, count: 25, term: 'test user', friend: false }),
			).toStrictEqual({
				page: '2',
				count: '25',
				term: 'test user',
				friend: '0',
			});
		});
	});

	describe('getSearchParamsFromUrl', () => {
		it('if empty paarams, should return null', () => {
			expect(getSearchParamsFromUrl({})).toBeNull();
		});

		it('if have params in url, should return correct object', () => {
			expect(
				getSearchParamsFromUrl({
					count: '2',
					page: '25',
					term: 'test user',
					friend: '0',
				}),
			).toStrictEqual({
				count: 2,
				page: 25,
				term: 'test user',
				friend: false,
			});

			expect(
				getSearchParamsFromUrl({
					term: 'test user',
					friend: '0',
				}),
			).toStrictEqual({
				count: undefined,
				page: undefined,
				term: 'test user',
				friend: false,
			});

			expect(
				getSearchParamsFromUrl({
					count: '2',
					page: '25',
					friend: '1',
				}),
			).toStrictEqual({
				count: 2,
				page: 25,
				friend: true,
				term: undefined,
			});
		});
	});

	describe('getFriendParam', () => {
		it('should return boolean or undefined', () => {
			expect(getFriendParam('all')).toBeUndefined();
			expect(getFriendParam('friends')).toBeDefined();
			expect(getFriendParam('friends')).toBeTruthy();
			expect(getFriendParam('notfriends')).toBeDefined();
			expect(getFriendParam('notfriends')).toBeFalsy();
		});
	});
});
