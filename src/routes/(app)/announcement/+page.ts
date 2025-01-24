import { announcements } from '$lib/mock/announcement';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		announcements
	};
};
