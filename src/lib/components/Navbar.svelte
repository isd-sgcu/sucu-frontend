<script>
	import Fa from 'svelte-fa';
	import sucuLogo from '/src/lib/icons/sucu_logo_1.svg';
	import { faBars } from '@fortawesome/free-solid-svg-icons';

	let isMenuOpen = false;
	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const navItems = [
		{ name: 'ประกาศ', href: '/' },
		{ name: 'เอกสาร', href: '/document' },
		{ name: 'งบประมาณและสถิติ', href: '/stat' },
		{ name: 'สโมสรนิสิตฯ', href: '/' }
	];
</script>

<nav class="bg-sucu-pink-01 p-4 px-11 flex justify-between items-center">
	<a href="/" class="flex items-center space-x-3 z-50">
		<img alt="Logo" class="h-12" src={sucuLogo} />
		<div class="hidden md:block text-white font-bold">
			<p>สโมสรนิสิต</p>
			<p>จุฬาลงกรณ์มหาวิทยาลัย</p>
		</div>
	</a>

	{#if isMenuOpen}
		<div class="fixed inset-0 bg-gray-700 bg-opacity-40 backdrop-blur-sm" />
		<button class="text-white md:hidden text-4xl focus:outline-none z-50" on:click={toggleMenu}>
			&times;
		</button>
	{:else}
		<button class="block md:hidden text-white focus:outline-none z-50" on:click={toggleMenu}>
			<Fa icon={faBars} class="text-2xl" />
		</button>
	{/if}

	<div class="hidden md:flex space-x-8">
		{#each navItems as item}
			<a href={item.href} class="text-white text-lg hover:underline">{item.name}</a>
		{/each}
	</div>

	<div
		class="absolute inset-0 bg-sucu-pink-01 md:hidden flex flex-col items-end h-[800px] justify-end space-y-8 p-8 text-white transform duration-300 ease-in-out"
		class:menu-closed={!isMenuOpen}
		class:menu-open={isMenuOpen}
	>
		{#each navItems as item}
			<a href={item.href} class="text-white text-lg hover:underline">{item.name}</a>
		{/each}
	</div>
</nav>

<style>
	.menu-open {
		transform: translateY(-60%);
	}

	.menu-closed {
		transform: translateY(-100%);
	}
</style>
