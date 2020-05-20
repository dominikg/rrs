<script>
    import penguin from 'static/penguin.png' // case 1, imported in script
    import account_plus from 'node_modules/@mdi/svg/svg/account-plus.svg'
    import Nav from './components/Nav.svelte'
    let lazy;
    function loadLazy() {
        import('./components/Lazy.svelte').then(m => lazy = m.default);
    }
</script>

<style>
    .elephant {
        background-image: url("static/elephant.png"); /* case 2, referenced in css url */
    }
</style>
<Nav/>
<img alt="penguin" src={penguin}>
<div class="elephant"></div>
<img alt="cat" src="static/cat.png"/> <!-- case 3, hardcoded in template-->
<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
    <use  xlink:href={`${account_plus}#mdi-account-plus`}></use>
</svg>
<button on:click={loadLazy}>loadLazy</button>
<svelte:component this={lazy}></svelte:component>