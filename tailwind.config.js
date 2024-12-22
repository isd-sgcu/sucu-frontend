import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { colorScheme } from './src/styles/tailwind/color';
import { boxShadow } from './src/styles/tailwind/shadow';
import { borderRadius } from './src/styles/tailwind/borderRadius';
import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			colors: colorScheme,
			boxShadow: boxShadow,
			borderRadius: borderRadius
		}
	},
	plugins: [
		tailwindScrollbar,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					}
				]
			}
		})
	]
}; 