<script lang="ts">
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div>
	<Navbar />
	<slot />
	<Footer />
</div>
