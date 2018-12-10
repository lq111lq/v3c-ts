import remove from 'lodash.remove'
let renderList = []

function render () {
  requestAnimationFrame(render)
  for (const renderer of renderList) {
    renderer.contextRender()
  }
}

render()

export default {
  add (renderer) {
    renderList.push(renderer)
  },
  remove (renderer) {
    remove(renderList, n => n === renderer)
  }
}
