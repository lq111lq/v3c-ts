import * as THREE from 'three'
import { Component } from 'vue-property-decorator'
import Object3D from 'src/components/core/Object3D'

@Component({ name: 'Scene' })
export default class Scene extends Object3D {
  createObject3D (): THREE.Object3D {
    return new THREE.Scene()
  }
}
