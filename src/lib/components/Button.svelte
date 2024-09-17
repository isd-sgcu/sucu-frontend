<script lang="ts">
	import { buttonVariants, type ButtonProps } from '../../styles/tailwind/button';

	export let variant: ButtonProps['variant'] = 'default';
	export let size: ButtonProps['size'] = 'default';
	export let color: ButtonProps['color'] = undefined;
	export let className: string = '';
	export { className as class };

	$: classes = buttonVariants({ variant, size, className, color });
</script>

<button class={classes} on:click on:keydown {...$$restProps}>
	<slot />
</button>
	