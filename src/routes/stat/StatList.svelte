<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import StatisticCard from '$lib/components/StatisticCard/StatisticCard.svelte';
	import type { Document } from '$lib/types';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let documents: Document[] = [];
	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let changePage: (variant: 'all' | 'sgcu' | 'sccu', direction: 'next' | 'prev') => void;
	export let variantKey: 'all' | 'sgcu' | 'sccu' = 'all';
</script>

{#if documents.length === 0}
	<p>No documents available.</p>
{:else}
	{#each documents as document}
		<StatisticCard
			title={document.title}
			createAt={document.created_at}
			infoType={document.type_id}
			organization={document.author.role}
			hrefUrl={`/stat/${document.id}`}
		/>
	{/each}
{/if}

<div class="flex items-center justify-end gap-2 mt-4">
	<Button
		variant="outline"
		size="sm"
		on:click={() => changePage(variantKey, 'prev')}
		disabled={currentPage === 1}
	>
		<Fa icon={faChevronLeft} />
	</Button>
	<Button
		variant="outline"
		size="sm"
		on:click={() => changePage(variantKey, 'next')}
		disabled={currentPage === totalPages}
	>
		<Fa icon={faChevronRight} />
	</Button>
</div>
