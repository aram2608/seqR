<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<header class="justify-begin flex h-15 bg-gray-400">
	<!-- TODO: Make this not look like trash -->
	<div class="m-3 flex px-10">
		<h2 class="rounded-lg bg-blue-200 text-lg text-xl">seqR</h2>
	</div>
	<nav class="m-3 flex justify-center px-10">
		<ul class="relative flex h-3 list-none items-center justify-center p-4">
			<li class="pages" aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a class="page-link" href={resolve('/')}>Home</a>
			</li>
			<li class="pages" aria-current={page.url.pathname === '/about' ? 'page' : undefined}>
				<a class="page-link" href={resolve('/about')}>About</a>
			</li>
			<li
				class="pages"
				aria-current={page.url.pathname.startsWith('/analyze') ? 'page' : undefined}
			>
				<a class="page-link" href={resolve('/analyze')}>Analyze</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	.pages {
		padding: 8px;
		background-color: var(--color-blue-200);
		border-radius: var(--radius-lg); /* 0.5rem (8px) */
		width: 200px;
		font-size: large;
		&:hover {
			background-color: var(--color-blue-400);
		}
	}
	.page-link {
		justify-content: center;
	}
</style>
