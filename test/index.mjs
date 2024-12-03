import test from 'tape';

import hasTypes from '../index.mjs';

const before = '2024-12-01'; // update this date as desired

test('hasTypes', async (t) => {
	t.comment(`date is pinned to ${before}`);

	const packages = {
		'has-proto': true,
		'tape@4': '@types/tape@4',
		'tape@latest': '@types/tape@latest',
		tape: '@types/tape@latest',
	};

	// eslint-disable-next-line no-extra-parens, max-len
	const results = /** @type {[keyof packages, PromiseSettledResult<`@types/${string}` | boolean>][]} */ (await Promise.all(Object.keys(packages).map(async (specifier) => [
		specifier,
		(await Promise.allSettled([hasTypes(specifier, { before })]))[0],
	])));

	results.forEach(([specifier, {
		status,
		// @ts-expect-error yes, it exists on one half of the union
		value,
		// @ts-expect-error yes, it exists on one half of the union
		reason,
	}]) => {
		t.equal(status, 'fulfilled', `expected ${specifier} to be fulfilled; got ${status}`);
		if (status === 'fulfilled') {
			t.equal(value, packages[specifier], `expected ${specifier} to be ${packages[specifier]}; got ${value}`);
		} else {
			t.fail(reason);
		}
	});
});
