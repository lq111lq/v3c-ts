import * as THREE from 'three'
import { Component, Prop, Provide, Inject, Vue, Watch } from 'vue-property-decorator'
import ThreeAsset from 'src/core/ThreeAsset'
import Base from 'src/core/Base'

type XYZ = [number, number, number]

function xyzDefaultValueFn (defaultValue: number = 0): Function {
  return function (): XYZ {
    return [defaultValue, defaultValue, defaultValue]
  }
}

@Component({ name: 'Object3D' })
export default class Object3D extends Base {
  @Prop({ default: xyzDefaultValueFn(0) }) private position!: XYZ
  @Prop({ default: xyzDefaultValueFn(0) }) private rotation!: XYZ
  @Prop({ default: xyzDefaultValueFn(1) }) private scale!: XYZ

  @Provide('parentObject3D') object3dAssets: ThreeAsset = new ThreeAsset(null)
  @Inject({ default: null }) parentObject3D!: ThreeAsset

  @Watch('position', { immediate: true, deep: true })
  updatePosition (val?: string, oldVal?: string) {
    let object3D = this.getObject3D()
    let [x, y, z] = this.position
    if (object3D) {
      object3D.position.x = Number(x)
      object3D.position.y = Number(y)
      object3D.position.z = Number(z)
    }
  }

  @Watch('scale', { immediate: true, deep: true })
  updateScale (val?: string, oldVal?: string) {
    let object3D = this.getObject3D()
    let [x, y, z] = this.scale
    if (object3D) {
      object3D.scale.x = Number(x)
      object3D.scale.y = Number(y)
      object3D.scale.z = Number(z)
    }
  }

  @Watch('rotation', { immediate: true, deep: true })
  updateRotation (val?: string, oldVal?: string) {
    let object3D = this.getObject3D()
    let [x, y, z] = this.rotation
    if (object3D) {
      object3D.rotation.x = Number(x)
      object3D.rotation.y = Number(y)
      object3D.rotation.z = Number(z)
    }
  }

  createObject3D (): THREE.Object3D {
    return new THREE.Object3D()
  }

  getObject3D (): THREE.Object3D | null {
    if (this.object3dAssets) {
      return this.object3dAssets.getThreeAsset()
    }
  }

  getParentObject3D (): THREE.Object3D | null {
    if (this.parentObject3D) {
      return this.parentObject3D.getThreeAsset()
    }
  }

  created () {
    if (typeof this.createObject3D === 'function') {
      this.object3dAssets.setThreeAsset(this.createObject3D())
      this.updatePosition()
      this.updateRotation()
      this.updateScale()
    }

    let object3D: THREE.Object3D = this.getObject3D()
    let parentObject3D: THREE.Object3D = this.getParentObject3D()

    if (object3D && parentObject3D) {
      parentObject3D.add(object3D)
    } else {
      console.log('no parent')
    }
  }
}
