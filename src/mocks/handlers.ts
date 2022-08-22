import { rest } from 'msw';
import { UserID } from '~/store/slices/profileSlice/types';
import type { UsersState } from '~/store/slices/usersSlice/types';
import { API } from '../constants/apiConstants';
import users from './users.json';

const isAuth = false;

const usersWithId = users.items.map((item) => ({ ...item, id: UserID(item.id) }));

export const usersResponse: UsersState = {
	error: null,
	items: usersWithId.slice(0, 10),
	totalCount: 100,
};

export const handlers = [
	rest.get('http://localhost/locales/en-US/translation.json', (_, res, ctx) => {
		return res(ctx.status(200), ctx.body('../../public/locales/en/translation.json'));
	}),

	rest.get(`${API.baseURL}/${API.authMe}`, (_, res, ctx) => {
		if (!isAuth) {
			return res(
				ctx.status(200),
				ctx.json({
					data: {},
					fieldsErrors: [],
					messages: ['You are not authorized'],
					resultCode: 1,
				}),
				ctx.delay(100),
			);
		}

		return res(
			ctx.status(200),
			ctx.json({
				data: {
					id: 1,
					email: 'testEmail@gmail.com',
					login: 'testLogin',
				},
				fieldsErrors: [],
				messages: [],
				resultCode: 0,
			}),
			ctx.delay(100),
		);
	}),

	rest.post(`${API.baseURL}/${API.login}`, (_, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				resultCode: 0,
				messages: [],
				data: { userId: 2 },
			}),
		);
	}),

	rest.get(`${API.baseURL}/${API.users}`, (req, res, ctx) => {
		return res(ctx.json(usersResponse), ctx.delay(150));
	}),
];
