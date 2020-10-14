
import resolve from './rollup-plugins/resolve';
import babel from './rollup-plugins/babel';
import replace from './rollup-plugins/replace';
import alias from '@rollup/plugin-alias';

export default {
	input: './test/index.tsx',
	output: [
		{
			file: './test/bundle/index.js',
			sourcemap: true,
			format: 'umd',
		},
	],
	plugins: [
		alias({
			entries: {
				'@neep/core': '../neep.js/packages/core/src/index.ts',
				'@neep/web-render': '../neep.js/packages/web-render/src/index.ts',
				'@neep/devtools': '../neep.devtools.js/src/index.ts',
				'@neep/insertable': './src/index.ts',
			},
		}),
		resolve(),
		babel(),
		replace(false),
	],
};
