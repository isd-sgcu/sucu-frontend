<script lang="ts">
  import { faCalendar, faChalkboard, faPencil } from '@fortawesome/free-solid-svg-icons';
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
  class="flex flex-row bg-white rounded-md overflow-hidden shadow-card-shadow w-[1040px] h-[200px] p-2 my-4"
>
  <!-- Image Section -->
  <div class="w-[276px] h-[180px]">
    <img src={imageUrl} alt={title} class="w-full h-full object-cover" />
  </div>

  <!-- Content Section -->
  <div class="px-7 py-2 flex flex-col justify-between w-full">
    <!-- Title and Date -->
    <div>
      <p class="text-2xl font-semibold text-sucu-gray-dark mb-2">
        สถิติการเข้าประชุมของ ส.ส. ปีการศึกษา 2566
      </p>

      <div class="flex items-center text-xl text-sucu-gray-dark mb-5">
        <FontAwesomeIcon icon={faCalendar} class="mr-3" />
        <p>04 กรกฎาคม 2567</p>
      </div>
    </div>

    <!-- Additional Info -->
    <div class="flex justify-between">
      <div>
        <div class="flex items-center mb-2">
          <FontAwesomeIcon icon={faChalkboard} class="mr-3" />
          <p class="text-sucu-gray-dark">สถิติ</p>
        </div>

        <div class="flex items-center">
          <FontAwesomeIcon icon={faPencil} class="mr-3" />
          <p class="text-sucu-gray-dark">สภานิสิตฯ</p>
        </div>
      </div>

      <!-- Read More -->
      <a href={hrefUrl} class="text-black text-xl content-center">
        อ่านต่อ »
      </a>
    </div>
  </div>
</div>
