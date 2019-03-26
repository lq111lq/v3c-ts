import WebGLRenderer from 'src/components/renderers/WebGLRenderer'
import Scene from 'src/components/scene/Scene'
import Mesh from 'src/components/objects/Mesh'
import Material from 'src/components/material/Material'
import MeshBasicMaterial from 'src/components/material/MeshBasicMaterial'

import Geometry from 'src/components/geometry/Geometry'
import BoxGeometry from 'src/components/geometry/BoxGeometry'
const prefix: string = 'v3c-'

export default {
  version: '0.0.1',
  prefix: '',
  install (Vue, options) {
    Vue.component(`${prefix}webgl-renderer`, WebGLRenderer)
    Vue.component(`${prefix}scene`, Scene)
    Vue.component(`${prefix}mesh`, Mesh)

    Vue.component(`${prefix}material`, Material)
    Vue.component(`${prefix}mesh-basic-material`, MeshBasicMaterial)

    Vue.component(`${prefix}geometry`, Geometry)
    Vue.component(`${prefix}box-geometry`, BoxGeometry)
  }
}
