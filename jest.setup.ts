import '@testing-library/jest-dom/extend-expect';
import { server } from './src/mocks/server';

beforeAll(() =>
	server.listen({
		onUnhandledRequest: ({ headers }, print) => {
			if (headers.get('User-Agent') === 'supertest') {
				return;
			}
			print.error();
		},
	}),
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
