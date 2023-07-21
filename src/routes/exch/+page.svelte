<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	// import { page } from '$app/stores';
	// import { pb } from '$lib/config';
</script>

<pre>
	<!-- {pb.authStore.model} -->
	<!-- {JSON.stringify(data, null, 2)} -->
	{JSON.stringify(data, null, 2)}
</pre>
