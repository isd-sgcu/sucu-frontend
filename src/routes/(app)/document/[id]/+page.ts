import { documents } from '$lib/mock/document';
import type { PageLoad } from './$types';
import 'dayjs/locale/th';

export const load: PageLoad = async ({ params }) => {
	const document = documents.find((doc) => doc.id === params.id);
	return { params, document };
};
