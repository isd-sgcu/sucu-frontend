<script lang="ts">
	import { cn } from '$lib/utils';
	import {
		faCircleArrowLeft,
		faChevronRight,
		faChevronLeft
	} from '@fortawesome/free-solid-svg-icons';
	import { typography } from '../../styles/tailwind/typography';
	import Fa from 'svelte-fa';
	import TabsRoot from '$lib/components/Tabs/TabsRoot.svelte';
	import TabsList from '$lib/components/Tabs/TabsList.svelte';
	import TabsTrigger from '$lib/components/Tabs/TabsTrigger.svelte';
	import TabsContent from '$lib/components/Tabs/TabsContent.svelte';
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';
	import pic1 from './../../lib/assets/images/picslide1.jpg';
	import pic2 from './../../lib/assets/images/picslide2.jpg';
	import pic3 from './../../lib/assets/images/picslide3.jpg';
	import pic4 from './../../lib/assets/images/picslide4.jpg';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import AnnounceList from './AnnounceList.svelte';
	import { Role } from '$lib/types/role';
	import type { Document as CustomDocument } from '$lib/types/document';
	import Pagination from '$lib/components/Pagination/Pagination.svelte';

	export let data;
	const { announcements } = data;
	let PaginationMockitem: string[] = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23',
		'24',
		'25',
		'26',
		'27',
		'28',
		'29',
		'30'
	];
	export let image = [pic1, pic2, pic3, pic4];
	let searchValue = '';
	let dropdownValue = 'All';
	let currentIndex = 0;
	let years = Array.from(
		new Set(announcements.map((doc) => new Date(doc.created_at).getFullYear()))
	)
		.sort((a, b) => b - a)
		.map(String);

	function handleLeftClick() {
		currentIndex = (currentIndex - 1) % image.length;
		if (currentIndex == -1) {
			currentIndex = image.length - 1;
		}
		scrollToImage();
	}

	function handleRightClick() {
		currentIndex = (currentIndex + 1) % image.length;
		scrollToImage();
	}

	function scrollToImage() {
		const container = document.querySelector('.image-container');
		if (container) {
			const imageWidth = container.clientWidth;
			container.scrollTo({
				left: imageWidth * currentIndex,
				behavior: 'smooth'
			});
		}
	}

	let paginatedAll: CustomDocument[] = [];
	let paginatedSGCU: CustomDocument[] = [];
	let paginatedSCCU: CustomDocument[] = [];

	let currentPages = {
		all: 1,
		sgcu: 1,
		sccu: 1
	};
	const documentsPerPage = 10;

	const filteredDocuments = (tab: 'all' | 'sgcu' | 'sccu') => {
		let filteredDocs = announcements;
		const filterRole = (authorRole: string, docRole: Role) => {
			return authorRole.split('_')[0] === docRole.split('_')[0];
		};

		if (searchValue) {
			filteredDocs = filteredDocs.filter((doc) =>
				doc.title.toLowerCase().includes(searchValue.toLowerCase())
			);
		}

		if (dropdownValue && dropdownValue !== 'All') {
			filteredDocs = filteredDocs.filter((doc) => {
				const year = new Date(doc.created_at).getFullYear().toString();
				return year === dropdownValue;
			});
		}

		switch (tab) {
			case 'sgcu':
				filteredDocs = filteredDocs.filter((doc) => filterRole(doc.author.role, Role.SGCU_ADMIN));
				break;
			case 'sccu':
				filteredDocs = filteredDocs.filter((doc) => filterRole(doc.author.role, Role.SCCU_ADMIN));
				break;
		}

		return filteredDocs;
	};

	function paginate(docs: CustomDocument[], currentPage: number, documentsPerPage: number) {
		const start = (currentPage - 1) * documentsPerPage;
		const end = currentPage * documentsPerPage;
		return docs.slice(start, end);
	}

	$: totalPages = {
		all: Math.ceil(filteredDocuments('all').length / documentsPerPage),
		sgcu: Math.ceil(filteredDocuments('sgcu').length / documentsPerPage),
		sccu: Math.ceil(filteredDocuments('sccu').length / documentsPerPage)
	};

	$: {
		paginatedAll = paginate(filteredDocuments('all'), currentPages.all, documentsPerPage);
		paginatedSGCU = paginate(filteredDocuments('sgcu'), currentPages.sgcu, documentsPerPage);
		paginatedSCCU = paginate(filteredDocuments('sccu'), currentPages.sccu, documentsPerPage);
		searchValue = searchValue;
		dropdownValue = dropdownValue;
	}

	function changePage(tab: 'all' | 'sgcu' | 'sccu', direction: 'next' | 'prev') {
		const page = currentPages[tab];
		const totalPage = totalPages[tab];

		if (direction === 'next' && page < totalPage) {
			currentPages[tab]++;
		} else if (direction === 'prev' && page > 1) {
			currentPages[tab]--;
		}
	}
</script>

<div>
	<div class="relative flex w-full h-[500px]">
		<button
			class="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointe transition-all"
			on:click={handleLeftClick}
		>
			<Fa icon={faChevronLeft} class="text-white scale-150" />
		</button>
		<div class="relative w-full h-[500px] flex overflow-hidden image-container snap-x">
			{#each image as img}
				<div class="w-full h-full flex-shrink-0 snap-center">
					<img src={img} alt="pic" class="w-full h-full object-cover" />
				</div>
			{/each}
		</div>
		<button
			class="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer transition-all"
			on:click={handleRightClick}
		>
			<Fa icon={faChevronRight} class="text-white scale-150" />
		</button>
	</div>

	<MaxWidthWrapper class="my-10 space-y-12">
		<div class="flex flex-col gap-3 items-start">
			<div class="flex items-center gap-4">
				<button on:click={() => history.back()} class="lg:relative -left-52 scale-150">
					<Fa icon={faCircleArrowLeft} size="lg" />
				</button>
				<h1 class={cn(typography({ variant: 'heading3' }), 'md:text-5xl lg:order-first')}>
					ประกาศ
				</h1>
			</div>
			<p class="text-sucu-gray lg:w-full">
				เอกสารทั้งหมดในนามสโมสรนิสิตจุฬาฯ อบจ. และสภานิสิตจุฬาฯ ซึ่งเปิดเผยให้นิสิตได้อ่านโดยทั่วกัน
			</p>
		</div>

		<SearchBar bind:value={searchValue} />

		<TabsRoot defaultActiveTab="all">
			<TabsList>
				<TabsTrigger value="all">ทั้งหมด</TabsTrigger>
				<TabsTrigger value="sgcu">อบจ.</TabsTrigger>
				<TabsTrigger value="sccu">สภานิสิต</TabsTrigger>
			</TabsList>

			<Dropdown
				items={['All', ...years]}
				bind:currentChoice={dropdownValue}
				outerClass="w-64 my-12"
			/>

			<TabsContent value="all" class="space-y-2">
				<AnnounceList
					currentPage={currentPages.all}
					changePage={(variant, direction) => changePage(variant, direction)}
					documents={paginatedAll}
					totalPages={totalPages.all}
					variantKey="all"
				/>
			</TabsContent>

			<TabsContent value="sgcu" class="space-y-2">
				<AnnounceList
					currentPage={currentPages.sgcu}
					changePage={(variant, direction) => changePage(variant, direction)}
					documents={paginatedSGCU}
					totalPages={totalPages.sgcu}
					variantKey="sgcu"
				/>
			</TabsContent>

			<TabsContent value="sccu" class="space-y-2">
				<AnnounceList
					currentPage={currentPages.sccu}
					changePage={(variant, direction) => changePage(variant, direction)}
					documents={paginatedSCCU}
					totalPages={totalPages.sccu}
					variantKey="sccu"
				/>
			</TabsContent>
		</TabsRoot>
	</MaxWidthWrapper>

	<Pagination Arrayitem={PaginationMockitem} />
</div>
