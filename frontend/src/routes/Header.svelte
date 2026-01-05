<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<header class="flex justify-around">
    <div class="flex justify-center bg-blue-200 rounded-lg">
        <h2>seqR</h2>
    </div>

    <nav class="flex justify-center">
        <ul class="flex relative p-4 h-3 justify-center items-center list-none">
            <li class="pages" aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a href={resolve('/')}>Home</a>
            </li>
            <li class="pages" aria-current={page.url.pathname === '/about' ? 'page' : undefined}>
				<a href={resolve('/about')}>About</a>
            </li>
            <li class="pages" aria-current={page.url.pathname.startsWith('/analyze') ? 'page' : undefined}>
				<a href={resolve('/analyze')}>Analyze</a>
            </li>
        </ul>
    </nav>

    <div>

    </div>
</header>

<style lang="postcss">
    .pages {
        padding: 8px;
        background-color: var(--color-blue-200);
        border-radius: var(--radius-lg); /* 0.5rem (8px) */
    }
</style>