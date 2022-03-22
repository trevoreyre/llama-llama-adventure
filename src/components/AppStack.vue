<script>
export default {
  name: 'LlamaAppStack',
  props: {
    as: {
      type: [String, Function],
      default: () => 'div',
    },
    align: {
      type: String,
      default: () => 'start',
    },
    direction: {
      type: String,
      default: () => 'column',
    },
    gap: {
      type: String,
      default: () => 'md',
    },
    wrap: {
      type: Boolean,
      default: () => true,
    },
  },
  render() {
    const { as: As, align, direction, gap, wrap } = this.$props
    const other = { attrs: this.$attrs, on: this.$listeners }

    return (
      <As
        class={[
          'stack',
          `stack-align-${align}`,
          `stack-direction-${direction}`,
          `stack-wrap-${wrap}`,
        ]}
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
  gap: var(--stack-gap);
}

/* align */
.stack-align-start {
  align-items: flex-start;
}
.stack-align-center {
  align-items: center;
}
.stack-align-end {
  align-items: flex-end;
}
.stack-align-stretch {
  align-items: stretch;
}

/* direction */
.stack-direction-column {
  flex-direction: column;
}
.stack-direction-row {
  flex-direction: row;
}

/* wrap */
.stack-wrap-true {
  flex-wrap: wrap;
}
.stack-wrap-false {
  flex-wrap: nowrap;
}
</style>
