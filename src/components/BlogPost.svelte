<script>
  import BlogCard from './BlogCard.svelte';
  export let post;
</script>

<div>
  <BlogCard {post} />
  <slot />
</div>
