import EventDispatcher from './EventDispatcher'
import preventReactive from '../util/preventReactive'
let uid = 0

export default class ThreeAssets extends EventDispatcher {
  private _threeAssets: any
  private id: number
  private type: string
  private version: number = 0

  constructor (threeAssets: any) {
    super()
    this.id = ++uid
    preventReactive(this, '_threeAssets')
    this.setThreeAssets(threeAssets)
  }

  public setThreeAssets (newAssets: any): void {
    let oldAssets = this._threeAssets
    this._threeAssets = newAssets
    this.type = newAssets && newAssets.type || ''
    this.version++

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
