import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/users`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: request.headers.get('Authorization') || ''
		}
	});

	if (!response.ok) {
		return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), {
			status: response.status,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const data = await response.json();
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
