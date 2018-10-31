// import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import css from 'rollup-plugin-css-porter';
// import json from 'rollup-plugin-json';
// import copy from 'rollup-plugin-cpy';
import pkg from './package.json';
// import svelte from 'rollup-plugin-svelte';
// import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: pkg.main,
        output: { 
            file: pkg.browser,
            format: 'iife',
            sourcemap: true,
            name: 'Chat'
        },
        plugins: [                        
            resolve({ jsnext: true, main: true, browser: false, module: false }),
            commonjs(),
            // terser(),
        ],
    },       
];