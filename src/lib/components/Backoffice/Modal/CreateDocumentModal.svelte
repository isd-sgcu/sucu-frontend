<script lang="ts">
    import { faCloudArrowUp, faFile, faXmark } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    
    export let isOpen = false;
    let dialogEl: HTMLDialogElement;
    
    let documentName = '';
    let selectedFile: File | null = null;
    let dragOver = false;
    let fileInputRef: HTMLInputElement;

    function handleSubmit() {
        // TODO: Implement API call to create document
        if (documentName && selectedFile) {
            handleClose();
        }
    }

    function handleClose() {
        documentName = '';
        selectedFile = null;
        dragOver = false;
        isOpen = false;
    }

    function handleFileDrop(e: DragEvent) {
        e.preventDefault();
        dragOver = false;
        const file = e.dataTransfer?.files[0];
        if (file && file.type.startsWith('image/')) {
            selectedFile = file;
        }
    }

    function handleFileSelect(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files?.[0]) {
            selectedFile = input.files[0];
        }
    }

    function openFileInput() {
        fileInputRef?.click();
    }

    $: if (isOpen && dialogEl) {
        dialogEl.showModal();
    } else if (dialogEl) {
        dialogEl.close();
    }
</script>

{#if isOpen}
    <dialog 
        bind:this={dialogEl}
        class="bg-transparent p-0"
        on:close={() => isOpen = false}
    >
        <div 
            role="presentation"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            on:click|self={handleClose}
            on:keydown|self={(e) => e.key === 'Escape' && handleClose()}
        >
            <div class="bg-white w-full max-w-md rounded-md shadow-lg">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-sucu-gray-dark mb-2">สร้างเอกสาร</h3>
                    <p class="text-sucu-gray mb-6">หากทำการยืนยันเอกสารจะถูกสร้าง และสามารถแก้ไขภายหลังได้</p>
                    
                    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                        <div class="space-y-1">
                            <span class="text-sm text-sucu-gray-dark">ชื่อเอกสาร</span>
                            <input
                                type="text"
                                bind:value={documentName}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </div>

                        <!-- File Drop Zone -->
                        <div 
                            role="presentation"
                            class="border-2 border-dashed rounded-md p-6 text-center transition-colors cursor-pointer"
                            class:border-blue-500={dragOver}
                            class:border-gray-300={!dragOver}
                            on:dragenter|preventDefault={() => dragOver = true}
                            on:dragleave|preventDefault={() => dragOver = false}
                            on:dragover|preventDefault
                            on:drop|preventDefault={handleFileDrop}
                            on:click={openFileInput}
                        >
                            <input
                                type="file"
                                bind:this={fileInputRef}
                                id="fileInput"
                                accept="image/*"
                                class="hidden"
                                on:change={handleFileSelect}
                            />
                            <span>
                                <Fa 
                                    icon={faCloudArrowUp}
                                    class="mx-auto h-12 w-12 text-sucu-gray"
                                />
                                <p class="mt-1 text-sm text-sucu-gray-dark">Click or drag file to this area to upload</p>
                                <p class="mt-1 text-xs text-sucu-gray">ประเภทไฟล์ที่รองรับ: .jpg .jpeg and .png</p>
                            </span>
                        </div>

                        <!-- Selected File Display -->
                        {#if selectedFile}
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div class="flex items-center gap-3">
                                    <Fa icon={faFile} class="w-6 h-6 text-sucu-gray" />
                                    <span class="text-sm text-sucu-gray-dark">{selectedFile.name}</span>
                                </div>
                                <button 
                                    type="button"
                                    class="text-sucu-gray hover:text-sucu-gray-dark"
                                    on:click={() => selectedFile = null}
                                >
                                    <Fa icon={faXmark} class="w-5 h-5" />
                                </button>
                            </div>
                        {/if}
                        
                        <div class="flex justify-end gap-4 pt-4">
                            <button type="button" class="px-4 py-2 text-sucu-gray-dark font-semibold bg-white rounded-sm border border-sucu-pink-01 hover:bg-red-500 hover:text-white transition-colors duration-300" on:click={handleClose}>
                                ยกเลิก
                            </button>
                            <button 
                                type="submit" 
                                class="px-4 py-2 text-white font-semibold bg-sucu-pink-01 rounded-sm"
                                disabled={!documentName || !selectedFile}
                            >
                                ยืนยัน
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>
{/if}

<style>
    dialog::backdrop {
        display: none;
    }
</style> 