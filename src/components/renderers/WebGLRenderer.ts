import * as THREE from 'three'
import { Component, Prop, Vue } from 'vue-property-decorator'
import ThreeAsset from '../../core/ThreeAsset'
import renderList from 'src/util/renderList'
import Scene from 'src/components/scene/Scene'

class RenderContext {
  rendererAsset: ThreeAsset = new ThreeAsset(null)
  sceneAsset: ThreeAsset = new ThreeAsset(null)
  cameraAsset: ThreeAsset = new ThreeAsset(null)

  get renderer () {
    return this.rendererAsset.getThreeAsset()
  }

  set renderer (value) {
    this.rendererAsset.setThreeAsset(value)
  }

  get scene () {
    return this.sceneAsset.getThreeAsset()
  }

  set scene (value) {
    this.sceneAsset.setThreeAsset(value)
  }

  get camera () {
    return this.cameraAsset.getThreeAsset()
  }

  set camera (value) {
    this.cameraAsset.setThreeAsset(value)
  }
}

@Component
export default class WebGLRenderer extends Vue {
  @Prop({ default: '400' }) private width!: number
  @Prop({ default: '400' }) private height!: number

  renderContext: RenderContext = new RenderContext()

  render (createElement) {
    return createElement(
      'div',
      {
        style: {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      },
      this.$slots.default
    )
  }

  created () {
    let renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(this.width, this.height)
    renderer.domElement.style.display = 'block'

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    let scene = new THREE.Scene()

    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    let cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    this.renderContext.renderer = renderer
    this.renderContext.camera = camera
    this.renderContext.scene = scene

    renderList.add(this)
  }

  mounted () {
    let renderer = this.renderContext.renderer
    if (renderer) {
      this.$el.append(renderer.domElement)
    }
  }

  destroyed() {
    if (this.renderContext.renderer) {
      this.renderContext.renderer.dispose()
    }
  }

  updateRenderContext () {
    let renderContext = this.renderContext

    if (!this.$slots.default) {
      return
    }

    for (const slot of this.$slots.default) {
      let componentInstance = slot && slot.componentInstance

      if (!componentInstance) {
        continue
      }

      if (componentInstance instanceof Scene) {
        renderContext.sceneAsset = componentInstance.object3dAssets
      }
    }

  }

  contextRender () {
    this.updateRenderContext()

    let renderer = this.renderContext.renderer
    let camera = this.renderContext.camera
    let scene = this.renderContext.scene

    let aspect = this.width / this.height

    if (renderer && scene && camera) {
      renderer.setSize(this.width, this.height)

      if (camera.aspect !== aspect) {
        camera.aspect = aspect
        camera.updateProjectionMatrix()
      }

      renderer.render(
        scene,
        camera
      )
    }
  }
}
