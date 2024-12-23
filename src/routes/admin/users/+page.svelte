<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let title: string = "จัดการผู้ใช้งาน";
    export let subtitle: string = "ผู้ใช้งานที่มีสิทธิ์เข้าถึงการแก้ไขและเปลี่ยนแปลงเอกสารทั้งหมด";
    
    const dispatch = createEventDispatcher();
    
    let searchQuery = "";
    let selectedFilter = "";
    
    const filters = [
      { id: 'นายกสโมสร', label: 'นายกสโมสร +' },
      { id: 'อุปนายกคนที่1', label: 'อุปนายกคนที่ 1 ×' },
      { id: 'อุปนายกคนที่2', label: 'อุปนายกคนที่ 2 +' },
      { id: 'เลขานุการ', label: 'เลขานุการ +' },
      { id: 'เหรัญญิก', label: 'เหรัญญิก +' },
      { id: 'ผู้ช่วยเลขานุการ', label: 'ผู้ช่วยเลขานุการ +' },
      { id: 'ฝ่ายประชา-วิชาธรรม', label: 'ฝ่ายประชา-วิชาธรรม +' }
    ];
  
    const users = [
      { id: '6753736328', title: 'นางสาวภูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
      { id: '6753736328', title: 'นางสาวภูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
      { id: '6753736328', title: 'นางสาวภูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
      { id: '6753736328', title: 'นางสาวภูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' },
      { id: '6753736328', title: 'นางสาวภูเต็ง เต็งเต็งเต็ง', date: '01/11/2024', role: 'Admin' }
    ];
  
    let selectedItems: string[] = [];
    let itemsPerPage = 5;
    let currentPage = 1;
  
    function toggleSelectAll(event: Event) {
      const checkbox = event.target as HTMLInputElement;
      if (checkbox.checked) {
        selectedItems = users.map(user => user.id);
      } else {
        selectedItems = [];
      }
    }
  
    function toggleSelectItem(id: string) {
      const index = selectedItems.indexOf(id);
      if (index === -1) {
        selectedItems = [...selectedItems, id];
      } else {
        selectedItems = selectedItems.filter(item => item !== id);
      }
    }
  </script>
  
  <div class="ml-64 min-h-screen bg-white p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">{title}</h1>
      <p class="text-sm text-gray-600">{subtitle}</p>
    </div>
  
    <div class="mb-6">
      <div class="relative">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="ค้นหา"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10"
        />
        <svg
          class="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  
    <div class="mb-6 flex flex-wrap gap-2">
      {#each filters as filter}
        <button
          class="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700 hover:bg-gray-200"
        >
          {filter.label}
        </button>
      {/each}
    </div>
  
    <div class="mb-4 flex items-center justify-between">
      <select
        bind:value={selectedFilter}
        class="rounded-lg border border-gray-300 px-4 py-2"
      >
        <option value="">Select Item</option>
      </select>
  
      <button
        class="rounded-lg bg-pink-500 px-6 py-2 text-white hover:bg-pink-600"
      >
        เพิ่มผู้ใช้งาน
      </button>
    </div>
  
    <div class="rounded-lg border border-gray-200">
      <table class="w-full">
        <thead>
          <tr class="border-b bg-gray-50">
            <th class="p-4 text-left">
              <input
                type="checkbox"
                on:change={toggleSelectAll}
                checked={selectedItems.length === users.length}
                class="rounded border-gray-300"
              />
            </th>
            <th class="p-4 text-left font-medium text-gray-600">เลือกทั้งหมด</th>
            <th class="p-4 text-left font-medium text-gray-600">รหัส</th>
            <th class="p-4 text-left font-medium text-gray-600">สร้างเมื่อ</th>
            <th class="p-4 text-left font-medium text-gray-600">สถานะ</th>
            <th class="p-4 text-left font-medium text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
            <tr class="border-b">
              <td class="p-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(user.id)}
                  on:change={() => toggleSelectItem(user.id)}
                  class="rounded border-gray-300"
                />
              </td>
              <td class="p-4">{user.title}</td>
              <td class="p-4">{user.id}</td>
              <td class="p-4">{user.date}</td>
              <td class="p-4">
                <span class="rounded-full bg-pink-100 px-3 py-1 text-sm text-pink-800">
                  {user.role}
                </span>
              </td>
              <td class="p-4">
                <button class="text-gray-500 hover:text-gray-700">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  
    <div class="mt-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button class="rounded-lg border px-3 py-1 text-gray-600 hover:bg-gray-50">«</button>
        <button class="rounded-lg border px-3 py-1 text-gray-600 hover:bg-gray-50">‹</button>
        <button class="rounded-lg border bg-pink-500 px-3 py-1 text-white">1</button>
        <button class="rounded-lg border px-3 py-1 text-gray-600 hover:bg-gray-50">2</button>
        <button class="rounded-lg border px-3 py-1 text-gray-600 hover:bg-gray-50">3</button>
        <span class="text-gray-600">...</span>
        <button class="rounded-lg border px-3 py-1 text-gray-600 hover:bg-gray-50">10</button>
        <button class="rounded-lg border px-3 py-1 text-gray-600 hover:bg-gray-50">›</button>
        <button class="rounded-lg border px-3 py-1 text-gray-600 hover:bg-gray-50">»</button>
      </div>
  
      <div class="flex items-center gap-2">
        <select
          bind:value={itemsPerPage}
          class="rounded-lg border border-gray-300 px-3 py-1"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span class="text-gray-600">/ page</span>
      </div>
    </div>
  </div>