<script>
    import {onMount} from 'svelte';
    function getInitialTheme() {
        if(!window) {
          return 'light';
        }
        const storedValue = window.localStorage.getItem('theme');
        if (storedValue) {
            document.body.classList.add(`theme-${storedValue}`)
            return storedValue;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    let theme = getInitialTheme();

    function toggleTheme() {
        const body = document.body;
        body.classList.remove(`theme-${theme}`);
        theme = (theme === 'dark' ? 'light' : 'dark');
        body.classList.add(`theme-${theme}`);
        window.localStorage.setItem('theme', theme );
    }
</script>
<style>
    .themeswitch {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
        fill:var(--color-primary);
    }
</style>
<svg class="themeswitch" on:click={toggleTheme} viewBox="0 0 24 24">
    {#if theme === 'light' }
        <use href="node_modules/@mdi/svg/svg/lightbulb-off-outline.svg#mdi-lightbulb-off-outline"></use>
    {:else}
        <use href="node_modules/@mdi/svg/svg/lightbulb-on-outline.svg#mdi-lightbulb-on-outline"></use>
    {/if}}
</svg>