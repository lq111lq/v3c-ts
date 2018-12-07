// import EventDispatcher from './core/EventDispatcher'
// import ThreeAssets from './core/ThreeAssets'

// export default {
//   EventDispatcher,
//   ThreeAssets
// }

import WebGLRenderer from './components/renderers/WebGLRenderer'

export default {
  version: '0.0.1',
  prefix: '',
  install (Vue, options) {
    console.log(WebGLRenderer)
    Vue.component('webgl-renderer', WebGLRenderer)
  }
}
