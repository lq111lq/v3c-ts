import * as THREE from 'three'
import { Component, Provide, Watch } from 'vue-property-decorator'
import Object3D from 'src/components/core/Object3D'
import AssetsRepository from 'src/core/AssetsRepository'
import ThreeAsset from 'src/core/ThreeAsset';

class MeshAssetsRepository extends AssetsRepository {
  public materialAsset: ThreeAsset = null
  public geometryAsset: ThreeAsset = null

  public set (key: string, threeAsset: ThreeAsset) {
    if (threeAsset.isMaterial) {
      if (this.materialAsset) {
        console.warn('复数个材质')
      }
      this.materialAsset = threeAsset
    } else if (threeAsset.isGeometry) {
      if (this.geometryAsset) {
        console.warn('复数个几何体')
      }
      this.geometryAsset = threeAsset
    }
  }
}

const defGeometry = new ThreeAsset(new THREE.BoxGeometry(1, 1, 1))
const defMaterial = new ThreeAsset(new THREE.MeshBasicMaterial({ color: 0x00ff00 }))


@Component({ name: 'Mesh' })
export default class Mesh extends Object3D {
  @Provide('assetsRepository') assetsRepository: MeshAssetsRepository = new MeshAssetsRepository()

  get geometryAsset () {
    return this.assetsRepository.geometryAsset || defGeometry
  }

  get materialAsset () {
    return this.assetsRepository.materialAsset || defMaterial
  }

  @Watch('materialAsset', { immediate: true, deep: true })
  materialChanged (newMaterial) {
    let o = this.getObject3D() as THREE.Mesh
    if (o) {
      o.material = newMaterial.getThreeAsset()
    }
  }

  @Watch('geometryAsset', { immediate: true, deep: true })
  geometryChanged (newGeometry) {
    let o = this.getObject3D() as THREE.Mesh
    if (o) {
      o.geometry = newGeometry.getThreeAsset()
    }
  }

  createObject3D (): THREE.Object3D {
    let mesh = new THREE.Mesh(this.geometryAsset.getThreeAsset(), this.materialAsset.getThreeAsset())
    return mesh
  }
}
