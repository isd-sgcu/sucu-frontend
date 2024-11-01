<script lang="ts">
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';
	import { page } from '$app/stores';
	import orgDatas from '../orgData';
	import Button from '$lib/components/Button.svelte';
	import Fa from 'svelte-fa';
	import ImageView from '$lib/components/ImageView/ImageView.svelte';
	import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

	let org = $page.params.org;

	const orgData = orgDatas.find((orgData) => orgData.subPath === org);

	const titleClass = 'font-bold text-[30px] tracking-[-0.01em]';
	const textClass = 'text-2xl';
</script>

<MaxWidthWrapper>
	<button on:click={() => history.back()} class="lg:relative -left-14">
		<Fa icon={faCircleArrowLeft} size="lg" />
	</button>
	{#if orgData}
		<div class="flex flex-col gap-32 mb-32">
			<div class="flex flex-row items-center gap-16">
				<img src={orgData.src} alt={orgData.alt} class="w-52 h-52" />
				<div class="flex flex-col gap-9">
					<h2 class="font-bold text-5xl leading-[48px] tracking-[-0.01em]">{orgData.title}</h2>
					<span class="text-2xl">{orgData.desc}</span>
				</div>
			</div>

			<div class="flex flex-col gap-12">
				<span class={titleClass}>{orgData.shortName} คืออะไร ?</span>
				<span class={textClass}>{orgData.whatIs}</span>
			</div>

			<div class="flex flex-col gap-12">
				<span class={titleClass}>หน้าที่ตามระเบียบ</span>
				<span class={textClass}>{orgData.duty}</span>
			</div>

			<div class="flex flex-col gap-12">
				<span class={titleClass}>แผนผังองค์กร</span>
				<ImageView imgUrls={orgData.images} />
			</div>

			<div class="flex flex-col gap-8">
				<span class={titleClass}>ระเบียบสโมสรนิสิตจุฬาฯ</span>
				<Button variant="default" class="w-fit">คลิกเพื่ออ่านระเบียบ</Button>
			</div>
		</div>
	{:else}
		<p>Organization data not found.</p>
	{/if}
</MaxWidthWrapper>
