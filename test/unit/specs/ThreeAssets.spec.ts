import ThreeAssets from '../../../src/core/ThreeAssets'
import Vue from 'vue'

describe('ThreeAssets类', () => {
  it('ThreeAssets', () => {
    let aThreeAssets = { name: 'A Three Assets' }
    let ta = new ThreeAssets(aThreeAssets)

    chai.expect(ta.getThreeAssets()).to.equal(aThreeAssets)

    let newThreeAssets = { name: 'B Three Assets' }
    let hasUpdate = false
    ta.$on('update',function ({ oldAssets, newAssets}) {
      chai.expect(oldAssets).to.equal(aThreeAssets)
      chai.expect(newAssets).to.equal(newThreeAssets)
      hasUpdate = true
    })
    ta.setThreeAssets(newThreeAssets)

    chai.expect(hasUpdate).to.equal(true)
  })

  it('vue', () => {
    let aThreeAssets = { name: 'A Three Assets' }
    let threeAssets = new ThreeAssets(aThreeAssets)

    const vm = new Vue({
      el: document.createElement('div'),
      data: {
        threeAssets
      },
      render: function (h) {
        console.log('render', this.threeAssets)
        return h('div',[this.threeAssets.toString()])
      }
    })

    console.log(vm.$el)
    console.log(vm.threeAssets)
    console.log(vm.threeAssets.getThreeAssets())
  })
})
