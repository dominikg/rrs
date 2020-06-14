<script>
  import { page } from '@sveltech/routify/runtime';
  import BlogPost from '../../components/BlogPost.svelte';
  import BlogCard from '../../components/BlogCard.svelte';

  let current, next, prev, isIndex;

  $: update($page); //update buttons on page change
  function update(page) {
    prev = page.prev;
    next = page.next;
    current = page;
    isIndex = page.path.endsWith('/index');
  }
  update($page);
</script>

{#if isIndex}
  <slot />
{:else}
  <BlogPost post={current}>
    <slot />
  </BlogPost>
  <div class="flex justify-around">
    {#if prev && prev.meta.blog}
      <div class="flex flex-col">
        <div>Previous post</div>
        <BlogCard post={prev} showTitle />
      </div>
    {/if}
    {#if next && next.meta.blog}
      <div class="flex flex-col">
        <div>Next post</div>
        <BlogCard post={next} showTitle />
      </div>
    {/if}
  </div>
{/if}
