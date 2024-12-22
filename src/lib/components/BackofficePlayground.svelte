<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { createConfirmationModal } from './ConfirmationModal/ConfirmationModal';
    const modalStore = getModalStore();

    function showCustomModal() {
        const customModal = createConfirmationModal({
            title: '<div class="text-2xl font-bold sucu-gray-dark">ยืนยันการลบเอกสาร  </div>',
            body: '<div class="text-md sucu-gray">หากทำการยืนยันเอกสารที่เลือกจะถูกลบและไม่สามารถย้อนกลับได้</div>',
            confirmText: 'ยืนยัน',
            cancelText: 'ยกเลิก'
        });
        modalStore.trigger(customModal);
    }
</script>

<main class="h-screen">
    <section class="section mb-5">
        <h2 class="font-bold text-2xl mb-4">Custom Modal</h2>
        <button
            on:click={showCustomModal}
            class="px-4 py-2 bg-rose-400 text-white rounded-lg"
        >
            Open Custom Modal
        </button>
    </section>
</main>
