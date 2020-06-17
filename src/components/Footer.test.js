import { render } from '@testing-library/svelte';
import Footer from './Footer';

test('renders footer', () => {
  const { getByText } = render(Footer);
  const footer = getByText(/Cool footer here/i);
  expect(footer).toBeInTheDocument();
});
