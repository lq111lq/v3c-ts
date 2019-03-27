import * as THREE from 'three'
import ThreeAsset from '../../core/ThreeAsset'
import AssetsRepository from 'src/core/AssetsRepository'
import { Component, Prop, Provide, Inject, Vue, Watch } from 'vue-property-decorator'
import Geometry from './Geometry'

@Component({ name: 'BoxGeometry' })
export default class BoxGeometry extends Geometry {
  @Prop({ default: 1 }) width!: number | string
  @Prop({ default: 1 }) height!: number | string
  @Prop({ default: 1 }) depth!: number | string
  @Prop({ default: 1 }) widthSegments!: number | string
  @Prop({ default: 1 }) heightSegments!: number | string
  @Prop({ default: 1 }) depthSegments!: number | string

  @Watch('width')
  @Watch('height')
  @Watch('depth')
  @Watch('widthSegments')
  @Watch('heightSegments')
  @Watch('depthSegments')
  doUpdateGeometryAsset () {
    this.updateGeometryAsset()
  }

  createGeometry () {
    return new THREE.BoxGeometry(
      Number(this.width),
      Number(this.height),
      Number(this.depth),
      Number(this.widthSegments),
      Number(this.heightSegments),
      Number(this.depthSegments)
    )
  }
}
