<script lang="ts">  
  export let imageUrl = '/images/images.jpg';
  export let title = '';  
  export let createAt = '';
  export let hrefUrl = '';
  export let infoType = '';
  export let organization = '';
</script>

<div class={`flex flex-row bg-white rounded-xs overflow-hidden shadow-card-shadow w-[1040px] h-[200px] rounded-tl-md p-[10px]`}> 
  <div>
    <img src={imageUrl} alt={title} class="w-[276px] h-[180px]"/>
  </div>
  <div class="p-4">
    <p class="text-2xl font-[572] text-sucu-gray-dark">สถิติการเข้าประชุมของ ส.ส. ปีการศึกษา 2566</p>
    <p class="text-sucu-gray-dark text-xl">04 กรกฎาคม 2567</p>
    <p class="text-sucu-gray-dark">สถิติ</p>
    <p class="text-sucu-gray-dark">สภานิสิตฯ</p>
    <a href={hrefUrl} class="text-blue-600 hover:text-blue-800 text-sm font-medium">
      อ่านต่อ »
    </a>
  </div>
</div>