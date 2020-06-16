<script>
  import Nav from '../components/Nav.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<style>
  #app {
    display: grid;
    min-height: 100vh;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: max-content 1fr auto;
    grid-gap: 1rem;
  }
</style>

<div id="app">
  <Nav />
  <main class="w-full max-w-screen-xl mx-auto px-4">
    <slot />
  </main>
  <Footer />
</div>
