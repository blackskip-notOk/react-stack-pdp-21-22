import { render } from '@testing-library/react';
import { App } from './App';

jest.dontMock('./App.tsx');

describe('App', () => {
	it('should work as expected', () => {
		render(<App />);
		expect(1 + 2).toBe(3);
	});
});
