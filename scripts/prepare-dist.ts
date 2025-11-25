// @ts-nocheck
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse, modify, applyEdits } from 'jsonc-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Read package.json
const packageJsonPath = join(rootDir, 'package.json');
const packageJsonText = readFileSync(packageJsonPath, 'utf-8');
const packageJson = parse(packageJsonText) as {
    files?: string[];
    types?: string;
    main?: string;
};

// Edit paths relative to dist
let modifiedText = packageJsonText;

// Remove "dist/" from paths
const edits = [
    // Remove "files" field to let .npmignore work
    ...modify(modifiedText, ['files'], undefined, {}),
    // types: "./dist/index.d.ts" -> "./index.d.ts"
    ...modify(
        modifiedText,
        ['types'],
        packageJson.types?.replace(/^\.\/dist\//, './') || './index.d.ts',
        {}
    ),
    // main: "./dist/index.lua" -> "./index" (without .lua)
    ...modify(
        modifiedText,
        ['main'],
        packageJson.main?.replace(/^\.\/dist\//, './').replace(/\.lua$/, '') || './index',
        {}
    ),
];

// Apply all edits
modifiedText = applyEdits(modifiedText, edits);

// Save modified package.json to dist
writeFileSync(join(distDir, 'package.json'), modifiedText, 'utf-8');
console.log('✓ package.json copied and modified');

// Copy .npmignore if exists
const npmignorePath = join(rootDir, '.npmignore');
if (existsSync(npmignorePath)) {
    copyFileSync(npmignorePath, join(distDir, '.npmignore'));
    console.log('✓ .npmignore copied');
}

// Copy README.md if exists
const readmePath = join(rootDir, 'README.md');
if (existsSync(readmePath)) {
    copyFileSync(readmePath, join(distDir, 'README.md'));
    console.log('✓ README.md copied');
}

// Copy LICENSE if exists
const licensePath = join(rootDir, 'LICENSE');
if (existsSync(licensePath)) {
    copyFileSync(licensePath, join(distDir, 'LICENSE'));
    console.log('✓ LICENSE copied');
}

console.log('\n✓ Dist preparation completed');
console.log('To publish, run: cd dist && npm publish');
