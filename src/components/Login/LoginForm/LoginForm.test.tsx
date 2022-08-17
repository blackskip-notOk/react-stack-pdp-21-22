import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, setup } from '~/utils/testUtils';
import { LoginForm } from './LoginForm';

describe('LoginForm.tsx', () => {
	const setShowGreeting = vi.fn();
	describe('validation login form', () => {
		test('if click on login button without filled login/password, should show validation messages', async () => {
			renderWithProviders(<LoginForm setShowGreeting={setShowGreeting} />);

			fireEvent.click(screen.getByRole('button', { name: /login/i }));
			expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
			expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
			expect(await screen.findByRole('button', { name: /login/i })).toBeDisabled();
		});
		test('if user typed incorrect email, should show validation error', async () => {
			const { user } = setup(<LoginForm setShowGreeting={setShowGreeting} />);
			const emailInput = screen.getByRole('textbox', { name: /email/i });
			await user.click(emailInput);
			await user.type(emailInput, 'testEmail');

			expect(emailInput).toHaveValue('testEmail');
			// expect(await screen.findByText(/enter valid email/i)).toBeInTheDocument();
			// expect(container).toHaveTextContent(/errorEmail/i); // TODO research how to find a correct error message
		});
	});

	// describe('dispatching actions to a redux store', () => {
	// test('if user is auth, should set login request data to initial', () => {});
	// });
});
