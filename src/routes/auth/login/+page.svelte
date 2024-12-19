<script lang="ts">
	import { login } from '$lib/api/login';
	import CryptoJS from 'crypto-js';

	let studentId = '';
	let password = '';
	let errorMessage = '';
	const secretKey = import.meta.env.VITE_SECRET_KEY;

	const handleLogin = async () => {
		errorMessage = '';
		try {
			const response = await login(studentId, password);
			const token = response.result.access_token;
			const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
			sessionStorage.setItem('encryptedToken', encryptedToken);
			console.log('Login successful:');
			// Add navigation or additional logic here
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
		}
		getDecryptedToken();
	};

	const getDecryptedToken = () => {
		const encryptedToken = sessionStorage.getItem('encryptedToken');
		if (encryptedToken) {
			const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
			const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
			console.log('Decrypted Token:', decryptedToken);
			return decryptedToken;
		}
		console.log('No encrypted token found in sessionStorage.');
		return null;
	};
</script>

<div class="min-h-screen flex items-center justify-center bg-sucu-pink-04">
	<div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
		<h1 class="text-2xl font-bold text-center mb-6">Login</h1>
		<form on:submit|preventDefault={handleLogin} class="space-y-4">
			<div class="space-y-2">
				<label for="studentId" class="text-sm font-medium text-gray-700 block"> Student ID </label>
				<input
					id="studentId"
					type="text"
					bind:value={studentId}
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sucu-pink-05"
				/>
			</div>
			<div class="space-y-2">
				<label for="password" class="text-sm font-medium text-gray-700 block"> Password </label>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sucu-pink-05"
				/>
			</div>
			{#if errorMessage}
				<div class="flex items-center space-x-2 text-red-600">
					<p class="text-sm">{errorMessage}</p>
				</div>
			{/if}
			<button
				type="submit"
				class="w-full bg-sucu-pink-03 text-white font-semibold py-2 px-4 rounded-md hover:bg-sucu-pink-06 focus:outline-none focus:ring-2 focus:ring-sucu-pink-05 focus:ring-offset-2 transition-colors"
			>
				Login
			</button>
		</form>
	</div>
</div>
