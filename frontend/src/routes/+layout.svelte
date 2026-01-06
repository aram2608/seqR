<script lang="ts">
	import Header from './Header.svelte';
	import './layout.css';
	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>
</div>

<style lang="postcss">
	@reference "tailwindcss";

	:global(html) {
		background-color: theme(--color-gray-700);
	}
</style>
