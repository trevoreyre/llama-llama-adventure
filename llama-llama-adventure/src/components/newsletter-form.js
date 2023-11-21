import { css, html, LitElement } from 'lit'
import { normalize } from 'llama-llama-ui/src/normalize.css.js'

class NewsletterForm extends LitElement {
  render() {
    return html`
      <iframe
        src="https://embeds.beehiiv.com/cac27d20-cb47-414f-bed6-d42a2654cc00?slim=true"
        data-test-id="beehiiv-embed"
        height="52"
        frameborder="0"
        scrolling="no"
      ></iframe>
    `
  }

  static styles = [
    normalize,
    css`
      iframe {
        inline-size: 100%;
        margin: 0;
        border-radius: 0;
      }
    `,
  ]
}

customElements.define('lla-newsletter-form', NewsletterForm)
export { NewsletterForm }
