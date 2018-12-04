import EventDispatcher from './EventDispatcher'
import preventReactive from './util/preventReactive'
let uid = 0

export default class ThreeAssets extends EventDispatcher {
  private _threeAssets: any
  private id: string = `assetes: ${ ++uid }`

  constructor (threeAssets: any) {
    super()
    preventReactive(this, '_threeAssets')
    this.setThreeAssets(threeAssets)
  }

  public setThreeAssets (newAssets: any): void {
    let oldAssets = this._threeAssets
    this._threeAssets = newAssets
    // Object.defineProperty(this, '_threeAssets', {
    //   value : newAssets,
    //   configurable : true,
    //   writable: true,
    //   enumerable: false
    // })

    this.$emit('update', {
      oldAssets: oldAssets,
      newAssets: newAssets
    })
  }

  public getThreeAssets (): any {
    return this._threeAssets
  }

  public dispose (): void {
    this.$emit('dispose')
  }
}
