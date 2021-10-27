<script>
export default {
  props: {
    href: String,
    to: String,
    display: {
      type: String,
      default: () => 'inline',
    },
  },
}
</script>

<template>
  <a
    v-if="href"
    :class="['link', `link-display-${display}`]"
    :href="href"
    target="_blank"
    rel="noreferrer"
  >
    <slot></slot>
  </a>
  <g-link v-else :class="['link', `link-display-${display}`]" :to="to">
    <slot></slot>
  </g-link>
</template>

<style scoped>
.link {
  font-size: inherit;
  color: var(--color-brand-700);
  font-weight: var(--font-weight-bold);
}

.link-display-block {
  display: block;
}
</style>
