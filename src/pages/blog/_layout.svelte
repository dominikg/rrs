<script>
  import { url, layout, page } from '@sveltech/routify';

  let next, prev;
  $: if ($page) next = prev = false; //reset
  $: findSiblings($page); //update buttons on page change
  function findSiblings(node) {
    prev = prev || node.prev;
    next = next || node.next;
    // make sure we have a parent and that we're not travelling past our layout
    if (node.parent && node.parent !== $layout.parent) findSiblings(node.parent);
  }
</script>

<div class="c-pagination">

  {#if prev}
    <a href={$url(prev.path)}>Previous: {prev.title}</a>
  {/if}

  {#if next}
    <a href={$url(next.path)}>Next: {next.title}</a>
  {/if}
</div>

<div class="blogpost">
  <slot />
</div>
