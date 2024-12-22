<script lang="ts">
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';
	import { cn } from '$lib/utils';
	import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { typography } from '../../../styles/tailwind/typography';
	import dayjs from 'dayjs';
	import buddhistEra from 'dayjs/plugin/buddhistEra';
	import 'dayjs/locale/th';
	import { formatDateTH } from '$lib/utils/date';
	import Button from '$lib/components/Button.svelte';
	import { modalShow } from '$lib/components/Modal/store';
	import Modal from '$lib/components/Modal/Modal.svelte';

	export let data;
	const { document } = data;

	modalShow.set(false);

	dayjs.extend(buddhistEra);
</script>

<MaxWidthWrapper class="mt-10 space-y-6 lg:space-y-12 min-h-screen">
	<div class="flex flex-col gap-3 items-start">
		<button on:click={() => history.back()} class="lg:relative -left-14 top-12">
			<Fa icon={faCircleArrowLeft} size="lg" />
		</button>
		<div class="flex items-center gap-4">
			<h1 class={cn(typography({ variant: 'heading4' }), 'md:text-5xl lg:order-first')}>
				{document?.title}
			</h1>
		</div>
		<div>
			<p>
				โดย {document?.author.first_name}
			</p>
			<p>{formatDateTH(document?.updated_at || '')}</p>
		</div>
	</div>

	<hr class="border-t border-gray-300 my-12" />

	<div class="flex flex-col gap-6 lg:gap-12">
		<p>{document?.content.repeat(8)}</p>
		<div class="w-[342px] h-[220px] lg:w-[876px] lg:h-[500px] bg-sucu-gray-light"></div>
		<Button class="w-fit mb-16" on:click={() => modalShow.set(true)}
			>ดาวน์โหลดเอกสารที่เกี่ยวข้อง</Button
		>
		{#if modalShow}
			<Modal />
		{/if}
	</div>
</MaxWidthWrapper>
