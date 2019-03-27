import * as THREE from 'three'
import ThreeAssets from '../../core/ThreeAsset'
import AssetsRepository from 'src/core/AssetsRepository'
import { Component, Prop, Provide, Inject, Vue, Watch } from 'vue-property-decorator'
import Base from 'src/core/Base'

@Component({ name: 'Material' })
export default class Material extends Base {
  materialAssets: ThreeAssets = new ThreeAssets(null)

  @Inject({ default: null }) assetsRepository!: AssetsRepository
  @Prop({ default: false }) wireframe!: boolean
  @Prop({ default: false }) transparent!: boolean
  @Prop({ default: 1 }) opacity!: number
  @Prop({ default: '' }) id!: string

  @Watch('wireframe')
  updateWireframe () {
    let material = this.getMaterial()
    if (material) {
      material.wireframe = this.wireframe
      material.needsUpdate = true
    }
  }

  @Watch('transparent')
  updateTransparent () {
    let material = this.getMaterial()
    if (material) {
      material.transparent = this.transparent
      material.needsUpdate = true
    }
  }

  @Watch('opacity')
  updateOpacity () {
    let material = this.getMaterial()
    if (material) {
      material.opacity = this.opacity
      material.needsUpdate = true
    }
  }

  createMaterial () {
    return new THREE.Material()
  }

  created () {
    this.materialAssets.setThreeAsset(this.createMaterial())

    if (this.assetsRepository && this.materialAssets) {
      this.assetsRepository.set(this.id, this.materialAssets)
    }
  }

  destroyed () {
    if (this.assetsRepository && this.materialAssets) {
      this.assetsRepository.delete(this.id, this.materialAssets)
    }
    let material = this.getMaterial()
    material && material.dispose()
  }

  getMaterial () {
    return this.materialAssets.getThreeAsset()
  }
}
