export async function getAllUsers(token : String) {
    try {
        const response = await fetch('https://sucu-backend-2024-689509857491.asia-southeast1.run.app/api/v1/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

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