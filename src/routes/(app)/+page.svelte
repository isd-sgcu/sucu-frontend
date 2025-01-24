<script lang="ts">
	import { typography } from '../../styles/tailwind/typography';
	import { cn } from '../../lib/utils/cn';
	import Button from '../../lib/components/Button.svelte';
	import sucuHomeBanner1 from '../../lib/assets/images/sucuHomeBanner1.webp';
	import sucuHomeBanner2 from '../../lib/assets/images/sucuHomeBanner2.png';
	import sucuHomeBanner3 from '../../lib/assets/images/sucuHomeBanner3.png';
	import AnnouncementCard from '$lib/components/AnnouncementCard/AnnouncementCard.svelte';
	import OrganizationCard from '$lib/components/OrganizationCard/OrganizationCard.svelte';
	import { mockAnnouncementCard } from '$lib/mock/annoucementCardData';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let container: HTMLDivElement;
	let activeSlide = 0;

	function handleScroll() {
		const scrollLeft = container.scrollLeft;
		const cardWidth = 140;
		const cardCount = mockAnnouncementCard.length;
		const cardGap = 2.5;
		const threshold = (cardWidth + cardGap) / 3;
		const currentCardIndex = Math.floor((scrollLeft + threshold) / (cardWidth + cardGap));

		activeSlide = Math.min(currentCardIndex, cardCount - 1);
	}

	onMount(() => {
		container.addEventListener('scroll', handleScroll);
	});
</script>

<div>
	<div
		class="w-full h-[500px] max-md:h-[246px] flex items-center justify-center text-center bg-cover bg-center"
		style="background-image: url({sucuHomeBanner1});"
	>
		<div class="w-[650px] h-[263px] max-md:h-[160px] flex flex-col items-center justify-center">
			<div
				class="w-full h-[192px] max-md:h-[120px] p-2.5 flex flex-col gap-2.5 max-md:gap-1 text-sucu-gray-dark"
			>
				<div
					class={cn(
						typography({ variant: 'heading1' }),
						'tracking-tight leading-none',
						'max-md:text-2xl max-md:font-semibold'
					)}
				>
					สโมสรนิสิต
				</div>
				<div
					class={cn(
						typography({ variant: 'heading1' }),
						'tracking-tight leading-none',
						'max-md:text-2xl max-md:font-semibold'
					)}
				>
					จุฬาลงกรณ์มหาวิทยาลัย
				</div>
				<div
					class={cn(
						typography({ variant: 'body-large' }),
						'font-semibold leading-6',
						'max-md:text-xs max-md:leading-3 '
					)}
				>
					Student Union, Chulalongkorn University
				</div>
			</div>
			<Button
				color="white"
				size="sm"
				class={cn(
					typography({ variant: 'body-medium' }),
					'font-semibold px-9 py-2 leading-5',
					'max-md:text-xs max-md:leading-3 max-md:px-3 max-md:py-1.5 mt-5'
				)}
				on:click={() => goto(`/info`)}
			>
				รู้จักกับสโมสรนิติฯ
			</Button>
		</div>
	</div>

	<div
		class="flex w-full h-[642px] py-[72px] px-[120px] gap-12 items-center text-sucu-gray-dark bg-white max-md:hidden"
	>
		<div
			class="flex flex-col w-[297px] h-[208px] min-w-[297px] min-h-[208px] justify-between text-end"
		>
			<div class={cn(typography({ variant: 'heading1' }), 'tracking-tight leading-none')}>
				ประกาศ
			</div>
			<div class={cn(typography({ variant: 'body-medium' }), 'tracking-tight leading-7')}>
				ประกาศล่าสุดของสโมสรนิสิตจุฬาฯ อบจ. และสภานิสิตจุฬาฯ
			</div>
			<div class="flex justify-end">
				<Button
					size="sm"
					class={cn(
						typography({ variant: 'body-medium' }),
						'font-semibold px-9 py-2 leading-5 bg-sucu-pink-01 hover:bg-sucu-pink-02',
						'max-md:text-xs max-md:leading-3 max-md:px-3 max-md:py-1.5'
					)}
				>
					ดูประกาศเพิ่มเติม
				</Button>
			</div>
		</div>
		<div
			class="flex overflow-auto p-6 gap-6 scrollbar-thin scrollbar-thumb-sucu-gray-light scrollbar-track-white"
		>
			{#each mockAnnouncementCard as card}
				<AnnouncementCard
					imageURL={card.imageURL}
					title={card.title}
					createdAt={card.createdAt}
					createdBy={card.createdBy}
					linkHref={card.linkHref}
				/>
			{/each}
		</div>
	</div>
	<div class="flex flex-col h-[483px] p-[26px] gap-4 text-sucu-gray-dark bg-white md:hidden">
		<div class="flex flex-col h-[76px] gap-3">
			<div class={cn(typography({ variant: 'heading2' }), 'tracking-tight leading-none')}>
				ประกาศ
			</div>
			<div class={cn(typography({ variant: 'body-normal' }), 'tracking-tight leading-none')}>
				ประกาศล่าสุดของสโมสรนิสิตจุฬาฯ อบจ. และสภานิสิตจุฬาฯ
			</div>
		</div>
		<div
			bind:this={container}
			class="flex h-[257px] px-2.5 gap-2.5 overflow-x-auto items-center scrollbar-none"
		>
			{#each mockAnnouncementCard as card}
				<AnnouncementCard
					imageURL={card.imageURL}
					title={card.title}
					createdAt={card.createdAt}
					createdBy={card.createdBy}
					linkHref={card.linkHref}
				/>
			{/each}
		</div>
		<div class="flex justify-center gap-2">
			{#each mockAnnouncementCard as _, index}
				<div
					class={`w-[5px] h-[5px] rounded-full ${index === activeSlide ? 'bg-sucu-gray-dark' : 'bg-sucu-gray'}`}
				></div>
			{/each}
		</div>
		<div class="flex justify-center">
			<Button
				size="sm"
				class={cn(
					typography({ variant: 'body-normal' }),
					'font-semibold px-3 py-1.5 leading-6 bg-sucu-pink-01 hover:bg-sucu-pink-02'
				)}
			>
				ดูประกาศทั้งหมด
			</Button>
		</div>
	</div>

	<img src={sucuHomeBanner2} alt="banner" class="w-full h-auto bg-cover max-md:hidden" />
	<img src={sucuHomeBanner3} alt="banner" class="w-full h-auto bg-cover md:hidden" />

	<div class="flex flex-col w-full h-auto items-center justify-center text-sucu-gray-dark relative">
		<div
			class="w-full h-[180px] bg-[#FFF7F6] max-md:h-[98px] 2xl:h-[160px] max-2xl:h-[130px] max-lg:h-[100px]"
		></div>
		<div
			class="w-full h-[105px] max-md:h-[98px] max-2xl:h-[90px] max-lg:h-[65px] bg-sucu-pink-05"
		></div>
		<div
			class="w-full h-[105px] max-md:h-[98px] max-2xl:h-[90px] max-lg:h-[65px] bg-sucu-pink-04"
		></div>
		<div
			class="w-full h-[105px] max-md:h-[98px] max-2xl:h-[90px] max-lg:h-[65px] bg-sucu-pink-03"
		></div>
		<div
			class="w-full h-[105px] max-md:h-[98px] max-2xl:h-[90px] max-lg:h-[65px] bg-sucu-pink-02"
		></div>
		<div
			class="w-full h-[105px] max-md:h-[98px] max-2xl:h-[90px] max-lg:h-[65px] bg-sucu-pink-01"
		></div>

		<div
			class="absolute z-10 flex flex-col justify-between h-full w-full gap-[32px] py-[72px] 2xl:py-20 xl:py-14 lg:py-[72px] md:py-12"
		>
			<div
				class={cn(
					typography({ variant: 'heading1' }),
					'tracking-tight leading-none font-bold text-center',
					'max-md:text-3xl'
				)}
			>
				3 องค์กรหลักในจุฬาฯ
			</div>
			<div class="mt-auto">
				<OrganizationCard />
			</div>
		</div>
	</div>
</div>
