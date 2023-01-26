import { getLimitedQuantity } from '$lib/predictions.server';
import { describe, expect, it } from 'vitest';

describe('Test limited quantity', () => {
	it('sample test which should be true', () => {
		expect(getLimitedQuantity(15, 10)).toBe(10);
		expect(getLimitedQuantity(25, 30)).toBe(20);
		expect(getLimitedQuantity(-5, 10)).toBe(0);
		expect(getLimitedQuantity(15, 5)).toBe(5);
		expect(getLimitedQuantity(7, 15)).toBe(7);
	});
});
