import { rest } from 'msw';
import { API } from '../constants/apiConstants';

const isAuth = false;

export const handlers = [
	rest.get(`${API.baseURL}/${API.authMe}`, (req, res, ctx) => {
		if (!isAuth) {
			return res(
				ctx.status(200),
				ctx.json({
					data: {},
					fieldsErrors: [],
					messages: ['You are not authorized'],
					resultCode: 1,
				}),
			);
		}

		return res(
			ctx.status(200),
			ctx.json({
				data: {
					id: 2,
					email: 'blabla@bla.bla',
					login: 'samurai',
				},
				fieldsErrors: [],
				messages: [],
				resultCode: 0,
			}),
		);
	}),

	rest.post(`${API.baseURL}/${API.login}`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				resultCode: 0,
				messages: [],
				data: { userId: 2 },
			}),
		);
	}),
];
