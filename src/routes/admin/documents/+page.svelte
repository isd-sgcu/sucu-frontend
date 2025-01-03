<script lang="ts">
    import SearchBar from '$lib/components/SearchBar.svelte';
    import Button from '$lib/components/Button.svelte';
    import Pagination from '$lib/components/Pagination/Pagination.svelte';
    import List from '$lib/components/List/List.svelte';
    import { onMount } from 'svelte';

    export let title: string = 'เอกสาร';
    export let subtitle: string = 'เอกสารทั้งหมดของฝ่าย - อบจ. ';

    let searchQuery = '';
    let activePopoverId: string | null = null;

    let users = [
        { id: '6753736321', title: 'เอกสาร1', date: '01/11/2024', role: 'Admin' },
        { id: '6753736322', title: 'เอกสาร2', date: '01/11/2024', role: 'Admin' },
        { id: '6753736323', title: 'เอกสาร3', date: '01/11/2024', role: 'Admin' },
        { id: '6753736324', title: 'เอกสาร4', date: '01/11/2024', role: 'Admin' },
        { id: '6753736325', title: 'เอกสาร5', date: '01/11/2024', role: 'Admin' },
        { id: '6753736326', title: 'เอกสาร6', date: '01/11/2024', role: 'Admin' },
        { id: '6753736327', title: 'เอกสาร7', date: '01/11/2024', role: 'Admin' },
        { id: '6753736328', title: 'เอกสาร8', date: '01/11/2024', role: 'Admin' },
        { id: '6753736329', title: 'เอกสาร9', date: '01/11/2024', role: 'Admin' },
        { id: '6753736320', title: 'เอกสาร10', date: '01/11/2024', role: 'Admin' }
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
            <div class="flex w-full  items-center font-semibold">
                เลือกเอกสาร
            </div>
            <div class="flex-1"></div>
            <div class="w-32"></div>
            <div class="w-40"></div>
            <div class="w-12"></div>

            <Button
                class="w-24 h-8 shadow-none font-normal text-sm"
                on:click={() => console.log('Button clicked')}
            >
                เพิ่มเอกสาร
            </Button>
        </div>

        <!-- List Items -->
        {#each filteredUsers as user}
            <List
                title={user.title}
                createdAt={user.date}
                createdBy={user.role}
                linkHref={`/document/${user.id}`}
                variant="default"
            />
        {/each}

        <!-- Pagination -->
        <div class="mt-4 w-full flex justify-end">
            <Pagination Arrayitem={users.map((user) => user.id)} on:pageChange={handlePageChange} />
        </div>
    </div>
</div>