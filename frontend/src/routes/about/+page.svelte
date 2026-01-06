<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>About this app</h1>

	<p>A web service for performing Differential Gene Expression Analysis</p>

	<p>
		The <a href={resolve('/analyze')}>Analyze</a> page allows you to input a csv/tsv file of gene counts
		as well as a csv/tsv for the associated meta data. The backend uses the R programming language and
		the DESeq2 package to perform the analysis.
	</p>
</div>
