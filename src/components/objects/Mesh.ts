import * as THREE from 'three'
import { Component } from 'vue-property-decorator'
import Object3D from 'src/components/core/Object3D'

@Component
export default class Mesh extends Object3D {
  name: string = 'Mesh'
  createObject3D (): THREE.Object3D {
    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    let mesh = new THREE.Mesh(geometry, material)

    return mesh
  }
}
