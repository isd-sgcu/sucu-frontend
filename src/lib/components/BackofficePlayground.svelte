<script lang="ts">
    import CreateStatisticModal from './Backoffice/CreateStatisticModal.svelte';
    import EditUserModal from './Backoffice/EditUserModal.svelte';
    import ChangePasswordModal from './Backoffice/Modal/ChangePasswordModal.svelte';
    let changePasswordModalOpen = false;
    let StatisticModalOpen = false;
    let confirmationModalOpen = false;
    import ConfirmationModal from './Backoffice/ConfirmationModal.svelte';
    let editUserModalOpen = false;
    import CreateDocumentModal from './Backoffice/CreateDocumentModal.svelte';
    let createDocumentModalOpen = false;
    import CreateAnnouncementModal from './Backoffice/CreateAnnouncementModal.svelte';
    let createAnnouncementModalOpen = false;
    function showConfirmationModal() {
        confirmationModalOpen = true;
    }

    function handleConfirm() {
        console.log('Confirmed');
        confirmationModalOpen = false;
    }

    function handleCancel() {
        console.log('Cancelled');
        confirmationModalOpen = false;
    }

    function showEditUserModal() {
        editUserModalOpen = true;
    }
</script>

<main class="h-screen">
    <section class="section mb-5">
        <h2 class="font-bold text-2xl mb-4">Custom Modal</h2>
        <div class="space-x-4">
            <ConfirmationModal 
                bind:isOpen={confirmationModalOpen} 
                title="ยืนยันการลบเอกสาร" 
                body="หากทำการยืนยันเอกสารที่เลือกจะถูกลบและไม่สามารถย้อนกลับได้" 
                confirmText="ยืนยัน" 
                cancelText="ยกเลิก" 
                onConfirm={handleConfirm} 
                onCancel={handleCancel}
            />
            <button
                class="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                on:click={showConfirmationModal}
            >
                Open Confirmation Modal
            </button>

            <button
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                on:click={() => StatisticModalOpen = true}
            >
                เปิดฟอร์มสถิติ
            </button>

            <button
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                on:click={showEditUserModal}
            >
                แก้ไขผู้ใช้งาน
            </button>
        </div>

        <CreateStatisticModal bind:open={StatisticModalOpen} />
        <EditUserModal bind:open={editUserModalOpen} />

        <button on:click={() => changePasswordModalOpen = true}>
            เปลี่ยนรหัสผ่าน
        </button>
        
        <ChangePasswordModal bind:open={changePasswordModalOpen} />


        <button on:click={() => createDocumentModalOpen = true}>
            สร้างเอกสาร
        </button>

        <CreateDocumentModal bind:isOpen={createDocumentModalOpen} />



        <button on:click={() => createAnnouncementModalOpen = true}>
            สร้างประกาศ
        </button>

        <CreateAnnouncementModal bind:open={createAnnouncementModalOpen} />
    </section>
</main>
