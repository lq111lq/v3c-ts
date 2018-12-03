
import EventDispatcher from '../../../src/core/EventDispatcher'

class Sub extends EventDispatcher {}

describe('EventDispatcher类', () => {
  it('$on and $emit', () => {
    let sub = new Sub()
    sub.setEventErrorHandler(e => {
      throw e
    })

    sub.$emit('test')

    sub.$on('test', function (...arg) {
      chai.expect(this).to.equal(sub)
      chai.expect(arg).to.deep.equal([1,2,3,4])
    })

    sub.$emit('test', 1, 2, 3, 4)
  })
})
