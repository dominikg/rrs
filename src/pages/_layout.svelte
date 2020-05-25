<script>
    import Nav from "@components/Nav.svelte";
    import Footer from "@components/Footer.svelte";
</script>
<style>
#app {
    @apply grid grid-cols-1 min-h-screen;
    grid-template-rows: max-content 1fr auto;
}
</style>
<div id="app">
    <Nav/>
    <main class="p-4 max-w-xl mx-auto">
        <slot />
    </main>
    <Footer/>
</div>


