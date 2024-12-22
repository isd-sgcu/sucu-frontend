<script lang="ts">
    import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    export let open = false;
    let dialogEl: HTMLDialogElement;
  
    let title = '';
    let content = '';
    let coverFile: FileList;
    let imageFiles: FileList;
    let documentFiles: FileList;
  
    function handleSubmit() {
        // TODO: Implement create statistic
        open = false;
    }
  
    function handleClose() {
        title = '';
        content = '';
        open = false;
    }
    
    $: if (open && dialogEl) {
        dialogEl.showModal();
    } else if (dialogEl) {
        dialogEl.close();
    }
</script>

{#if open}
    <dialog 
        bind:this={dialogEl}
        class="bg-transparent p-0"
        on:close={() => open = false}
    >
        <div 
            role="presentation"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            on:click|self={handleClose}
            on:keydown|self={(e) => e.key === 'Escape' && handleClose()}
        >
            <div class="bg-white w-full max-w-3xl rounded-md shadow-lg overflow-y-auto max-h-[90vh]">
                <div class="p-6 space-y-6">
                    <div class="space-y-2">
                        <h3 class="text-2xl font-bold text-sucu-dark-gray">สร้างเอกสารสถิติ และงบประมาณ</h3>
                        <p class="text-sucu-gray">ทุกท่านสามารถเพิ่มเอกสารสถิติขึ้นมา และสามารถแก้ไขภายหลังได้</p>
                    </div>

                    <form on:submit|preventDefault={handleSubmit} class="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                        <div class="space-y-2">
                            <span class="text-sucu-dark-gray">ชื่อประกาศ</span>
                            <input
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                type="text"
                                bind:value={title}
                                placeholder="ระบุชื่อประกาศ"
                                required
                            />
                        </div>

                        <div class="space-y-2">
                            <span class="text-gray-700">เนื้อหา</span>
                            <textarea
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                bind:value={content}
                                placeholder="ระบุเนื้อหา"
                                rows="4"
                            />
                        </div>

                        <div class="space-y-4">
                            <div class="space-y-2">
                                <span class="text-gray-700">เพิ่มรูปปกของหน้าสถิติ และงบประมาณ</span>
                                <div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-sucu-pink-01 transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        id="coverFile"
                                        bind:files={coverFile}
                                    />
                                    <label for="coverFile" class="cursor-pointer">
                                        <Fa 
                                            icon={faCloudArrowUp} 
                                            class="mx-auto h-12 w-12 text-gray-400"
                                        />
                                        <p class="mt-1 text-sm text-gray-600">Click or drag file to upload</p>
                                        <p class="mt-1 text-xs text-gray-500">ประเภทไฟล์ที่รองรับ: .jpg .jpeg and .png</p>
                                    </label>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <span class="text-gray-700">เพิ่มรูปปกของหน้าสถิติ และงบประมาณ</span>
                                <div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-sucu-pink-01 transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        id="coverFile"
                                        bind:files={coverFile}
                                    />
                                    <label for="coverFile" class="cursor-pointer">
                                        <Fa 
                                            icon={faCloudArrowUp} 
                                            class="mx-auto h-12 w-12 text-gray-400"
                                        />
                                        <p class="mt-1 text-sm text-gray-600">Click or drag file to upload</p>
                                        <p class="mt-1 text-xs text-gray-500">ประเภทไฟล์ที่รองรับ: .jpg .jpeg and .png</p>
                                    </label>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <span class="text-gray-700">เพิ่มรูปปกของหน้าสถิติ และงบประมาณ</span>
                                <div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-sucu-pink-01 transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        id="coverFile"
                                        bind:files={coverFile}
                                    />
                                    <label for="coverFile" class="cursor-pointer">
                                        <Fa 
                                            icon={faCloudArrowUp} 
                                            class="mx-auto h-12 w-12 text-gray-400"
                                        />
                                        <p class="mt-1 text-sm text-gray-600">Click or drag file to upload</p>
                                        <p class="mt-1 text-xs text-gray-500">ประเภทไฟล์ที่รองรับ: .jpg .jpeg and .png</p>
                                    </label>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                    <div class="flex justify-end gap-4">
                        <button 
                            type="button" 
                            class="px-4 py-2 text-sucu-dark-gray bg-white rounded-sm border border-sucu-pink-01 font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300"
                            on:click={handleClose}
                        >
                            ยกเลิก
                        </button>
                        <button 
                            type="submit" 
                            class="px-4 py-2 text-white bg-sucu-pink-01 rounded-sm font-semibold"
                        >
                            ยืนยัน
                        </button>
                    </div>
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
