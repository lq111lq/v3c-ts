import * as THREE from 'three'
import { Component } from 'vue-property-decorator'
import Object3D from 'src/components/core/Object3D'

@Component
export default class Scene extends Object3D {
  name: string = 'Scene'
  createObject3D (): THREE.Object3D {
    return new THREE.Scene()
  }
}
