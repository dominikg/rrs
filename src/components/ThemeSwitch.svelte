<script>
  let theme = getInitialTheme();
  let themeColor = getThemeColor();

  function getInitialTheme() {
    if (!window) {
      return 'dark';
    }
    const storedValue = window.localStorage.getItem('theme');
    if (storedValue) {
      return storedValue;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function getThemeColor() {
    const body = document && document.body;
    if (!body) {
      return '#121212';
    }
    return getComputedStyle(body).getPropertyValue('--color-primary');
  }

  function toggleTheme() {
    const body = document.body;
    body.classList.add('transition-colors', 'ease-in-out', 'duration-500');
    body.classList.remove(`theme-${theme}`);
    theme = theme === 'dark' ? 'light' : 'dark';
    body.classList.add(`theme-${theme}`);
    window.localStorage.setItem('theme', theme);
    themeColor = getThemeColor();
    const onTransitionEnd = function () {
      body.removeEventListener('transitionend', onTransitionEnd);
      body.classList.remove('transition-colors', 'ease-in-out', 'duration-500');
    };
    body.addEventListener('transitionend', onTransitionEnd);
  }
</script>

<style>
  .themeswitch {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--color-primary);
  }
</style>

<svg class="themeswitch" on:click={toggleTheme} viewBox="0 0 24 24">
  {#if theme === 'light'}
    <use href="node_modules/@mdi/svg/svg/lightbulb-off-outline.svg#mdi-lightbulb-off-outline" />
  {:else}
    <use href="node_modules/@mdi/svg/svg/lightbulb-on-outline.svg#mdi-lightbulb-on-outline" />
  {/if}
  }
</svg>
<svelte:head>
  <meta name="theme-color" content={themeColor} />
</svelte:head>
