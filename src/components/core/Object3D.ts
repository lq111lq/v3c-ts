import * as THREE from 'three'
import { Component, Prop, Provide, Inject, Vue, Watch } from 'vue-property-decorator'
import ThreeAssets from '../../core/ThreeAssets'

interface xyz {
  x: number
  y: number
  z: number
}

function xyzDefaultValueFn (defaultValue:number = 0):Function {
  return function ():xyz {
    return {
      x: defaultValue,
      y: defaultValue,
      z: defaultValue
    }
  }
}

@Component
export default class WebGLRenderer extends Vue {
  @Prop({ default: xyzDefaultValueFn(0) }) private position!: xyz
  @Prop({ default: xyzDefaultValueFn(0) }) private rotation!: xyz
  @Prop({ default: xyzDefaultValueFn(1) }) private scale!: xyz

  name:string = 'Object3D'

  @Provide('parentObject3DAssets') Object3DAssets: ThreeAssets = new ThreeAssets(null)
  @Inject({ default: null }) parentObject3DAssets!: ThreeAssets

  render (createElement) {
    return createElement('span', { style: { display: 'none'}}, this.$slots.default)
  }

  @Watch('position', { immediate: true, deep: true })
  @Watch('rotation', { immediate: true, deep: true })
  @Watch('scale', { immediate: true, deep: true })
  update(val: string, oldVal: string) {
    var object3D = this.getObject3D()
    if (object3D) {
      object3D.position.x = Number(this.position.x)
      object3D.position.y = Number(this.position.y)
      object3D.position.z = Number(this.position.z)

      object3D.scale.x = Number(this.scale.x)
      object3D.scale.y = Number(this.scale.y)
      object3D.scale.z = Number(this.scale.z)

      object3D.rotation.x = Number(this.rotation.x)
      object3D.rotation.y = Number(this.rotation.y)
      object3D.rotation.z = Number(this.rotation.z)
    }
  }

  createObject3D ():THREE.Object3D {
    return new THREE.Object3D()
  }

  getObject3D ():THREE.Object3D | null {
    if (this.Object3DAssets) {
      return this.Object3DAssets.getThreeAssets()
    }
  }

  getParentObject3D ():THREE.Object3D | null  {
    if (this.parentObject3DAssets) {
      return this.parentObject3DAssets.getThreeAssets()
    }
  }

  created () {
    if (typeof this.createObject3D === 'function') {
      this.Object3DAssets.setThreeAssets(this.createObject3D())
    }

    let object3D:THREE.Object3D = this.getObject3D()
    let parentObject3D:THREE.Object3D = this.getParentObject3D()

    if (object3D && parentObject3D) {
      parentObject3D.add(object3D)
    }
  }
}
