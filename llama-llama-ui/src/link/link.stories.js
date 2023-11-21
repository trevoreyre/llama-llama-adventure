import { html } from 'lit'
import './link.js'

const meta = {
  title: 'Stories/Link',
  component: 'lam-link',
}

const Basic = {
  render: () => html`
    <lam-link>A link</lam-link>
  `,
}

export default meta
export { Basic }
