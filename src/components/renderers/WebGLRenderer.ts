import { Component, Prop, Vue } from 'vue-property-decorator'
import ThreeAssets from '../../core/ThreeAssets'
class RenderContext {
  renderer: ThreeAssets | null = null
  scene: ThreeAssets | null = null
  camera: ThreeAssets | null = null

  constructor () {
  }

}

@Component
export default class WebGLRenderer extends Vue {
  @Prop({ default: '400' }) private width!: number
  @Prop({ default: '400' }) private height!: number

  renderContext:RenderContext = new RenderContext()

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
}

// import Vue from 'vue'
// export default Vue.extend({
//   props: {
//     width: {
//       type: Number,
//       default: 400
//     },
//     height: {
//       type: Number,
//       default: 400
//     }
//   },
//   render (createElement) {
//     return createElement(
//       'div',
//       {
//         style: {
//           width: this.width + 'px',
//           height: this.height + 'px'
//         }
//       },
//       this.$slots.default
//     )
//   }
// })
