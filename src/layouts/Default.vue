<script>
import { AppBar, Css } from '@slate-ui/core'
import { Hidden, Link } from '~/components'

export default {
  components: { AppBar, Css, Hidden, Link },
}
</script>

<template>
  <Css>
    <AppBar class="app-bar" theme="light">
      <AppStack direction="row" gap="xs">
        <g-link class="nav-link" active-class="active" to="/" exact>
          Home
        </g-link>
        <g-link class="nav-link" active-class="active" to="/posts">
          Notes
        </g-link>
      </AppStack>
      <AppStack class="social-links" direction="row" gap="xs">
        <Link
          class="social-link"
          href="https://www.instagram.com/llamallamaadventure/"
        >
          <Hidden>Instagram</Hidden>
          <IconLogoInstagram />
        </Link>
        <Link
          class="social-link"
          href="https://www.facebook.com/llamallamaadventure"
        >
          <Hidden>Facebook</Hidden>
          <IconLogoFacebook />
        </Link>
        <Link class="social-link" href="mailto:lia@liaeyre.com">
          <Hidden>Email</Hidden>
          <IconMessage />
        </Link>
      </AppStack>
    </AppBar>
    <main class="main">
      <slot />
    </main>
  </Css>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style scoped>
.app-bar {
  padding: var(--spacing-xs) var(--spacing-sm);
  --border: var(--border-none);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
}

.app-bar::v-deep .container {
  max-width: var(--breakpoint-lg);
}

.nav-link {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: var(--text-transform-uppercase);
  letter-spacing: 2px;
  line-height: var(--line-height-none);
  color: var(--color-text-primary);
}

.nav-link.active,
.nav-link:hover {
  color: var(--color-brand-700);
}

.social-links {
  margin-left: var(--spacing-md);
}

.social-link {
  --color-icon-primary: var(--color-text-primary);
  display: block;
  width: var(--font-size-lg);
  height: var(--font-size-lg);
}

.social-link:hover {
  --color-icon-primary: var(--color-brand-700);
}

.social-link svg {
  display: block;
}

.main {
  display: block;
  padding: var(--spacing-2xl) var(--spacing-sm);
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap');

:root {
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-family-heading: 'Bitter', serif;
  --font-weight-bold: 700;

  --line-height-sm: 1.25;
  --line-height-md: 1.5;
  --line-height-lg: 1.8;

  --color-brand-100: #f6f7f8;
  --color-brand-500: #9fee80;
  --color-brand-700: #58c42e;
  --color-text-primary: #4e616c;

  --z-index-sticky: 10;

  /* Temporary dark mode */
  /* --color-background-light: #000;
  --color-background: #222;
  --color-text-primary: #fff;
  --color-text-secondary: #ccc;
  --color-icon-primary: #ddd;
  --color-icon-secondary: #aaa; */
}

*,
*:before,
*:after {
  position: relative;
}

strong {
  font-size: inherit;
  --font-weight: var(--font-weight-bold);
}

body {
  background: var(--color-background-light);
}

iframe {
  border: none;
  display: block;
  width: 100%;
}
</style>
