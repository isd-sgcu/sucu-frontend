<script>
	import '../styles/app.css';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	// Initialize stores
	initializeStores();
</script>

<Modal />

<div>
	<Navbar />
	<slot />
	<Footer />
</div>
