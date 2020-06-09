<script>
  import { route } from '@sveltech/routify/runtime';
  import BlogCard from '../../components/BlogCard.svelte';

  const siblings = $route.api.parent.children.filter((sibling) => sibling.path !== $route.path).reverse();
</script>

<ul>
  {#each siblings as sibling}
    <li>
      <BlogCard post={sibling} showTitle showExcerpt />
    </li>
  {/each}
</ul>
