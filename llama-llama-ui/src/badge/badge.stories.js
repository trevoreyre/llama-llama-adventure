import { html } from 'lit'
import './badge.js'

const meta = {
  title: 'Stories/Badge',
  component: 'lam-badge',
}

const Basic = {
  render: () => html`
    <div
      style="width: 80px; height: 80px; background: hsl(var(--color-neutral-700)); position: relative;"
    >
      <lam-badge size="2xl">3</lam-badge>
    </div>
  `,
}

export default meta
export { Basic }
