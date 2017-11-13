#!/usr/bin/env node
'use strict';

const meow = require('meow');
const rp = require('request-promise');

const cli = meow(`
    has-types will return information about an npm packages typescript support and friendliness.

    Usage:
        $ hastypes <npm package name>
`);

const pkg = cli.input[0];

if (!pkg) {
    // Show help and exit
    cli.showHelp();
}

function escapePackageName(pkg) {
    return pkg.replace('/', '%2f');
}

async function check() {
    let friendliness = 'none';
    
    let res;
    try {
        res = await rp('https://registry.npmjs.com/' + escapePackageName(pkg));
    } catch (err) {
        if (err.statusCode === 404) {
            console.error("Package not found, is it part of an npm organisation?");
            process.exit(1);
        } else {
            console.error("Failed to get details of types");
        }
    }
    const manifest = JSON.parse(res);

    const latestVersion = manifest['dist-tags'].latest;
    const latestManifest = manifest.versions[latestVersion];
    
    if (latestManifest.types) {
        friendliness = 'integrated';
    } else {
        // Check if an @types/ package for the module
        const typesPackage = escapePackageName('@types/' + pkg);
        let res;
        try {
            res = await rp('https://registry.npmjs.com/' + typesPackage);
        } catch (err) {
            if (err.statusCode !== 404) {
                console.error("Failed to get details of types");
                process.exit(1);
            }
        }
        if (res) {
            const typesManifest = JSON.parse(res);
            friendliness = "@types/" + pkg;
        }
    }

    console.log(friendliness);
}

check();