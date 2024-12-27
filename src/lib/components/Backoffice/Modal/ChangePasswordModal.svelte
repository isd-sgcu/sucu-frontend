<script lang="ts">
	export let open = false;
	let dialogEl: HTMLDialogElement;

	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';

	/**
	 * 3 Steps
	 * 1. Enter current password
	 * 2. Enter new password
	 * 3. Confirm new password
	 */
	let step = 1;

	function handleSubmit() {
		if (step === 1 && currentPassword) {
			// TODO: Check the current password
			step = 2;
			currentPassword = '';
		} else if (step === 2 && newPassword && confirmPassword) {
			if (newPassword === confirmPassword) {
				step = 3;
			}
		} else {
			handleClose();
		}
	}

	function handleClose() {
		currentPassword = '';
		newPassword = '';
		confirmPassword = '';
		step = 1;
		open = false;
	}

	$: if (open && dialogEl) {
		dialogEl.showModal();
	} else if (dialogEl) {
		dialogEl.close();
	}
</script>

{#if open}
	<dialog bind:this={dialogEl} class="bg-transparent p-0" on:close={() => (open = false)}>
		<div
			role="presentation"
			class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
			on:click|self={handleClose}
			on:keydown|self={(e) => e.key === 'Escape' && handleClose()}
		>
			<div class="bg-white w-full max-w-md rounded-md shadow-lg">
				<div class="p-6">
					{#if step === 1}
						<h3 class="text-2xl font-bold text-sucu-gray-dark mb-2">เปลี่ยนรหัสผ่าน</h3>
						<p class="text-sucu-gray mb-6">กรอกรหัสปัจจุบันเพื่อสร้างรหัสใหม่</p>

						<form on:submit|preventDefault={handleSubmit} class="space-y-4">
							<div class="space-y-1">
								<span class="text-sm text-sucu-gray-dark">รหัสปัจจุบัน</span>
								<input
									type="password"
									bind:value={currentPassword}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
									required
								/>
							</div>

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
									class="px-4 py-2 text-white font-semibold bg-sucu-pink-01 rounded-sm"
								>
									ถัดไป
								</button>
							</div>
						</form>
					{:else if step === 2}
						<h3 class="text-2xl font-bold text-sucu-gray-dark mb-2">เปลี่ยนรหัสผ่าน</h3>
						<p class="text-sucu-gray mb-6">กรอกรหัสใหม่และยืนยันอีกครั้ง</p>

						<form on:submit|preventDefault={handleSubmit} class="space-y-4">
							<div class="space-y-1">
								<span class="text-sm text-sucu-gray-dark">รหัสใหม่</span>
								<input
									type="password"
									bind:value={newPassword}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
									required
								/>
							</div>

							<div class="space-y-1">
								<span class="text-sm text-sucu-gray-dark">ยืนยันรหัสใหม่</span>
								<input
									type="password"
									bind:value={confirmPassword}
									class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
									required
								/>
							</div>

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
									class="px-4 py-2 text-white font-semibold bg-sucu-pink-01 rounded-sm"
								>
									ถัดไป
								</button>
							</div>
						</form>
					{:else}
						<div class="flex items-center justify-center flex-col">
							<h3 class="text-2xl font-bold text-sucu-gray-dark mb-2">เปลี่ยนรหัสผ่านสำเร็จ</h3>
							<p class="text-sucu-gray mb-6">โปรดคลิกยืนยันเพื่อเข้าสู่ระบบใหม่อีกครั้ง</p>
							<button
								class="self-end w-1/3 px-4 py-2 text-white bg-sucu-pink-01 rounded-md hover:bg-sucu-pink-02"
								on:click={handleClose}
							>
								ยืนยัน
							</button>
						</div>
					{/if}
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
