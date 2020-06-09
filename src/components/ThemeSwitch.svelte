<script>
  import bulbOff from '@mdi/svg/svg/lightbulb-off-outline.svg';
  import bulbOn from '@mdi/svg/svg/lightbulb-on-outline.svg';
  const bulbOffIcon = bulbOff + '#mdi-lightbulb-off-outline';
  const bulbOnIcon = bulbOn + '#mdi-lightbulb-on-outline';
  let theme = getInitialTheme();
  let themeColor = getThemeColor();
  let bulbIcon = theme === 'dark' ? bulbOnIcon : bulbOffIcon;
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
    bulbIcon = theme === 'dark' ? bulbOnIcon : bulbOffIcon;
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
  <use href={bulbIcon} />
</svg>
<svelte:head>
  <meta name="theme-color" content={themeColor} />
</svelte:head>
