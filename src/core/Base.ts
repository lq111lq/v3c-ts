import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'Object3D' })
export default class Base extends Vue {
  render (createElement) {
    return createElement('span', { style: { display: 'none' } }, this.$slots.default)
  }
}
