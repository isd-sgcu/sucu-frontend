import { announcements } from '$lib/mock/announcement';
import type { PageLoad } from '../../../announcement/$types';

export const load: PageLoad = async () => {
	return {
		announcements
	};
};
