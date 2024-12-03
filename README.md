# hastypes <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Does the given package have TypeScript types?

**Inspired by https://github.com/ofrobots/typescript-friendly**

## Example

```sh
$ hastypes hastypes # => integrated
$ hastypes react@19 # => @types/react
$ hastypes mdpdf@1 # => none
```

```mjs
import hasTypes from 'hastypes';
import assert from 'assert';

hasTypes('hastypes').then(x => assert.equal(x, true));
hasTypes('react@19').then(x => assert.equal(x, '@types/react'));
hasTypes('mdpdf@1').then(x => assert.equal(x, false));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/hastypes
[npm-version-svg]: https://versionbadg.es/elliotblackburn/has-types.svg
[deps-svg]: https://david-dm.org/elliotblackburn/has-types.svg
[deps-url]: https://david-dm.org/elliotblackburn/has-types
[dev-deps-svg]: https://david-dm.org/elliotblackburn/has-types/dev-status.svg
[dev-deps-url]: https://david-dm.org/elliotblackburn/has-types#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/hastypes.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/hastypes.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/hastypes.svg
[downloads-url]: https://npm-stat.com/charts.html?package=hastypes
[codecov-image]: https://codecov.io/gh/elliotblackburn/has-types/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/elliotblackburn/has-types/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/elliotblackburn/has-types
[actions-url]: https://github.com/elliotblackburn/has-types/actions
