import * as THREE from 'three'
import ThreeAsset from '../../core/ThreeAsset'
import AssetsRepository from 'src/core/AssetsRepository'
import { Component, Prop, Provide, Inject, Vue, Watch } from 'vue-property-decorator'
import Base from 'src/core/Base'

@Component({ name: 'Geometry' })
export default class Geometry extends Base {
  geometryAssets: ThreeAsset = new ThreeAsset(null)

  @Inject({ default: null }) assetsRepository!: AssetsRepository

  @Prop({ default: '' }) id!: string

  getGeometry (): THREE.Geometry {
    return this.geometryAssets.getThreeAsset()
  }

  createGeometry () {
    return new THREE.Geometry()
  }

  updateGeometryAsset() {
    this.destroyGeometry()
    this.geometryAssets.setThreeAsset(this.createGeometry())
  }

  destroyGeometry () {
    let oldGeometry: THREE.Geometry = this.getGeometry()
    oldGeometry && oldGeometry.dispose()
  }

  created () {
    this.updateGeometryAsset()
    if (this.assetsRepository && this.geometryAssets) {
      this.assetsRepository.set(this.id, this.geometryAssets)
    }
  }

  destroyed () {
    this.destroyGeometry()
  }
}
