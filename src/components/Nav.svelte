<script>
    import {isActive, url} from '@sveltech/routify'
    import ThemeSwitch from "./ThemeSwitch.svelte";

    const navitems = [
        ['./example', 'Routify Examples'],
        ['./playground', 'Playground'],
        ['./blog', 'Blog']
    ]
</script>
<style>
    .navbar {
    }

    .navbar {
        box-shadow: inset 0px -1rem 0.125rem -1rem var(--color-primary);
    }

    .app-logo {
        @apply w-8 h-8 mx-2;
        stroke: var(--color-primary);
        fill: none;
    }
    .nav-item {
        @apply flex items-center flex-shrink-0  text-primary  mr-4 transition-all ease-in-out duration-200 border-b py-2 px-4;
        border-color: transparent;
    }
    .nav-item.active,
    .nav-item:hover {
        @apply border-primary;
    }

</style>
<nav class="navbar flex items-stretch  pt-2">
    <a href="/" class="flex items-center flex-shrink-0 mr-6">

            <svg viewBox="0 0 98.1 118" class="app-logo">
                <use href="static/favicon.svg#logo"></use>
            </svg>
            <span class="text-xl text-primary">A svelte app</span>


    </a>
    {#each navitems as [path, name]}
        <a href={$url(path)}  class="nav-item" class:active={$isActive(path)}>
            {name}
        </a>
    {/each}
    <div class="flex items-center ml-auto mr-4">
        <ThemeSwitch/>
    </div>
</nav>



