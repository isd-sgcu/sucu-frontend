<script lang="ts">
    export let isOpen = false;
    export let title: string;
    export let body: string;
    export let confirmText = 'ยืนยัน';
    export let cancelText = 'ยกเลิก';
    export let onConfirm: () => void = () => {};
    export let onCancel: () => void = () => {};

    let dialogEl: HTMLDialogElement;

    function handleConfirm() {
        onConfirm();
        isOpen = false;
    }

    function handleCancel() {
        onCancel();
        isOpen = false;
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
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            on:click|self={handleCancel}
            on:keydown|self={(e) => e.key === 'Escape' && handleCancel()}
        >
            <div class="bg-white w-full max-w-md rounded-md shadow-lg p-8">
                <div class="space-y-6">
                    <div class="space-y-2">
                        <h3 class="text-2xl font-bold text-sucu-gray-dark">{title}</h3>
                        <p class="text-sucu-gray">{body}</p>
                    </div>
                    
                    <div class="flex justify-end gap-4">
                        <button 
                            type="button" 
                            class="px-4 py-2 text-sucu-gray-dark font-semibold bg-white rounded-sm border border-sucu-pink-01"
                            on:click={handleConfirm}
                        >
                            {confirmText}
                        </button>
                        <button 
                            type="button" 
                            class="px-4 py-2 text-white font-semibold bg-sucu-pink-01 rounded-sm"
                            on:click={handleCancel}
                        >
                            {cancelText}
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

