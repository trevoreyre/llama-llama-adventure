import { css, html, LitElement } from 'lit'
import '../container/container.js'
import '../stack/stack.js'
import '../text/text.js'
import './heading.js'

const meta = {
  title: 'Stories/Heading',
  component: 'lam-heading',
}

class StorySizeLabel extends LitElement {
  static styles = css`
    :host {
      flex-shrink: 0;
      inline-size: 24px;
    }
  `

  render() {
    return html`
      <lam-text size="sm"><slot></slot></lam-text>
    `
  }
}
customElements.define('story-heading-size-label', StorySizeLabel)

const Basic = () => html`
  <lam-heading>A basic heading</lam-heading>
`

const Size = () => html`
  <lam-stack gap="xl">
    <lam-stack direction="row">
      <story-heading-size-label>xs</story-heading-size-label>
      <lam-heading size="xs" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>sm</story-heading-size-label>
      <lam-heading size="sm" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>md</story-heading-size-label>
      <lam-heading size="md" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>lg</story-heading-size-label>
      <lam-heading size="lg" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>xl</story-heading-size-label>
      <lam-heading size="xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>2xl</story-heading-size-label>
      <lam-heading size="2xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>3xl</story-heading-size-label>
      <lam-heading size="3xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>4xl</story-heading-size-label>
      <lam-heading size="4xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>5xl</story-heading-size-label>
      <lam-heading size="5xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
    <lam-stack direction="row">
      <story-heading-size-label>6xl</story-heading-size-label>
      <lam-heading size="6xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-heading>
    </lam-stack>
  </lam-stack>
`

export default meta
export { Basic, Size }
