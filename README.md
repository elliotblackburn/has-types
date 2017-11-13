# Has types?

> Check if an npm package is typescript friendly!

**Inspired by https://github.com/ofrobots/typescript-friendly**

## Installation

```
npm i -g has-types
```

## Usage

Simply call `hastypes` followed by an npm package name!

```sh
$ hastypes @sindresorhus/is # => integrated
$ hastypes express # => @types/express
$ hastypes mdpdf # => none
```
