import type { PageLoad } from './$types';
import 'dayjs/locale/th';
import { documents } from '$lib/mock/document';

export const load: PageLoad = async () => {
	return {
		documents
	};
};
