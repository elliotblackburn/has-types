#! /usr/bin/env node

import { readFileSync } from 'fs';
import { join } from 'path';

import npa from 'npm-package-arg';

import pargs from './pargs.mjs';

const help = readFileSync(join(import.meta.dirname, './help.txt'), 'utf8');

const {
	positionals,
	values: { before },
} = pargs(help, import.meta.url, {
	allowPositionals: true,
	options: {
		before: {
			type: 'string',
		},
	},
});

const specifiers = positionals.slice(1);

if (specifiers.length !== 1) {
	console.error('You must provide exactly one specifier');
	process.exit(1);
}

if (typeof before !== 'undefined' && typeof before !== 'string') {
	console.error('`before` option must be a valid Date value');
	process.exit(1);
}

let name, rawSpec;
try {
	({ name, rawSpec } = npa(specifiers[0]));
	if (rawSpec === '*') {
		rawSpec = 'latest';
	}
} catch (e) {
	// eslint-disable-next-line no-extra-parens
	console.error(/** @type {Error} */ (e)?.message ?? 'Unknown error');
	process.exit(1);
}

import hasTypes from './index.mjs';

import mockProperty from 'mock-property';

// eslint-disable-next-line no-empty-function, no-extra-parens
const restore = mockProperty(/** @type {Parameters<typeof mockProperty>[0]} */ (/** @type {unknown} */ (console)), 'error', { value() {} });
const promise = hasTypes(specifiers[0], { before });

promise.finally(() => {
	restore();
}).catch((e) => {
	console.error(e.message);
	process.exit(1);
}).then((r) => {
	console.log(`${name}@${rawSpec} ${typeof r === 'string' ? r : r ? 'integrated' : 'none'}`);
});
