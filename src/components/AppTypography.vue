<script>
export default {
  name: 'LlamaAppTypography',
  props: {
    as: {
      type: [String, Function],
      default: () => 'div',
    },
  },
  render() {
    const { as: As } = this.$props
    const other = { attrs: this.$attrs, on: this.$listeners }

    return (
      <As class={[this.$style.typography]} {...other}>
        {this.$slots.default}
      </As>
    )
  },
}
</script>

<style module>
.typography > *:first-child {
  margin-block-start: var(--spacing-none);
}

.typography > *:last-child {
  margin-block-end: var(--spacing-none);
}

.typography > * {
  margin-block-start: var(--spacing-sm);
  margin-block-end: var(--spacing-sm);
}

.typography h1,
.typography h2,
.typography h3,
.typography h4,
.typography h5,
.typography h6 {
  margin-block-start: var(--spacing-3xl);
  font-family: var(--font-family-heading);
  --font-weight: var(--font-weight-bold);
}

.typography h1,
.typography h2 {
  --font-size: var(--font-size-2xl);
  --line-height: var(--line-height-md);
}

.typography h3 {
  --font-size: var(--font-size-xl);
  --line-height: var(--line-height-md);
}

.typography h4,
.typography h5,
.typography h6 {
  --font-size: var(--font-size-lg);
  --line-height: var(--line-height-lg);
}

.typography p {
  --font-size: var(--font-size-lg);
  --line-height: var(--line-height-lg);
  --font-weight: var(--font-weight-normal);
}

.typography a {
  --font-size: inherit;
  --line-height: inherit;
  --font-weight: var(--font-weight-bold);
  color: var(--color-brand-700);
}

.typography a:hover {
  text-decoration: underline;
}

.typography li {
  --font-size: var(--font-size-lg);
  --line-height: var(--line-height-md);
  --font-weight: var(--font-weight-normal);
}

.typography li:not(:last-child) {
  margin-block-end: var(--spacing-2xs);
}

.typography ol {
  list-style: decimal;
  /* padding-inline-start: calc(var(--spacing-sm) + var(--spacing-4xs)); */
  padding-inline-start: var(--spacing-md);
}

.typography ul {
  list-style: none;
  padding-inline-start: var(--spacing-xs);
}

.typography ul li {
  padding-inline-start: var(--spacing-xs);
}

.typography ul li:not([class*='task-list-item'])::before {
  border: var(--border-size-lg) solid var(--color-brand-500);
  content: '';
  display: block;
  position: absolute;
  inline-size: var(--spacing-2xs);
  block-size: var(--spacing-2xs);
  inset-inline-start: 0;
  inset-block-start: 0;
  border-radius: var(--border-radius-full);
  transform: translate3d(-100%, var(--spacing-3xs), 0);
}

.typography ul li[class*='task-list-item'] {
  padding-inline-start: var(--spacing-0);
  margin-inline-start: calc(-1 * var(--spacing-xs));
}

.typography ul li input[type='checkbox'] {
  /* Remove native input styles */
  appearance: none;
  /* For iOS < 15 to remove gradient background */
  background-color: var(--color-background-light);
  margin: 0 var(--spacing-3xs) 0 0;
  font: inherit;
  inline-size: 1em;
  block-size: 1em;
  border: var(--border-size-md) solid var(--color-text-primary);
  border-radius: var(--border-radius-sm);
  display: inline-grid;
  place-content: center;
}

input[type='checkbox']::before {
  content: '';
  inline-size: 0.75em;
  block-size: 0.75em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  box-shadow: inset 1em 1em var(--color-brand-700);
}

input[type='checkbox']:checked::before {
  transform: scale(1);
}
</style>
