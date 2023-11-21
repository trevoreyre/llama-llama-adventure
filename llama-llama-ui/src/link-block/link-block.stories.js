import { html } from 'lit'
import '../heading/heading.js'
import '../stack/stack.js'
import '../text/text.js'
import './link-block.js'

const meta = {
  title: 'Stories/LinkBlock',
  component: 'lam-link-block',
}

const Basic = {
  render: () => html`
    <lam-link-block href="#">
      <lam-stack gap="xs">
        <lam-heading size="lg">LinkBlock</lam-heading>
        <lam-text>Everything in this block is part of the link.</lam-text>
        <lam-text>Even this text here.</lam-text>
      </lam-stack>
    </lam-link-block>
  `,
}

export default meta
export { Basic }
