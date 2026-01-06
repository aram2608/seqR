<script lang="ts">
	const endPoint = 'http://localhost:8000/api/data';
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const response = await fetch(endPoint, {
			method: 'POST',
			body: formData,
		});
		const result = await response.json();
		console.log(result);
	};
</script>

<svelte:head>
	<title>Analyze</title>
	<meta name="description" content="Analyze count data" />
</svelte:head>

<div>
	<form on:submit={handleSubmit}>
		<label>
			Add MetaData File
			<input class="bg-white" name="file" autocomplete="off" type="file" />
		</label>
		<button class="submission-button">Submit</button>
	</form>
</div>

<style lang="postcss">
	.submission-button {
		padding: 8px;
		background-color: var(--color-blue-200);
		border-radius: var(--radius-lg); /* 0.5rem (8px) */
		font-size: medium;
		&:hover {
			background-color: var(--color-blue-400);
		}
	}
</style>
