<script>
	import { page } from '$app/stores';
</script>

<h3>
	{$page.url.pathname}
</h3>
한글 테스트
<pre>
	{JSON.stringify($page, null, 2)}
</pre>
