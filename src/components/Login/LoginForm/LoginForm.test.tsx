import * as renderer from 'react-test-renderer';
import { LoginForm } from './LoginForm';
import { BrowserRouter } from 'react-router-dom';

const setShowGreeting = jest.fn();

it('renders correctly', () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<LoginForm setShowGreeting={setShowGreeting} />
			</BrowserRouter>,
		)
		.toJSON();

	expect(tree).toMatchSnapshot();
});
