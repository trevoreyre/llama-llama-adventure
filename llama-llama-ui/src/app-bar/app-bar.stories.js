import { html } from 'lit'
import './app-bar.js'
import '../app-nav/app-nav.js'

const meta = {
  title: 'Stories/App bar',
  component: 'lam-app-bar',
  parameters: {
    styles: {
      padding: 0,
    },
  },
}

const Basic = {
  render: () => html`
    <lam-app-bar>
      <lam-app-nav>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </lam-app-nav>
    </lam-app-bar>
  `,
}

export default meta
export { Basic }
