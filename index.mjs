import { existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';

import { dirSync } from 'tmp';
import npa from 'npm-package-arg';
import pacote from 'pacote';
import { getDTName } from 'dts-gen/dist/names.js';

/** @type {import('.')} */
export default async function hasTypes(specifier, options = {}) {
	let { before } = options;
	let date = typeof before !== 'undefined' && new Date(before);
	if (date && isNaN(Number(date))) {
		throw new TypeError('`before` option must be a valid Date value');
	}

	const {
		registry,
		name,
		fetchSpec,
	} = npa(specifier);
	if (!registry) {
		throw new TypeError('specifier must be a registry package');
	}

	const { name: tmpdir, removeCallback } = dirSync({ unsafeCleanup: true });

	try {
		const pExtract = pacote.extract(specifier, tmpdir, { before: date });
		const manifest = pacote.manifest(specifier, { before: date });

		// don't bother supporting typings
		const explicitTypes = manifest.types;
		if (explicitTypes) {
			if (typeof explicitTypes !== 'string') {
				throw new TypeError('`types` field is not a string. Please report this!');
			}

			if (!explicitTypes.endsWith('.d.ts')) {
				return false;
			}
			await pExtract;
			if (!existsSync(join(tmpdir, explicitTypes))) {
				return false;
			}

			return true;
		}

		var index = manifest.main || 'index.js';
		var extless = join(dirname(index), basename(index, extname(index)));
		var dts = `./${extless}.d.ts`;

		await pExtract;
		if (existsSync(join(tmpdir, dts))) {
			return true;
		}

		const dtSpec = `@types/${getDTName(name)}@${fetchSpec === '*' ? 'latest' : fetchSpec}`;

		const result = await pacote.manifest(dtSpec, { before: date }).catch(() => null);

		return result !== null && dtSpec;
	} finally {
		removeCallback();
	}
}
