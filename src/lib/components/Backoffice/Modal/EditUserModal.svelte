<script lang="ts">
    export let open = false;
    let dialogEl: HTMLDialogElement;
    
    let firstName = '';
    let lastName = '';
    let citizenId = '';
    let password = '';
    let showPassword = false;

    function handleSubmit() {
        // TODO: Implement edit user
        open = false;
    }

    function handleClose() {
        firstName = '';
        lastName = '';
        citizenId = '';
        password = '';
        open = false;
    }

    function handleEscape(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            handleClose();
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
        class="bg-transparent p-0"
        on:close={() => open = false}
    >
        <div 
            role="presentation"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            on:click|self={handleClose}
            on:keydown|self={handleEscape}
        >
            <div class="bg-white w-full max-w-md rounded-md shadow-lg">
                <div class="p-6 space-y-6">
                    <div class="space-y-2">
                        <h3 id="modal-title" class="text-2xl font-bold text-sucu-dark-gray">แก้ไขผู้ใช้งาน</h3>
                        <p class="text-sucu-gray">สามารถแก้ไขได้ทั้งจากทางคอลเซ็นเตอร์</p>
                    </div>

                    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <!-- First Name -->
                            <div class="space-y-1">
                                <label for="firstName" class="text-sm text-gray-700">ชื่อ</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    bind:value={firstName}
                                    placeholder="หมูเด้ง"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                />
                            </div>

                            <!-- Last Name -->
                            <div class="space-y-1">
                                <label for="lastName" class="text-sm text-gray-700">นามสกุล</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    bind:value={lastName}
                                    placeholder="เด้งเด้ง"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                />
                            </div>
                        </div>

                        <!-- Student ID -->
                        <div class="space-y-1">
                            <label for="citizenId" class="text-sm text-gray-700">รหัสประจำตัวนิสิต</label>
                            <input
                                id="citizenId"
                                type="text"
                                bind:value={citizenId}
                                placeholder="6753736328"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>

                        <!-- Password -->
                        <div class="space-y-1">
                            <label for="password" class="text-sm text-gray-700">รหัสผ่าน</label>
                            <div class="relative">
                                <input
                                    id="password"
                                    type="text"
                                    bind:value={password}
                                    placeholder="1234567890"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none pr-10"
                                />
                            </div>
                        </div>

                        <div class="flex justify-end gap-4 pt-4">
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