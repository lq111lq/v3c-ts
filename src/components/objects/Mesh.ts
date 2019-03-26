import * as THREE from 'three'
import { Component, Provide, Watch } from 'vue-property-decorator'
import Object3D from 'src/components/core/Object3D'
import AssetsRepository from 'src/core/AssetsRepository'
import ThreeAssets from 'src/core/ThreeAssets';

class MeshAssetsRepository extends AssetsRepository {
  materialAsset: ThreeAssets = null
  geometryAssets: ThreeAssets = null

  public set (key: string, type: string, threeAssets: ThreeAssets) {
    if (type === 'material') {
      this.materialAsset = threeAssets
    } else if (type === 'geometry') {
      this.geometryAssets = threeAssets
    }
  }

  public get (key: string, type: string) {
    if (type === 'material') {
      return this.materialAsset
    } else if (type === 'geometry') {
      return this.geometryAssets
    }
  }
}

const defGeometry = new ThreeAssets(new THREE.BoxGeometry(1, 1, 1))
const defMaterial = new ThreeAssets(new THREE.MeshBasicMaterial({ color: 0x00ff00 }))


@Component({ name: 'Mesh' })
export default class Mesh extends Object3D {
  @Provide('assetsRepository') assetsRepository: AssetsRepository = new MeshAssetsRepository()

  get geometryAssets () {
    return this.assetsRepository.get('','geometry') || defGeometry
  }

  get materialAssets () {
    return this.assetsRepository.get('','material') || defMaterial
  }

  @Watch('materialAssets', { immediate: true, deep: true })
  materialChanged (newMaterial) {
    let o = this.getObject3D() as THREE.Mesh
    if (o) {
      o.material = newMaterial.getThreeAssets()
    }
  }

  @Watch('geometryAssets', { immediate: true, deep: true })
  geometryChanged (newGeometry) {
    let o = this.getObject3D() as THREE.Mesh
    if (o) {
      o.geometry = newGeometry.getThreeAssets()
    }
  }

  createObject3D (): THREE.Object3D {
    let mesh = new THREE.Mesh(this.geometryAssets.getThreeAssets(), this.materialAssets.getThreeAssets())
    return mesh
  }
}
