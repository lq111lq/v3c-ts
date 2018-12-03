import EventDispatcher from './core/EventDispatcher'

class Dog extends EventDispatcher {
  bark () {
    this.$emit('bark')
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.$on('bark', () => {
  console.log(dog)
})

dog.bark()
dog.$off
