<script>
    import Nav from "src/components/Nav.svelte";
    import Footer from "src/components/Footer.svelte";
</script>
<style>
#app {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr auto;
    grid-gap: 1rem;
}
</style>
<div id="app">
    <Nav/>
    <main class="w-full max-w-screen-xl mx-auto px-4">
        <slot />
    </main>
    <Footer/>
</div>


