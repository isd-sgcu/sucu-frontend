<script lang="ts">
	import ChangePasswordModal from './Backoffice/Modal/ChangePasswordModal.svelte';
	import ConfirmationModal from './Backoffice/Modal/ConfirmationModal.svelte';
	import CreateDocumentModal from './Backoffice/Modal/CreateDocumentModal.svelte';
	import CreateStatisticModal from './Backoffice/Modal/CreateStatisticModal.svelte';
	import EditUserModal from './Backoffice/Modal/EditUserModal.svelte';
	import FileRankingModal from './Backoffice/Modal/FileRankingModal.svelte';

	let changePasswordModalOpen = false;
	let confirmationModalOpen = false;
	let createAnnouncementModalOpen = false;
	let createDocumentModalOpen = false;
	let editUserModalOpen = false;
	let StatisticModalOpen = false;

	function showConfirmationModal() {
		confirmationModalOpen = true;
	}

	function handleConfirm() {
		confirmationModalOpen = false;
	}

	function handleCancel() {
		confirmationModalOpen = false;
	}

	function showEditUserModal() {
		editUserModalOpen = true;
	}
</script>

<main class="h-screen p-8">
	<section>
		<h2 class="font-bold text-2xl mb-6">Backoffice modal</h2>

		<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
			<button
				class="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
				on:click={showConfirmationModal}
			>
				Open Confirmation Modal
			</button>

			<button
				class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
				on:click={() => (StatisticModalOpen = true)}
			>
				เปิดฟอร์มสถิติ
			</button>

			<button
				class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
				on:click={showEditUserModal}
			>
				แก้ไขผู้ใช้งาน
			</button>

			<button
				class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
				on:click={() => (changePasswordModalOpen = true)}
			>
				เปลี่ยนรหัสผ่าน
			</button>

			<button
				class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
				on:click={() => (createDocumentModalOpen = true)}
			>
				สร้างเอกสาร
			</button>

			<button
				class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
				on:click={() => (createAnnouncementModalOpen = true)}
			>
				สร้างประกาศ
			</button>
		</div>

		<ConfirmationModal
			bind:isOpen={confirmationModalOpen}
			title="ยืนยันการลบเอกสาร"
			body="หากทำการยืนยันเอกสารที่เลือกจะถูกลบและไม่สามารถย้อนกลับได้"
			confirmText="ยืนยัน"
			cancelText="ยกเลิก"
			onConfirm={handleConfirm}
			onCancel={handleCancel}
		/>
		<CreateStatisticModal bind:open={StatisticModalOpen} />
		<EditUserModal bind:open={editUserModalOpen} />
		<ChangePasswordModal bind:open={changePasswordModalOpen} />
		<CreateDocumentModal bind:isOpen={createDocumentModalOpen} />
		<FileRankingModal bind:open={createAnnouncementModalOpen} variant="announcement" />
	</section>
</main>
