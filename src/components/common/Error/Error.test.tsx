import { it } from 'vitest';

it('Error message should renders correctly', () => {
	const sum = (a: number, b: number) => a + b;

	expect(sum(2, 2)).toBe(4);
});
