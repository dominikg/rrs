<script>
  import { url } from '@sveltech/routify';
  export let post,
    showTitle = false,
    showExcerpt = false,
    label = false;

  $: blog = post && post.meta ? post.meta.blog : {};
  $: cardTitle = label || (showTitle && blog && blog.title);
  $: subTitle = label && showTitle && blog && blog.title;
</script>

{#if blog}
  <a href={$url(post.path)}>
    <div class="border border-primary rounded shadow-md mb-4">
      {#if cardTitle}
        <div class="bg-primary text-on-primary">
          <h1>{cardTitle}</h1>
          {#if subTitle}
            <div>{subTitle}</div>
          {/if}
        </div>
      {/if}

      <div>published: {blog.published}</div>
      <div>by: {blog.author}</div>
      <div>duration: {blog.readingTime && blog.readingTime.text}</div>
      {#if showExcerpt && blog.excerpt}
        <div>
          {@html blog.excerpt}
        </div>
      {/if}
    </div>
  </a>
{/if}
