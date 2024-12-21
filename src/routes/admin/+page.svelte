<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	const menuItems = [
		{ title: 'ประกาศ', href: '/admin' },
		{ title: 'เอกสาร', href: '/admin/documents' },
		{ title: 'สถิติ และ งบประมาณ', href: '/admin/stats' },
		{ title: 'จัดการผู้ใช้งาน', href: '/admin/users' }
	];

	const user = {
		name: 'name',
		lastname: 'lastname',
		role: 'role'
	};
</script>

<div class="flex min-h-screen bg-white">
	<Sidebar {menuItems} {user} />
</div>
