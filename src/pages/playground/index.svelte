<script>
    import penguin from 'static/penguin.png' // case 1, imported in script
    import account_plus from 'node_modules/@mdi/svg/svg/account-plus.svg'
    let lazy;
    function loadLazy() {
        import('@components/Lazy.svelte').then(m => lazy = m.default);
    }
</script>

<style>
    .elephant {
        background-image: url("static/elephant.png"); /* case 2, referenced in css url */
    }
    .btn {
        @apply font-bold py-2 px-4 rounded; /* LOOK MA, tailwind in svelte <style> */
    }
    .btn-blue {
        @apply bg-primary text-regular;
    }
    .btn-blue:hover {
        @apply bg-regular;
    }
</style>

<h1>Image with imported src</h1>
<img alt="penguin" src={penguin}>
<h1>Div with css background</h1>
<div class="elephant"></div>
<h1>Image with static src</h1>
<img alt="cat" src="static/cat.png"/> <!-- case 3, hardcoded in template -->
<h1>svg with imported use href</h1>
<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
    <use  xlink:href={`${account_plus}#mdi-account-plus`}></use>
</svg>
<h1>svg with static use href</h1>
<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
    <use  xlink:href="node_modules/@mdi/svg/svg/account-plus.svg#mdi-account-plus"></use>
</svg>

<button class="btn btn-blue" on:click={loadLazy}>loadLazy</button>
<svelte:component this={lazy}></svelte:component>

<h1>Images with static src which should not be processed by smart-asset</h1>
<img alt="x" src="http://foo.com/bar.jpg"/>
<img alt="x" src="https://foo.com/bar.jpg"/>
<img alt="x" src="//foo.com/bar.jpg"/>
<img alt="x" src="foo.com/bar.jpg"/>