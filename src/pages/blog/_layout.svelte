<script>
  import { layout, page } from '@sveltech/routify';
  import BlogPost from '~/src/components/BlogPost.svelte';
  import BlogCard from '../../components/BlogCard.svelte';

  let current, next, prev, isIndex;
  $: if ($page) {
    next = prev = current = false;
    isIndex = true;
  } //reset
  $: update($page); //update buttons on page change
  function update(node) {
    prev = prev || node.prev;
    next = next || node.next;
    current = node;
    // make sure we have a parent and that we're not travelling past our layout
    if (node.parent && node.parent !== $layout.parent) update(node.parent);
    isIndex = node.path.endsWith('/index');
  }
</script>

{#if isIndex}
  <slot />
{:else}
  <BlogPost post={current}>
    <slot />
  </BlogPost>
  <div class="flex justify-around">
    {#if prev}
      <BlogCard post={prev} showTitle label="Previous post" />
    {/if}
    {#if next}
      <BlogCard post={next} showTitle label="Next post" />
    {/if}
  </div>
{/if}
