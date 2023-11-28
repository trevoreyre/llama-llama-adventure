import { css, html, LitElement } from 'lit'
import '@slate-ui/core/src/stack/stack.js'
import { normalize } from '@slate-ui/core/src/normalize.css.js'

class Stat extends LitElement {
  render() {
    return html`
      <slate-stack part="host" class="stat" direction="row" align="center" gap="sm">
        <div part="icon" class="icon">
          <slot name="icon"></slot>
        </div>
        <slate-stack part="content" class="content" gap="2xs">
          <slot></slot>
        </slate-stack>
      </slate-stack>
    `
  }

  static styles = [
    normalize,
    css`
      .icon {
        inline-size: var(--size-4xl);
        block-size: var(--size-4xl);
      }

      .content {
        min-inline-size: var(--size-6xl);
      }

      @media (max-width: 960px) {
        .stat {
          flex-direction: column;
        }

        .content {
          align-items: center;
        }
      }
    `,
  ]
}

if (!customElements.get('lla-stat')) {
  customElements.define('lla-stat', Stat)
}
export { Stat }
