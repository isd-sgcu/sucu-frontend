<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { modalShow } from './store';
	import { onMount, onDestroy } from 'svelte';
	import { typography } from '../../../styles/tailwind/typography';
	import { faX, faFile } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	let isModalOpen = false;

	let unsubscribe: () => void;

	onMount(() => {
		unsubscribe = modalShow.subscribe((value) => {
			isModalOpen = value;
		});
	});

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});

	function closeModal() {
		modalShow.set(false);
	}

	const mockData = [
		{ id: 1, content: 'เอกสารที่เกี่ยวข้อง1.pdf' },
		{ id: 2, content: 'เอกสารที่เกี่ยวข้อง2.pdf' },
		{ id: 3, content: 'เอกสารที่เกี่ยวข้อง3.pdf' },
		{ id: 4, content: 'เอกสารที่เกี่ยวข้อง4.pdf' },
		{ id: 5, content: 'เอกสารที่เกี่ยวข้อง5.pdf' },
		{ id: 6, content: 'เอกสารที่เกี่ยวข้อง6.pdf' },
		{ id: 7, content: 'เอกสารที่เกี่ยวข้อง7.pdf' },
		{ id: 8, content: 'เอกสารที่เกี่ยวข้อง8.pdf' },
		{ id: 9, content: 'เอกสารที่เกี่ยวข้อง9.pdf' },
		{ id: 10, content: 'เอกสารที่เกี่ยวข้อง10.pdf' }
	];
</script>

{#if isModalOpen}
	<div class="fixed z-50 inset-0 bg-gray-700 bg-opacity-40 backdrop-blur-sm"></div>
	<div class="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
		<div
			class="bg-white h-[500px] max-md:h-[600px] max-md:w-[400px] w-[800px] rounded p-[36px] flex flex-col"
		>
			<div class="flex justify-between items-center">
				<div
					class={`md:${typography({ variant: 'heading2' })} max-md:${typography({ variant: 'heading4' })}`}
				>
					เอกสารที่เกี่ยวข้อง
				</div>
				<button class="hover:scale-105 transition-all" on:click={closeModal}>
					<Fa icon={faX} />
				</button>
			</div>
			<div class="h-[2px] bg-sucu-pink-03 w-full mt-5"></div>
			<div
				class="max-h-[400px] overflow-y-auto
 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 mt-5"
			>
				{#each mockData as item}
					<div class="mb-2">
						<Button variant="default" size="default"
							><div class="mr-3">
								<Fa icon={faFile} />
							</div>
							{item.content}</Button
						>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.overflow-auto {
		scrollbar-width: thin;
	}

	.overflow-auto::-webkit-scrollbar {
		width: 12px;
		border-radius: 10px;
	}

	.overflow-auto::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}

	.overflow-auto::-webkit-scrollbar-thumb {
		background-color: #888;
		border-radius: 10px;
		border: 3px solid #f1f1f1;
	}

	.overflow-auto::-webkit-scrollbar-button {
		display: none;
	}
</style>
