<script>
import { H1, H2, H3, H4, H5, H6, typographyProps } from '@slate-ui/core'

const sizeToComponent = { xs: H6, sm: H5, md: H4, lg: H3, xl: H2, '2xl': H1 }

export default {
  components: { H1, H2, H3, H4, H5, H6 },
  props: {
    as: {
      type: [String, Function],
      default: () => 'h2',
    },
    size: {
      ...typographyProps.fontSize,
      default: () => 'md',
    },
    weight: typographyProps.fontWeight,
    lineHeight: typographyProps.lineHeight,
    letterSpacing: typographyProps.letterSpacing,
  },
  render() {
    const { as, size, weight, lineHeight, letterSpacing } = this.$props
    const other = { attrs: this.$attrs, on: this.$listeners }
    const Component = sizeToComponent[size]

    return (
      <Component
        as={as}
        class="heading"
        fontWeight={weight}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        {...other}
      >
        {this.$slots.default}
      </Component>
    )
  },
}
</script>

<style scoped>
.heading {
  font-family: var(--font-family-heading);
}
</style>
