<script>
export default {
  name: 'LlamaAppStack',
  props: {
    as: {
      type: [String, Function],
      default: () => 'div',
    },
    direction: {
      type: String,
      default: () => 'column',
    },
    gap: {
      type: String,
      default: () => 'md',
    },
  },
  render() {
    const { as: As, direction, gap } = this.$props
    const other = { attrs: this.$attrs, on: this.$listeners }

    return (
      <As
        class={['stack', `stack-direction-${direction}`]}
        style={`--stack-gap: var(--spacing-${gap})`}
        {...other}
      >
        {this.$slots.default}
      </As>
    )
  },
}
</script>

<style scoped>
.stack {
  display: flex;
}

.stack-direction-column {
  flex-direction: column;
}

.stack-direction-row {
  flex-direction: row;
}

.stack-direction-column::v-deep > * + * {
  margin-top: var(--stack-gap);
}

.stack-direction-row::v-deep > * + * {
  margin-left: var(--stack-gap);
}
</style>
