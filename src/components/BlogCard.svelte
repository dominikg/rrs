<script>
  import { url } from '@sveltech/routify/runtime';
  export let post,
    showTitle = false,
    showExcerpt = false;

  $: blog = post && post.meta ? post.meta.blog : {};
  $: title = showTitle && blog && blog.title;
</script>

{#if blog}
  <a href={$url(post.path)} class="block border border-primary rounded my-2">
    {#if title}
      <h1 class="bg-primary text-on-primary py-0 px-2 m-0">{title}</h1>
    {/if}

    <div>published: {blog.published}</div>
    <div>by: {blog.author}</div>
    <div>duration: {blog.readingTime && blog.readingTime.text}</div>
    {#if showExcerpt && blog.excerpt}
      <div>
        {@html blog.excerpt}
      </div>
    {/if}
  </a>
{/if}
