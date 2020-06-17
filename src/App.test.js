import { render } from '@testing-library/svelte';
import App from './App';

test('renders learn svelte link', () => {
  const { container } = render(App);
  const routifyIframesHolder = container.querySelector('#__routify_iframes');
  expect(routifyIframesHolder).toBeInTheDocument();
});
