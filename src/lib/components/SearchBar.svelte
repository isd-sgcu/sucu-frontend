<script lang="ts">
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let value: string = '';
	let inputRef: HTMLInputElement;

	function handleClickIcon() {
		inputRef.focus();
	}
</script>

<div class="search-bar">
	<button on:click={handleClickIcon} type="button">
		<Fa icon={faSearch} class="w-5 h-5" />
	</button>

	<input
		type="text"
		class="w-full text-black focus:border-none focus:outline-none"
		placeholder="ค้นหา"
		bind:value
		bind:this={inputRef}
	/>
</div>

<style>
	.search-bar {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border-radius: 0.125rem;
		border: 1px solid var(--sucu-gray-light);
	}

	.search-bar:focus-within {
		border-color: var(--sucu-pink-03);
	}
</style>
