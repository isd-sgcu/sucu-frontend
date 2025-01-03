<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';
	import { onMount } from 'svelte';

	export let title: string = 'จัดการผู้ใช้งาน';
	export let subtitle: string = 'ผู้ใช้งานที่มีสิทธิ์เข้าถึงการแก้ไขและเปลี่ยนแปลงเอกสารทั้งหมด';

	let searchQuery = '';
	let activePopoverId: string | null = null;

	let users = [
		{ id: '6753736321', title: 'นางสาวหนูเต็งก เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736322', title: 'นางสาวหนูเต็งก เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736323', title: 'นางสาวหนูเต็งข เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736324', title: 'นางสาวหนูเต็งข เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736325', title: 'นางสาวหนูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736326', title: 'นางสาวหนูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736327', title: 'นางสาวหนูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736328', title: 'นางสาวหนูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736329', title: 'นางสาวหนูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
		{ id: '6753736320', title: 'นางสาวหนูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' }
	];

	type User = {
		id: string;
		title: string;
		date: string;
		role: string;
	};

	let filteredUsers: User[] = [];
	let selectedItems: string[] = [];
	let currentPage = 1;
	let itemsPerPage = 5;
	let paginatedIds: string[] = [];

	function togglePopover(id: string) {
		activePopoverId = activePopoverId === id ? null : id;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.popover') && !target.closest('.more-options-button')) {
			activePopoverId = null;
		}
	}

	function updateFilteredUsers() {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		filteredUsers = users
			.filter(
				(user) =>
					user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.id.includes(searchQuery) ||
					user.role.toLowerCase().includes(searchQuery.toLowerCase())
			)
			.filter((user) => paginatedIds.includes(user.id))
			.slice(startIndex, endIndex);
	}

	$: {
		updateFilteredUsers();
	}

	function toggleSelectAll(event: Event) {
		const checkbox = event.target as HTMLInputElement;
		if (checkbox.checked) {
			selectedItems = filteredUsers.map((user) => user.id);
		} else {
			selectedItems = [];
		}
	}

	function toggleSelectItem(id: string) {
		const index = selectedItems.indexOf(id);
		if (index === -1) {
			selectedItems = [...selectedItems, id];
		} else {
			selectedItems = selectedItems.filter((item) => item !== id);
		}
	}

	function handlePageChange(event: CustomEvent) {
		paginatedIds = event.detail.paginatedItems;
		itemsPerPage = parseInt(event.detail.itemsPerPage);
		updateFilteredUsers();
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<svelte:window on:click={handleClickOutside} />

<div class="pl-64 min-h-screen bg-white p-8 m-8">
	<div class="mb-4 mt-5">
		<h1 class="text-2xl font-bold text-gray-800">{title}</h1>
		<p class="text-sm text-gray-600">{subtitle}</p>
	</div>

	<div class="mb-4">
		<SearchBar bind:value={searchQuery} />
	</div>

	<div class="rounded-lg">
		<!-- Header -->
		<div class="flex items-center border-b border-sucu-pink-02 px-4 py-3 mb-2">
			<div class="flex w-12 items-center">
				<input
					type="checkbox"
					on:change={toggleSelectAll}
					checked={selectedItems.length === filteredUsers.length}
					class="h-4 w-4 rounded border-gray-300"
				/>
			</div>
			<div class="flex-1 font-semibold text-sm">เลือกทั้งหมด</div>
			<div class="w-32"></div>
			<div class="w-40"></div>
			<div class="w-12"></div>

			<Button
				class="w-24 h-8 shadow-none font-normal text-sm"
				on:click={() => console.log('Button clicked')}
			>
				เพิ่มผู้ใช้งาน
			</Button>
		</div>

		<!-- List Items -->
		{#each filteredUsers as user}
			<div class="flex items-center px-4 py-3 hover:bg-gray-50 shadow-md my-2 relative">
				<div class="flex w-12 items-center">
					<input
						type="checkbox"
						checked={selectedItems.includes(user.id)}
						on:change={() => toggleSelectItem(user.id)}
						class="h-4 w-4 rounded border-gray-300"
					/>
				</div>
				<div class="flex-1 font-medium text-gray-900">{user.title}</div>
				<div class="w-32 text-gray-600">{user.id}</div>
				<div class="w-40 text-gray-600">สร้างเมื่อ {user.date}</div>
				<div class="w-24">
					<span class="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
						{user.role}
					</span>
				</div>
				<div class="w-12 relative">
					<button
						class="text-gray-500 hover:text-gray-700 more-options-button"
						aria-label="More options"
						on:click|stopPropagation={() => togglePopover(user.id)}
					>
						<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
							/>
						</svg>
					</button>
					{#if activePopoverId === user.id}
						<div class="absolute right-0 mt-2 w-32 rounded-lg bg-white shadow-lg z-50 popover">
							<div class="py-1">
								<button
									class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
									on:click={() => console.log('Edit user')}
								>
									แก้ไข
								</button>
								<button
									class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
									on:click={() => console.log('Remove user')}
								>
									ลบ
								</button>
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/each}

		<!-- Pagination -->
		<div class="mt-4 w-full flex justify-end">
			<Pagination Arrayitem={users.map((user) => user.id)} on:pageChange={handlePageChange} />
		</div>
	</div>
</div>
