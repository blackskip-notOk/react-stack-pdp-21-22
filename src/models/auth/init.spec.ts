import { $auth } from '.';
import { authFx } from './index';
import { allSettled, fork } from 'effector-logger';

describe('fetch auth data', () => {
	test('authFx should get auth data and send it to $auth', async () => {
		const fetchAuthDataHandler = jest.fn();

		const scope = fork({
			handlers: new Map([[authFx, fetchAuthDataHandler]]),
			values: new Map([[$auth, 'Faked auth store']]),
		});

		await allSettled(authFx, { scope });

		expect(fetchAuthDataHandler).toBeCalled();
		expect(fetchAuthDataHandler).toBeCalledTimes(1);

		// () => console.log('Faked authFx')
		console.log(scope.getState($auth));
	});
});
