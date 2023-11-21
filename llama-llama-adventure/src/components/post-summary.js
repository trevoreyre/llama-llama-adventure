// @ts-nocheck
import { css, html, LitElement } from 'lit'
import { normalize } from 'llama-llama-ui/src/normalize.css.js'
import 'llama-llama-ui/src/heading/heading.js'
import 'llama-llama-ui/src/link-block/link-block.js'
import 'llama-llama-ui/src/stack/stack.js'
import 'llama-llama-ui/src/text/text.js'
import './icons.js'

class PostSummary extends LitElement {
  render() {
    return html`
      <article part="host">
        <lam-stack part="stack" gap="md">
          <slot></slot>
        </lam-stack>
      </article>
    `
  }

  static styles = [
    normalize,
    css`
      :host(:hover) {
        --post-summary-link-color: var(--color-brand-700);
        --post-summary-link-icon-opacity: 1;
        --post-summary-link-icon-translate: var(--spacing-4xs);
      }
    `,
  ]
}

class PostSummaryTitle extends LitElement {
  static properties = {
    size: { type: String, reflect: true },
    weight: { type: String, reflect: true },
  }

  render() {
    const size = this.size ?? '2xl'
    const weight = this.weight ?? 'normal'

    return html`
      <lam-heading part="host" size=${size} weight=${weight}>
        <slot></slot>
      </lam-heading>
    `
  }

  static styles = [normalize]
}

class PostSummaryDescription extends LitElement {
  static properties = {
    size: { type: String, reflect: true },
  }

  render() {
    const size = this.size ?? 'lg'

    return html`
      <lam-text part="host" variant="secondary" size=${size}>
        <slot></slot>
      </lam-text>
    `
  }

  static styles = [normalize]
}

class PostSummaryLink extends LitElement {
  static properties = {
    size: { type: String, reflect: true },
  }

  render() {
    const size = this.size ?? 'lg'

    return html`
      <lam-stack part="host" direction="row" align="center" gap="4xs">
        <lam-text part="text" size=${size} weight="bold">
          <slot></slot>
        </lam-text>
        <lla-icon-arrow-right part="icon"></lla-icon-arrow-right>
      </lam-stack>
    `
  }

  static styles = [
    normalize,
    css`
      :host {
        color: var(--post-summary-link-color, hsl(var(--color-text-primary)));
        transition: color 100ms ease;
      }

      lam-text {
        color: inherit;
      }

      lla-icon-arrow-right {
        inline-size: var(--size-sm);
        block-size: var(--size-sm);
        fill: var(--color-brand-700);
        opacity: var(--post-summary-link-icon-opacity, 0);
        translate: var(--post-summary-link-icon-translate, var(--spacing-none));
        transition: opacity 100ms ease, translate 300ms ease;
      }
    `,
  ]
}

customElements.define('lla-post-summary', PostSummary)
customElements.define('lla-post-summary-title', PostSummaryTitle)
customElements.define('lla-post-summary-description', PostSummaryDescription)
customElements.define('lla-post-summary-link', PostSummaryLink)
export { PostSummary, PostSummaryTitle, PostSummaryDescription, PostSummaryLink }
