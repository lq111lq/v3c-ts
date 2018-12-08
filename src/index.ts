// import EventDispatcher from './core/EventDispatcher'
// import ThreeAssets from './core/ThreeAssets'

// export default {
//   EventDispatcher,
//   ThreeAssets
// }

import WebGLRenderer from 'src/components/renderers/WebGLRenderer'
import Scene from 'src/components/scene/Scene'
import Mesh from 'src/components/objects/Mesh'

const prefix:string = 'v3c-'

export default {
  version: '0.0.1',
  prefix: '',
  install (Vue, options) {
    Vue.component(`${prefix}webgl-renderer`, WebGLRenderer)
    Vue.component(`${prefix}scene`, Scene)
    Vue.component(`${prefix}mesh`, Mesh)
  }
}
