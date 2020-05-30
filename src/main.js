import App from './App.svelte';
// import './main.css'; // don't do this, this would tie output hash of js and css together

const app = new App({
  target: document.body,
});

export default app;
