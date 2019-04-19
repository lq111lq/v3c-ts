
import * as THREE from 'three'
import { Component } from 'vue-property-decorator'
import Camera from 'src/components/cameras/Camera'

@Component({ name: 'PerspectiveCamera' })
export default class PerspectiveCamera extends Camera {
  createObject3D (): THREE.Object3D {
    return new THREE.PerspectiveCamera()
  }
}
