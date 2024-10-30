<script lang="ts">
	import { faCalendar, faChartSimple, faPencil } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import thumbnail from '../../assets/images/thumbnail.png';

	export let imageUrl = thumbnail;
	export let title = '';
	export let createAt = '';
	export let hrefUrl = '';
	export let infoType = '';
	export let organization = '';
</script>

<div
	class="flex flex-col md:flex-row bg-white rounded-sm overflow-hidden shadow-card-shadow w-full p-3"
>
	<div class="w-full md:w-[276px] h-[180px] mb-4 md:mb-0">
		<img src={imageUrl} alt={title} class="w-full h-full object-cover" />
	</div>
	<div class="px-2 md:px-7 py-2 flex flex-col justify-between w-full">
		<div>
			<p class="text-xl md:text-2xl font-medium text-sucu-gray-dark mb-2">
				{title}
			</p>
			<div class="flex items-center text-lg md:text-xl text-sucu-gray-dark mb-3 md:mb-5">
				<FontAwesomeIcon icon={faCalendar} class="mr-3" />
				<p class="font-light">{createAt}</p>
			</div>
		</div>

		<div class="flex flex-row justify-between space-x-2">
			<div class="mb-4 md:mb-0">
				<div class="flex items-center mb-2">
					<FontAwesomeIcon icon={faChartSimple} class="mr-3" />
					<p class="text-sucu-gray-dark font-light">{infoType}</p>
				</div>
				<div class="flex items-center">
					<FontAwesomeIcon icon={faPencil} class="mr-3" />
					<p class="text-sucu-gray-dark font-light">{organization}</p>
				</div>
			</div>
			<a href={hrefUrl} class="text-black text-lg md:text-xl self-center"> อ่านต่อ » </a>
		</div>
	</div>
</div>
