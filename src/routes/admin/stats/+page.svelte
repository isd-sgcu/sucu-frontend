<script lang="ts">
    import { onMount } from 'svelte';
  
    interface Document {
      id: string;
      title: string;
      content: string;
      user_id: string;
      type_id: string;
      created_at: Date;
      updated_at: Date;
      author: {
        name: string;
      };
    }
  
    // Mock data - replace with actual data
    let documents: Document[] = [
      {
        id: "DOC-09649054",
        title: "เอกสารลับจากดัมเบิลดอร์",
        content: "เนื้อหาของเอกสารลับจากดัมเบิลดอร์",
        user_id: "1",
        type_id: "ANNOUNCEMENT",
        created_at: new Date(),
        updated_at: new Date(),
        author: { name: "Admin User" }
      },
      {
        id: "DOC-09649055",
        title: "เอกสารลับจากดัมเบิลดอร์",
        content: "เนื้อหาของเอกสารลับจากดัมเบิลดอร์",
        user_id: "1",
        type_id: "ANNOUNCEMENT",
        created_at: new Date(),
        updated_at: new Date(),
        author: { name: "Admin User" }
      },
      {
        id: "DOC-09649056",
        title: "เอกสารลับจากดัมเบิลดอร์",
        content: "เนื้อหาของเอกสารลับจากดัมเบิลดอร์",
        user_id: "1",
        type_id: "ANNOUNCEMENT",
        created_at: new Date(),
        updated_at: new Date(),
        author: { name: "Admin User" }
      },
      {
        id: "DOC-09649057",
        title: "เอกสารลับจากดัมเบิลดอร์",
        content: "เนื้อหาของเอกสารลับจากดัมเบิลดอร์",
        user_id: "1",
        type_id: "ANNOUNCEMENT",
        created_at: new Date(),
        updated_at: new Date(),
        author: { name: "Admin User" }
      },
      {
        id: "DOC-09649058",
        title: "เอกสารลับจากดัมเบิลดอร์",
        content: "เนื้อหาของเอกสารลับจากดัมเบิลดอร์",
        user_id: "1",
        type_id: "ANNOUNCEMENT",
        created_at: new Date(),
        updated_at: new Date(),
        author: { name: "Admin User" }
      },
    ];
  
    let searchQuery = '';
    let selectedItems: string[] = [];
    let currentPage = 1;
    let itemsPerPage = 5;
    let activePopoverId: string | null = null;
    
    $: filteredDocuments = documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.includes(searchQuery)
    );
  
    $: pageCount = Math.ceil(filteredDocuments.length / itemsPerPage);
    
    $: paginatedDocuments = filteredDocuments.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    function toggleSelectAll() {
      if (selectedItems.length === paginatedDocuments.length) {
        selectedItems = [];
      } else {
        selectedItems = paginatedDocuments.map(doc => doc.id);
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
  
    function togglePopover(id: string) {
      activePopoverId = activePopoverId === id ? null : id;
    }
  
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.popover') && !target.closest('.more-options-button')) {
        activePopoverId = null;
      }
    }
  
    onMount(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });
  </script>
  
  <svelte:window on:click={handleClickOutside} />
  
  <div class="pl-64 min-h-screen bg-white p-8">
    <div class="mb-4 mt-5">
      <h1 class="text-2xl font-bold text-gray-800">สถิติ และ งบประมาณ</h1>
      <p class="text-sm text-gray-600">สถิติ และ งบประมาณ ทั้งหมดของฝ่าย - อบจ.</p>
    </div>
  
    <div class="mb-4 flex items-center justify-between">
      <div class="w-full max-w-sm">
        <input
          type="search"
          placeholder="ค้นหา"
          bind:value={searchQuery}
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>
      <select
        class="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        bind:value={itemsPerPage}
      >
        <option value={5}>5 รายการ</option>
        <option value={10}>10 รายการ</option>
        <option value={20}>20 รายการ</option>
      </select>
    </div>
  
    <div class="rounded-lg border">
      <div class="flex items-center border-b px-4 py-3">
        <div class="flex w-12 items-center">
          <input
            type="checkbox"
            checked={selectedItems.length === paginatedDocuments.length}
            on:change={toggleSelectAll}
            class="h-4 w-4 rounded border-gray-300"
          />
        </div>
        <div class="flex-1 font-semibold text-sm">เลือกทั้งหมด</div>
        <button
          class="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          ยกเลิก
        </button>
      </div>
  
      {#each paginatedDocuments as doc}
        <div class="flex items-center px-4 py-3 hover:bg-gray-50">
          <div class="flex w-12 items-center">
            <input
              type="checkbox"
              checked={selectedItems.includes(doc.id)}
              on:change={() => toggleSelectItem(doc.id)}
              class="h-4 w-4 rounded border-gray-300"
            />
          </div>
          <div class="flex-1">
            <div class="font-medium text-gray-900">{doc.title}</div>
            <div class="text-sm text-gray-500">
              {new Date(doc.created_at).toLocaleDateString('th-TH')} โดย {doc.author.name}
            </div>
          </div>
          <div class="relative">
            <button
              class="text-gray-500 hover:text-gray-700 more-options-button p-2"
              on:click|stopPropagation={() => togglePopover(doc.id)}
              aria-label="More options"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            {#if activePopoverId === doc.id}
              <div class="absolute right-0 mt-2 w-32 rounded-lg bg-white shadow-lg z-50 popover">
                <div class="py-1">
                  <button
                    class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    on:click={() => console.log('Edit document')}
                  >
                    แก้ไข
                  </button>
                  <button
                    class="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                    on:click={() => console.log('Delete document')}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
  
      <div class="flex items-center justify-between px-4 py-3 border-t">
        <div class="text-sm text-gray-500">
          แสดง {(currentPage - 1) * itemsPerPage + 1} ถึง {Math.min(currentPage * itemsPerPage, filteredDocuments.length)} จาก {filteredDocuments.length} รายการ
        </div>
        <div class="flex gap-1">
          <button
            class="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            on:click={() => currentPage = Math.max(1, currentPage - 1)}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </button>
          {#each Array(pageCount) as _, i}
            <button
              class="rounded-md px-3 py-2 text-sm font-medium shadow-sm {currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'}"
              on:click={() => currentPage = i + 1}
            >
              {i + 1}
            </button>
          {/each}
          <button
            class="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            on:click={() => currentPage = Math.min(pageCount, currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  </div>