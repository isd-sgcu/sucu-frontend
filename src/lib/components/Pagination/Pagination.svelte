<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { cn } from '../../utils/cn';
    import Fa from 'svelte-fa';
    import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
    import Dropdown from '../Dropdown/Dropdown.svelte';

    export let Arrayitem: string[] = [];
    export let pageChoice: string[] = ['5', '10', '15'];
    export let itemsPerPage: string = '5';

    let currentPage: number | string = 1;
    let totalPages: number = Math.ceil(Arrayitem.length / parseInt(itemsPerPage));
    let paginatedItems: string[] = [];

    const dispatch = createEventDispatcher();

    function changePage(page: number | string) {
        currentPage = page;
        paginateItems();
        dispatch('pageChange', paginatedItems);
    }

    function paginateItems() {
        const startIndex = (Number(currentPage) - 1) * parseInt(itemsPerPage);
        const endIndex = startIndex + parseInt(itemsPerPage);
        paginatedItems = Arrayitem.slice(startIndex, endIndex);
    }

    function getVisiblePages(totalPages: number, currentPage: number) {
        let pages = [];
        if (totalPages <= 7) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            pages.push(1);
            if (currentPage > 4) {
                pages.push('...');
            }
            let startPage = Math.max(2, currentPage - 2);
            let endPage = Math.min(totalPages - 1, currentPage + 2);
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 3) {
                pages.push('...');
            }
            pages.push(totalPages);
        }
        return pages;
    }

    function changeItemsPerPage(newItemsPerPage: string) {
        itemsPerPage = newItemsPerPage;
        totalPages = Math.ceil(Arrayitem.length / parseInt(itemsPerPage));
        paginateItems();
        dispatch('pageChange', paginatedItems);
    }

    $: {
        totalPages = Math.ceil(Arrayitem.length / parseInt(itemsPerPage));
        paginateItems();
        dispatch('pageChange', paginatedItems);
    }

    $: if (!itemsPerPage || parseInt(itemsPerPage) < 1) {
        itemsPerPage = '5';
    }

    $: paginateItems();
</script>

<div class="flex flex-col gap-2 justify-center items-center">
    <div class="flex gap-2 max-md:flex-col max-md:gap-1">
        <div class="flex gap-2 max-md:gap-1">
            <button
                class="px-4 py-2 rounded bg-white border max-md:scale-75"
                on:click={() => changePage(Number(currentPage) - 1)}
                disabled={currentPage === 1}
            >
                <Fa icon={faChevronLeft} scale={0.75} />
            </button>

            <div class="gap-2 flex flex-wrap">
                {#each getVisiblePages(totalPages, Number(currentPage)) as page}
                    {#if page === '...'}
                        <span class="px-4 py-2 max-md:scale-75">...</span>
                    {:else}
                        <button
                            class={cn(
                                '  px-4 max-md:px-4 py-2 rounded max-md:scale-75',
                                currentPage === page ? 'text-white bg-sucu-pink-02 ' : 'text-black bg-white border'
                            )}
                            on:click={() => changePage(page)}
                        >
                            {page}
                        </button>
                    {/if}
                {/each}
            </div>

            <button
                class="px-4 py-2 rounded bg-white border max-md:scale-75"
                on:click={() => changePage(Number(currentPage) + 1)}
                disabled={Number(currentPage) === totalPages}
            >
                <Fa icon={faChevronRight} scale={0.75} />
            </button>
        </div>
        <div class="flex gap-2 max-md:gap-1">
            <div class="flex items-center max-md:scale-75">
                <Dropdown
                    items={pageChoice}
                    bind:currentChoice={itemsPerPage}
                    outerClass="w-20 bg-opacity-50 "
                    on:change={(e) => changeItemsPerPage(e.detail)}
                />
            </div>
            <div class="flex items-center">/ page</div>
        </div>
    </div>
</div>