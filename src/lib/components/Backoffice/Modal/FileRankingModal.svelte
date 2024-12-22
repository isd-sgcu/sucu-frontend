<script lang="ts">
    import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    export let open = false;
    let dialogEl: HTMLDialogElement;
    
    let title = '';
    let content = '';
    let coverFiles: File[] = [];
    let contentFiles: File[] = [];
    let documentFiles: File[] = [];
    let mainCoverIndex = 0;
    let variant: 'announcement' | 'statistic' = 'announcement';
    let dragOver = {
        cover: false,
        content: false,
        document: false
    };

    let coverFileInput: HTMLInputElement;
    let documentFileInput: HTMLInputElement;

    function handleSubmit() {
        // TODO: Implement create logic
        console.log('Create announcement'); 
    }

    function handleClose() {
        title = '';
        content = '';
        coverFiles = [];
        contentFiles = [];
        documentFiles = [];
        mainCoverIndex = 0;
        open = false;
    }

    function handleFileDrop(type: 'cover' | 'content' | 'document', e: DragEvent) {
        e.preventDefault();
        dragOver[type] = false;
        const files = e.dataTransfer?.files;
        if (files) {
            if (type === 'cover') {
                coverFiles = [...coverFiles, ...Array.from(files)];
            } else if (type === 'content') {
                contentFiles = [...contentFiles, ...Array.from(files)];
            } else {
                documentFiles = [...documentFiles, ...Array.from(files)];
            }
        }
    }

    function handleFileSelect(type: 'cover' | 'document', e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files) {
            if (type === 'cover') {
                coverFiles = [...coverFiles, ...Array.from(input.files)];
            } else {
                documentFiles = [...documentFiles, ...Array.from(input.files)];
            }
        }
    }

    function removeFile(type: 'cover' | 'content' | 'document', index: number) {
        if (type === 'cover') {
            coverFiles = coverFiles.filter((_, i) => i !== index);
            if (mainCoverIndex >= coverFiles.length) {
                mainCoverIndex = 0;
            }
        } else if (type === 'content') {
            contentFiles = contentFiles.filter((_, i) => i !== index);
        } else {
            documentFiles = documentFiles.filter((_, i) => i !== index);
        }
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
        class="bg-transparent w-full max-h-[90vh] overflow-hidden"
        on:close={() => open = false}
    >
        <div 
            role="presentation"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            on:click|self={handleClose}
            on:keydown|self={(e) => e.key === 'Escape' && handleClose()}
        >
            <div class="bg-white w-full max-w-3xl rounded-md shadow-lg max-h-[85vh] flex flex-col">
                <div class="p-6 border-b">
                    <h3 class="text-2xl font-bold text-sucu-gray-dark">แก้ไขเนื้อหา</h3>
                    <p class="text-sucu-gray">หากทำการยืนยันเอกสารจะถูกแก้ไข และไม่สามารถย้อนกลับได้</p>
                </div>

                <div class="p-6 overflow-y-auto flex-1">
                    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                        <!-- Title -->
                        <div class="space-y-1">
                            <span class="text-sm text-sucu-dark-gray font-semibold">{variant === 'announcement' ? 'ชื่อประกาศ' : 'ชื่อสถิติ'}</span>
                            <input
                                type="text"
                                bind:value={title}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </div>

                        <!-- Content -->
                        <div class="space-y-1">
                            <span class="text-sm text-sucu-dark-gray font-semibold">เนื้อหา</span>
                            <textarea
                                bind:value={content}
                                rows="4"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>

                        <!-- Cover Images Section -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <span class="text-xl text-sucu-dark-gray font-semibold">{variant === 'announcement' ? 'เพิ่มรูปภาพของหน้าประกาศ' : 'เพิ่มรูปปกหน้าสถิติและงบประมาณ'}</span>
                                <input
                                    type="file"
                                    bind:this={coverFileInput}
                                    accept="image/jpeg,image/png"
                                    class="hidden"
                                    multiple
                                    on:change={(e) => handleFileSelect('cover', e)}
                                />
                                <div 
                                    role="presentation"
                                    class="mt-1 border-2 border-dashed rounded-md p-6 text-center transition-colors cursor-pointer"
                                    class:border-blue-500={dragOver.cover}
                                    class:border-gray-300={!dragOver.cover}
                                    on:dragenter|preventDefault={() => dragOver.cover = true}
                                    on:dragleave|preventDefault={() => dragOver.cover = false}
                                    on:dragover|preventDefault
                                    on:drop|preventDefault={(e) => handleFileDrop('cover', e)}
                                    on:click={() => coverFileInput.click()}
                                >
                                    <Fa icon={faCloudArrowUp} class="mx-auto h-12 w-12 text-gray-400" />
                                    <p class="mt-1 text-sm text-gray-600">Click or drag file to this area to upload</p>
                                    <p class="mt-1 text-xs text-gray-500">ประเภทไฟล์ที่รองรับ: .jpg .jpeg and .png</p>
                                </div>
                            </div>
                            <div class="space-y-2 max-h-40 overflow-y-auto">
                                {#each coverFiles as file, i}
                                    <div class="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                        <div class="flex items-center gap-2">
                                            <span class="flex items-center gap-2">
                                                <span class="text-sm font-medium text-gray-600">{i + 1}</span>
                                                <span class="text-sm text-gray-600">{file.name}</span>
                                            </span>
                                            {#if i === mainCoverIndex}
                                                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Main</span>
                                            {/if}
                                        </div>
                                        <button 
                                            type="button"
                                            class="text-gray-400 hover:text-gray-600"
                                            on:click={() => removeFile('cover', i)}
                                        >
                                            <Fa icon={faXmark} class="w-5 h-5" />
                                        </button>
                                    </div>
                                {/each}
                            </div>
                        </div>
                        <!-- Image Ranking Section -->
                        <div class="bg-sucu-pink-04 p-4">
                            <div class="space-y-2 flex flex-col">
                                <span class="text-md text-sucu-dark-gray font-semibold">เลือกรูปที่จะถูกตั้งเป็นรูปแรก</span>
                                <span class="text-sm text-sucu-gray">ลำดับของรูปภาพจะถูกเรียงตามเวลาที่อัปโหลด สามารถเลือกรูปภาพตามลำดับที่เพื่อตั้งให้อยู่เป็นอันดับแรก</span>
                                <select 
                                    bind:value={mainCoverIndex}
                                    class="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                >
                                    {#each coverFiles as _, i}
                                        <option value={i}>รูปที่ {i + 1}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>

                        <!-- Documents Section -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <span class="text-sm text-sucu-dark-gray font-semibold text-xl">{variant === 'announcement' ? 'เพิ่มเอกสารในหน้าประกาศ' : 'เพิ่มเอกสารในหน้าสถิติและงบประมาณ'}</span>
                                <input
                                    type="file"
                                    bind:this={documentFileInput}
                                    accept=".pdf,.doc,.docx"
                                    class="hidden"
                                    multiple
                                    on:change={(e) => handleFileSelect('document', e)}
                                />
                                <div 
                                    role="presentation"
                                    class="mt-1 border-2 border-dashed rounded-md p-6 text-center transition-colors cursor-pointer"
                                    class:border-blue-500={dragOver.document}
                                    class:border-gray-300={!dragOver.document}
                                    on:dragenter|preventDefault={() => dragOver.document = true}
                                    on:dragleave|preventDefault={() => dragOver.document = false}
                                    on:dragover|preventDefault
                                    on:drop|preventDefault={(e) => handleFileDrop('document', e)}
                                    on:click={() => documentFileInput.click()}
                                >
                                    <Fa icon={faCloudArrowUp} class="mx-auto h-12 w-12 text-gray-400" />
                                    <p class="mt-1 text-sm text-gray-600">Click or drag file to this area to upload</p>
                                    <p class="mt-1 text-xs text-gray-500">ประเภทไฟล์ที่รองรับ: .pdf .doc .docx</p>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <div class="space-y-2 max-h-40 overflow-y-auto">
                                    {#each documentFiles as file, i}
                                        <div class="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                            <span class="text-sm text-gray-600">{file.name}</span>
                                            <button 
                                                type="button"
                                                class="text-gray-400 hover:text-gray-600"
                                                on:click={() => removeFile('document', i)}
                                            >
                                                <Fa icon={faXmark} class="w-5 h-5" />
                                            </button>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Footer -->
                <div class="p-6 border-t">
                    <div class="flex justify-end gap-4">
                        <button 
                            type="button" 
                            class="px-4 py-2 text-sucu-gray-dark font-semibold bg-white rounded-sm border border-sucu-pink-01 hover:bg-red-500 hover:text-white transition-colors duration-300"
                            on:click={handleClose}
                        >
                            ยกเลิก
                        </button>
                        <button 
                            type="submit" 
                            class="px-4 py-2 text-white font-semibold bg-sucu-pink-01 rounded-sm"
                            disabled={!title}
                            on:click={handleSubmit}
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
    dialog {
        max-height: 100vh;
        max-width: 100vw;
    }
    
    dialog::backdrop {
        display: none;
    }
</style> 