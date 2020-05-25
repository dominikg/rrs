<script>
    import Nav from "@components/Nav.svelte";
    import Footer from "@components/Footer.svelte";
</script>
<style>
#app {
    @apply grid grid-cols-1 min-h-screen;
    grid-template-rows: max-content 1fr auto;
}
#footer {
    grid-row-start: 3;
    grid-row-end:4;
}
</style>
<div id="app">
    <Nav/>
    <main class="p-4">
        <slot />
    </main>
    <Footer id="footer"/>
</div>


