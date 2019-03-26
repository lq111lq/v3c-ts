import * as THREE from 'three'
import Material from './Material';
import { Component, Provide, Watch, Prop } from 'vue-property-decorator'

@Component({ name: 'MeshBasicMaterial' })
export default class MeshBasicMaterial extends Material {
  @Prop({ default: 0xffffff }) color!: string | number

  @Watch('color')
  updateColor () {
    let material = this.getMaterial()
    if (material) {
      material.color = new THREE.Color(this.color)
      material.needsUpdate = true
    }
  }

  createMaterial () {
    return new THREE.MeshBasicMaterial({
      color: this.color,
      wireframe: this.wireframe
    })
  }
}
