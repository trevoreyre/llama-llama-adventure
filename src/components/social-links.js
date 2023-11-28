import { css, html, LitElement } from 'lit'
import { normalize } from '@slate-ui/core/src/normalize.css.js'
import '@slate-ui/core/src/stack/stack.js'
import '@slate-ui/core/src/text/text.js'
import '~/components/icons.js'

class SocialLinks extends LitElement {
  static properties = {
    align: { type: String, reflect: true },

    direction: { type: String, reflect: true },

    gap: { type: String, reflect: true },

    justify: { type: String, reflect: true },

    wrap: { type: Boolean, reflect: true },

    labeled: { type: Boolean, reflect: true },
  }

  render() {
    const align = this.align ?? 'center'
    const direction = this.direction ?? 'row'
    const gap = this.gap ?? '4xs'
    const labeled = this.labeled ?? false

    return html`
      <slate-stack part="host" direction=${direction} align=${align} gap=${gap}>
        <a
          part="link"
          aria-label="Instagram"
          href="https://www.instagram.com/llamallamaadventure"
          target="_blank"
          rel="noreferrer noopener"
        >
          <lla-icon-instagram part="icon" class="icon"></lla-icon-instagram>
          ${labeled ? html`<slate-text part="label">Instagram</slate-text>` : ''}
        </a>
        <a
          part="link"
          aria-label="Facebook"
          href="https://www.facebook.com/llamallamaadventure"
          target="_blank"
          rel="noreferrer noopener"
        >
          <lla-icon-facebook part="icon" class="icon"></lla-icon-facebook>
          ${labeled ? html`<slate-text part="label">Facebook</slate-text>` : ''}
        </a>
        <a
          part="link"
          aria-label="Email"
          href="mailto:lia@liaeyre.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          <lla-icon-email part="icon" class="icon"></lla-icon-email>
          ${labeled ? html`<slate-text part="label">Email</slate-text>` : ''}
        </a>
      </slate-stack>
    `
  }

  static styles = [
    normalize,
    css`
      slate-stack {
        margin-inline: calc(-1 * var(--spacing-3xs));
      }

      a {
        border-radius: var(--border-radius-md);
        padding: var(--spacing-3xs);
        display: flex;
        align-items: center;
        gap: var(--spacing-3xs);
        fill: hsl(var(--color-text-primary));
        text-decoration: none;
      }

      a:hover {
        fill: var(--color-brand-700);
      }

      a:hover slate-text {
        color: var(--color-brand-700);
      }

      .icon {
        inline-size: calc(var(--text-lg-font-size));
        block-size: calc(var(--text-lg-font-size));
        flex-shrink: 0;
      }
    `,
  ]
}

if (!customElements.get('lla-social-links')) {
  customElements.define('lla-social-links', SocialLinks)
}
export { SocialLinks }
