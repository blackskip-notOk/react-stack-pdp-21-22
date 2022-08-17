import { Login } from './Login';
import { server } from '~/mocks/server';
import { renderWithProviders, setup } from '~/utils/testUtils';
import { fireEvent, screen } from '@testing-library/react';
import { ServerMessage } from '~/constants/serverMessages';
import { setupStore } from '~/store/store';
import { setAuthData, setAuthError } from '~/store/slices/authSlice';
import { miniSerializeError } from '@reduxjs/toolkit';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Login.tsx', () => {
	const setShowGreeting = vi.fn();
	test('if not auth, should show auth error', () => {
		const error = new Error(ServerMessage.notAutorized);
		const serializeError = miniSerializeError(error);
		const store = setupStore();
		store.dispatch(setAuthError(serializeError));

		const { container } = renderWithProviders(<Login setShowGreeting={setShowGreeting} />, {
			store,
		});

		expect(container).not.toHaveTextContent(/unexpected error/i);
		expect(container).toHaveTextContent(/you are not logged in, please login or register/i);
	});

	test('if not auth and do not have authMessage, should show unknown error', async () => {
		const initialAuthState = {
			isAuth: false,
			authMessage: undefined,
			data: {
				id: null,
				email: null,
				login: null,
			},
		};

		const store = setupStore();
		store.dispatch(setAuthData(initialAuthState));

		const { container } = renderWithProviders(<Login setShowGreeting={setShowGreeting} />, {
			store,
		});

		expect(container).toHaveTextContent(/unexpected error/i);
		expect(container).not.toHaveTextContent(/you are not logged in, please login or register/i);
	});

	test("if auth, shouldn't show any error", async () => {
		const initialAuthState = {
			isAuth: true,
			authMessage: undefined,
			data: {
				id: 1,
				email: 'testEmail@gmail.com',
				login: 'testLogin',
			},
		};

		const store = setupStore();
		store.dispatch(setAuthData(initialAuthState));

		const { container } = renderWithProviders(<Login setShowGreeting={setShowGreeting} />, {
			store,
		});

		expect(container).not.toHaveTextContent('You are not logged in, please login or register');
		expect(container).not.toHaveTextContent('Unexpected error');
	});

	test('if click on login button without filled login/password, should show validation messages', async () => {
		renderWithProviders(<Login setShowGreeting={setShowGreeting} />);

		fireEvent.click(screen.getByRole('button', { name: /login/i }));
		expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
		expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
		expect(await screen.findByRole('button', { name: /login/i })).toBeDisabled();
	});
	test('if user typed incorrect email, should show validation error', async () => {
		const { user, container } = setup(<Login setShowGreeting={setShowGreeting} />);
		const emailInput = screen.getByRole('textbox', { name: /email/i });
		await user.click(emailInput);
		await user.type(emailInput, 'testEmail');

		expect(emailInput).toHaveValue('testEmail');
		// expect(await screen.findByText(/enter valid email/i)).toBeInTheDocument();
		expect(container).toHaveTextContent(/errorEmail/i); // TODO research how to find a correct error message
	});
});
