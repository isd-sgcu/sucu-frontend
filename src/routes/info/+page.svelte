<script lang="ts">
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';
	import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Button from '$lib/components/Button.svelte';
	import { cn } from '$lib/utils';
	import orgDatas from './orgData';
	import { goto } from '$app/navigation';

	const pushPath = (path: string) => {
		goto(`/info/${path}`);
	};

</script>

<MaxWidthWrapper class="flex flex-col flex-grow min-h-screen">
	<button on:click={() => history.back()} class="lg:relative -left-14">
		<Fa icon={faCircleArrowLeft} size="lg" />
	</button>
	<div class="flex flex-col items-center gap-52 mb-32">
		{#each orgDatas as org, index}
			<div class={cn('flex flex-row items-center gap-16', index % 2 == 1 && 'flex-row-reverse')}>
				<img src={org.src} alt={org.alt} class="w-52 h-52" />
				<div class="flex flex-col gap-9">
					<span class="font-bold text-5xl leading-[48px] tracking-[-0.01em]">{org.title}</span>
					<span class="text-xl">{org.desc}</span>
					<Button class={cn("w-64 h-14 font-semibold text-2xl text-black", org.buttonColor)} on:click={() => pushPath(org.subPath)}>{org.buttonText}</Button>
				</div>
			</div>
		{/each}
	</div>
</MaxWidthWrapper>
