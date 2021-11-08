import path from 'path'
import '@slate-ui/core/style.css'
import DefaultLayout from '~/layouts/Default.vue'

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Globally register all App* components and icons
  const requireContext = require.context(
    './components',
    true,
    /(?:App|Icon)\w+\.vue$/,
  )
  requireContext.keys().forEach(fileName => {
    const config = requireContext(fileName)
    const name = path.basename(fileName, '.vue')
    Vue.component(name, config.default || config)
  })
}
