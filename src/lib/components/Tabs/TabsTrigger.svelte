<script lang="ts">
	import { onMount } from 'svelte';
	import { getTabsContext } from './tabsContext';
	import { cn } from '$lib/utils';
	import { slide } from 'svelte/transition';

	export let value: string;
	export let className: string = '';
	export { className as class };

	const tabsContext = getTabsContext();
	const { activeTab } = tabsContext;

	onMount(() => {
		tabsContext.registerTab({ value });
	});

	$: isActive = $activeTab === value;

	function handleClick() {
		tabsContext.selectTab(value);
	}
</script>

<div class={cn('relative inline-block', className)}>
	<button
		class={cn(
			'text-base mx-auto whitespace-nowrap py-4 px-1 font-medium sm:text-xl text-sucu-gray hover:text-sucu-pink-hover hover:border-gray-300',
			{
				'border-sucu-pink-hover text-indigo': isActive
			}
		)}
		on:click={handleClick}
	>
		<slot />
	</button>

	{#if isActive}
		<div
			class={cn(
				'absolute left-1/2 transform -translate-x-1/2 bottom-[5.5px] sm:-bottom-1 h-1 sm:h-2 w-[120%] bg-sucu-pink-hover rounded-lg'
			)}
			transition:slide={{ duration: 300, axis: 'x' }}
		></div>
	{/if}
</div>
