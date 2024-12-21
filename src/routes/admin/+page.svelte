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
	<!-- Sidebar -->
	<Sidebar {menuItems} {user} />

	<!-- Main Content -->
	<!-- <main class="ml-[250px] flex-1 p-8">
      <div class="rounded-lg border-2 border-dashed border-gray-200 p-8">
        <h1 class="text-2xl font-bold text-gray-900">Content Area</h1>
        <p class="mt-4 text-gray-600">
          This is where your main content will go. The sidebar will stay fixed on the left
          while this content area scrolls independently.
        </p>
      </div>
    </main> -->
</div>
