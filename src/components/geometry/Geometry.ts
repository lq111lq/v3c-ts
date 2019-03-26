import * as THREE from 'three'
import ThreeAssets from '../../core/ThreeAssets'
import AssetsRepository from 'src/core/AssetsRepository'
import { Component, Prop, Provide, Inject, Vue, Watch } from 'vue-property-decorator'
import Base from 'src/core/Base'

@Component({ name: 'Geometry' })
export default class Geometry extends Base {
  geometryAssets: ThreeAssets = new ThreeAssets(null)

  @Inject({ default: null }) assetsRepository!: AssetsRepository

  @Prop({ default: '' }) id!: string

  getGeometry (): THREE.Geometry {
    return this.geometryAssets.getThreeAssets()
  }

  createGeometry () {
    return new THREE.Geometry()
  }

  updateGeometryAssets () {
    this.destroyGeometry()
    this.geometryAssets.setThreeAssets(this.createGeometry())
  }

  destroyGeometry () {
    let oldGeometry: THREE.Geometry = this.getGeometry()
    oldGeometry && oldGeometry.dispose()
  }

  created () {
    this.updateGeometryAssets()
    if (this.assetsRepository && this.geometryAssets) {
      this.assetsRepository.set(this.id, 'geometry', this.geometryAssets)
    }
  }

  destroyed () {
    this.destroyGeometry()
  }
}
