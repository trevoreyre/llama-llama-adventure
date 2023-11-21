import { css, html } from 'lit'
import '../container/container.js'
import '../stack/stack.js'
import { Text } from './text.js'

const meta = {
  title: 'Stories/Text',
  component: 'lam-text',
}

class StorySizeLabel extends Text {
  static styles = [
    Text.styles,
    css`
      :host {
        flex-shrink: 0;
        min-inline-size: 4ch;
        font-size: var(--text-sm-font-size);
        line-height: var(--text-sm-line-height);
      }
      :host::before {
        margin-block-end: var(--text-sm-margin-before);
      }
      :host::after {
        margin-block-start: var(--text-sm-margin-after);
      }
    `,
  ]

  render() {
    return html`
      <slot></slot>
    `
  }
}
customElements.define('story-size-label', StorySizeLabel)

const Basic = () => html`
  <lam-text>Some text</lam-text>
`

const Size = () => html`
  <lam-stack gap="xl">
    <lam-stack direction="row">
      <story-size-label>xs</story-size-label>
      <lam-text size="xs" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>sm</story-size-label>
      <lam-text size="sm" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>md</story-size-label>
      <lam-text size="md" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>lg</story-size-label>
      <lam-text size="lg" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>xl</story-size-label>
      <lam-text size="xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>2xl</story-size-label>
      <lam-text size="2xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>3xl</story-size-label>
      <lam-text size="3xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>4xl</story-size-label>
      <lam-text size="4xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>5xl</story-size-label>
      <lam-text size="5xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
    <lam-stack direction="row">
      <story-size-label>6xl</story-size-label>
      <lam-text size="6xl" wrap="false">
        The quick brown fox jumps over the lazy dog
      </lam-text>
    </lam-stack>
  </lam-stack>
`

export const Paragraphs = () => html`
  <lam-stack gap="xl">
    <lam-container size="xs" align="start">
      <lam-stack gap="xl">
        <lam-stack direction="row">
          <story-size-label>xs</story-size-label>
          <lam-text size="xs">
            But the location suppose for gets when mountains, by which phase
            attributing to biases, leather clock pile career from for moving but
            nor the rationally and on been happening, of expect, attained
            something furnished times, she the textile value and on of gone
            background a sitting come like the like.
          </lam-text>
        </lam-stack>
        <lam-stack direction="row">
          <story-size-label>sm</story-size-label>
          <lam-text size="sm">
            But the location suppose for gets when mountains, by which phase
            attributing to biases, leather clock pile career from for moving but
            nor the rationally and on been happening, of expect, attained
            something furnished times, she the textile value and on of gone
            background a sitting come like the like.
          </lam-text>
        </lam-stack>
      </lam-stack>
    </lam-container>
    <lam-container size="sm" align="start">
      <lam-stack gap="xl">
        <lam-stack direction="row">
          <story-size-label>md</story-size-label>
          <lam-text size="md">
            But the location suppose for gets when mountains, by which phase
            attributing to biases, leather clock pile career from for moving but
            nor the rationally and on been happening, of expect, attained
            something furnished times, she the textile value and on of gone
            background a sitting come like the like.
          </lam-text>
        </lam-stack>
        <lam-stack direction="row">
          <story-size-label>lg</story-size-label>
          <lam-text size="lg">
            But the location suppose for gets when mountains, by which phase
            attributing to biases, leather clock pile career from for moving but
            nor the rationally and on been happening, of expect, attained
            something furnished times, she the textile value and on of gone
            background a sitting come like the like.
          </lam-text>
        </lam-stack>
      </lam-stack>
    </lam-container>
    <lam-container size="md" align="start">
      <lam-stack gap="xl">
        <lam-stack direction="row">
          <story-size-label>xl</story-size-label>
          <lam-text size="xl">
            But the location suppose for gets when mountains, by which phase
            attributing to biases, leather clock pile career from for moving but
            nor the rationally and on been happening, of expect, attained
            something furnished times, she the textile value and on of gone
            background a sitting come like the like.
          </lam-text>
        </lam-stack>
        <lam-stack direction="row">
          <story-size-label>2xl</story-size-label>
          <lam-text size="2xl">
            But the location suppose for gets when mountains, by which phase
            attributing to biases, leather clock pile career from for moving but
            nor the rationally and on been happening, of expect, attained
            something furnished times, she the textile value and on of gone
            background a sitting come like the like.
          </lam-text>
        </lam-stack>
      </lam-stack>
    </lam-container>
    <lam-container size="lg" align="start">
      <lam-stack direction="row">
        <story-size-label>3xl</story-size-label>
        <lam-text size="3xl">
          But the location suppose for gets when mountains, by which phase
          attributing to biases, leather clock pile career from for moving but
          nor the rationally and on been happening, of expect, attained
          something furnished times, she the textile value and on of gone
          background a sitting come like the like.
        </lam-text>
      </lam-stack>
    </lam-container>
    <lam-container size="xl" align="start">
      <lam-stack gap="xl">
        <lam-stack direction="row">
          <story-size-label>4xl</story-size-label>
          <lam-text size="4xl">
            But the location suppose for gets when mountains, by which phase
            attributing to biases, leather clock pile career from for moving but
            nor the rationally and on been happening.
          </lam-text>
        </lam-stack>
        <lam-stack direction="row">
          <story-size-label>5xl</story-size-label>
          <lam-text size="5xl">
            But the location suppose for gets when mountains, by which phase
            attributing to biases, leather clock pile career from.
          </lam-text>
        </lam-stack>
        <lam-stack direction="row">
          <story-size-label>6xl</story-size-label>
          <lam-text size="6xl">
            But the location suppose for gets when mountains, by which phase
            attributing.
          </lam-text>
        </lam-stack>
      </lam-stack>
    </lam-container>
  </lam-stack>
`

export default meta
export { Basic, Size }
