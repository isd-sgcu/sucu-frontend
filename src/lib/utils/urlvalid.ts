import isURL from 'is-url';

export function isValidURL(url: string): boolean {
	if (!url) return false;
	return isURL(url);
}

