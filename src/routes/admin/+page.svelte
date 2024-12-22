<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import { getMe } from '$lib/api/getme';
	import { getDecryptedToken } from '$lib/api/getToken';
	import { onMount } from 'svelte';

	const menuItems = [
		{ title: 'ประกาศ', href: '/admin' },
		{ title: 'เอกสาร', href: '/admin/documents' },
		{ title: 'สถิติ และ งบประมาณ', href: '/admin/stats' },
		{ title: 'จัดการผู้ใช้งาน', href: '/admin/users' }
	];

	let user = {
		name: 'Not found',
		lastname: 'Not found',
		role: 'Not found',
		id: 'Not found'
	};

	onMount(async () => {
		const token = getDecryptedToken();
		if (token) {
			try {
				const userData = await getMe(token);
				user = {
					name: userData.result.first_name,
					lastname: userData.result.last_name,
					role: userData.result.role,
					id: userData.result.id
				};
			} catch (error) {
				console.error('Failed to fetch user data:', error);
			}
		} else {
			console.log('No token found');
		}
	});
</script>

<div class="flex min-h-screen bg-white">
	<Sidebar {menuItems} {user} />
</div>
