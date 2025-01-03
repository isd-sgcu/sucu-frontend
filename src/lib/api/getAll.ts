const API_URL = '/api/getall';

export async function getAllUsers(token: string) {
	try {
		const response = await fetch(
			API_URL,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Error: ${errorData.message}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch users:', error);
	}
}
