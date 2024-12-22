<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';

	export let imgUrls: string[] | undefined;

	let currentImgIndex = 0;
	let imgRefs: HTMLImageElement[] = new Array(imgUrls ? imgUrls.length : 0);

	const handleClickLeft = () => {
		if (imgUrls) {
			currentImgIndex = (currentImgIndex - 1 + imgUrls.length) % imgUrls.length;
		}
	};
	const handleClickRight = () => {
		if (imgUrls) {
			currentImgIndex = (currentImgIndex + 1 + imgUrls.length) % imgUrls.length;
		}
	};

	// If currentImgIndex is changed, scroll to that image
	$: {
		if (imgRefs[currentImgIndex]) {
			imgRefs[currentImgIndex].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
		}
	}

	// Mark the visible image index to visibleImgIndex
	let observer: IntersectionObserver;
	let visibleImgIndex = 0;
	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = imgRefs.indexOf(entry.target as HTMLImageElement);
						if (index !== -1) {
							visibleImgIndex = index;
						}
					}
				});
			},
			{
				root: null,
				threshold: 0.5
			}
		);

		imgRefs.forEach((img) => {
			if (img) observer.observe(img);
		});

		return () => {
			observer.disconnect();
		};
	});

	// When scroll end, set currentImgIndex to visibleImgIndex if it was scrolled
	const handleScrollEnd = () => {
		currentImgIndex = visibleImgIndex;
	};
</script>

{#if imgUrls && imgUrls.length >= 0}
	<div class="relative w-full">
		<div
			class="flex flex-row overflow-auto w-full aspect-video snap-x snap-mandatory"
			on:scrollend={handleScrollEnd}
			role="presentation"
		>
			{#each imgUrls as imgUrl, index}
				<img
					bind:this={imgRefs[index]}
					src={imgUrl}
					alt="img"
					class="w-full aspect-video object-cover object-center snap-center"
				/>
			{/each}
		</div>

		<button on:click={handleClickLeft} class="absolute left-4 top-1/2 transform -translate-y-1/2">
			<Fa icon={faChevronLeft} class="!w-8 !h-8 text-white opacity-70" />
		</button>

		<button on:click={handleClickRight} class="absolute right-4 top-1/2 transform -translate-y-1/2">
			<Fa icon={faChevronRight} class="!w-8 !h-8 text-white opacity-70" />
		</button>

		<div class="absolute bottom-4 left-1/2 transfrom -translate-x-1/2 flex flex-row gap-2">
			{#each imgUrls as _, index}
				<div
					class={cn(
						'w-2 h-2 rounded-full bg-white',
						index === currentImgIndex ? 'opacity-70' : 'opacity-30'
					)}
				></div>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex flex-col items-center justify-center w-full aspect-video bg-sucu-gray-light">
		<span class="text-2xl mt-4">ไม่พบรูปภาพ</span>
	</div>
{/if}

<style>
	.overflow-auto {
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}

	.overflow-auto::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
</style>
