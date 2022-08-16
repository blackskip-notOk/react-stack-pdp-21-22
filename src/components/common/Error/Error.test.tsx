import { ErrorMessage } from './Error';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('ErrorMessage.tsx', () => {
	const error = new Error('test error');

	test('Error message should show correct message', () => {
		render(<ErrorMessage error={error} />);

		expect(screen.getAllByText(/test error/i)).toBeDefined();
	});

	test('Error message should renders correctly', () => {
		const wrapper = renderer.create(<ErrorMessage error={error} />).toJSON();

		expect(wrapper).toMatchSnapshot();
	});
});
