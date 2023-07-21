<script>
	import { page } from '$app/stores';
</script>

<h3>
	{$page.url.pathname}
</h3>

<form method="POST" action="http://localhost:8090/api/collections/menus/records">
	<label class="label">
		<span>code</span>
		<input class="input variant-form-material" name="code" type="number" placeholder="code" />
	</label>
	<label class="label">
		<span>name</span>
		<input class="input variant-form-material" name="name" type="text" placeholder="name" />
	</label>
	<label class="label">
		<span>slug</span>
		<input class="input variant-form-material" name="slug" type="text" placeholder="slug" />
	</label>
	<button class="btn variant-filled-primary my-2" type="submit">보내기</button>
</form>

<pre>
	{JSON.stringify($page, null, 2)}
</pre>
