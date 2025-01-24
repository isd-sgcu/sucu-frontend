<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import { getMe } from '$lib/api/getme';
	import { getDecryptedToken } from '$lib/api/getToken';
	import { onMount } from 'svelte';

	let menuItems = [
		{ title: 'ประกาศ', href: '/admin' },
		{ title: 'เอกสาร', href: '/admin/document' },
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
			window.location.replace('/login');
		}
	});
</script>

<div class="min-h-screen bg-white z-50 w-full">
	<Sidebar {menuItems} {user} />
	<slot />
</div>
