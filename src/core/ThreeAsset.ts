import EventDispatcher from './EventDispatcher'
import preventReactive from '../util/preventReactive'
import uuid from 'uuid/v1'

let id = 0

/**
 * ThreeJS 中的对象的封装类
 */
export default class ThreeAsset extends EventDispatcher {
  private _threeAsset: any
  public uuid: number
  public type: string
  public isGeometry: boolean = false
  public isMaterial: boolean = false
  public version: number = 0

  constructor (threeAsset: any) {
    super()
    this.uuid = uuid()
    preventReactive(this, '_threeAsset')
    this.setThreeAsset(threeAsset)
  }

  public setThreeAsset (newAsset: any): void {
    let oldAsset = this._threeAsset
    this._threeAsset = newAsset

    if (newAsset) {
      this.type = newAsset.type || ''
      this.isGeometry = newAsset.isGeometry || false
      this.isMaterial = newAsset.isMaterial || false
    }

    this.version++

    this.$emit('update', {
      oldAsset: oldAsset,
      newAsset: newAsset
    })
  }

  public getThreeAsset (): any {
    return this._threeAsset
  }

  public dispose (): void {
    this.$emit('dispose')
  }
}
