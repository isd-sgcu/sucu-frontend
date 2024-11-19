/** @type {import('tailwindcss').Config} */
import { colorScheme } from './src/styles/tailwind/color';
import { boxShadow } from './src/styles/tailwind/shadow';
import { borderRadius } from './src/styles/tailwind/borderRadius';
import tailwindScrollbar from 'tailwind-scrollbar';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: colorScheme,
			boxShadow: boxShadow,
			borderRadius: borderRadius
		}
	},
	plugins: [tailwindScrollbar]
};
