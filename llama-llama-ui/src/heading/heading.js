import { css } from 'lit'
import { Text } from '../text/text.js'

export class Heading extends Text {
  static styles = [
    Text.styles,
    css`
      :host {
        font-family: var(--font-family-heading);
      }
    `,
  ]
}

customElements.define('lam-heading', Heading)
