<script lang="ts">
	import sgcuLogo from '$lib/assets/images/sgcu.png';
	import isdLogo from '$lib/assets/images/isdlogo.png';
	import editLogo from '$lib/assets/icons/edit.svg';
	export let menuItems: { title: string; href: string }[];
	export let user: { name: string; lastname: string; role: string };

	let currentPath = '';

	if (typeof window !== 'undefined') {
		currentPath = window.location.pathname;
	}

	$: currentPath;

	function handleClick() {
		console.log('Edit icon clicked');
	}
</script>

<aside
	class="fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col justify-between bg-sucu-pink-05"
>
	<div>
		<div class="flex justify-center p-4 my-4">
			<img src={sgcuLogo} alt="Logo" class="h-20" />
		</div>

		<nav class="flex flex-col p-4 gap-2">
			{#each menuItems as item}
				<a
					href={item.href}
					class="p-2 hover:bg-sucu-pink-04 font-semibold {currentPath === item.href
						? 'bg-white'
						: ''}"
				>
					{item.title}
				</a>
			{/each}
		</nav>
	</div>

	<div>
		<div class="relative p-4 m-4 bg-white">
			<div class="absolute top-2 right-2">
				<button
					type="button"
					class="h-4 w-4 cursor-pointer"
					on:click={handleClick}
					aria-label="Edit"
				>
					<img src={editLogo} alt="Edit" class="h-4 w-4" />
				</button>
			</div>
			<div class="body-medium font-semibold">
				{user.name}
				{user.lastname}
			</div>
			<div class=" body-medium font-semibold">
				{user.role}
			</div>
		</div>

		<div class="p-4 m-4 body-medium font-semibold hover:bg-sucu-pink-04">ออกจากระบบ</div>

		<hr class="border-pink-200 mx-4 my-4" />

		<div class="flex flex-col items-center p-4">
			<div class="text-xs">Develop by SGCU</div>
			<img src={isdLogo} alt="Develop by SGCU" class="h-10 my-2" />
		</div>
	</div>
</aside>
