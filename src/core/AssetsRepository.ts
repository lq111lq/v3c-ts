import ThreeAsset from './ThreeAsset'
import Vue from 'Vue'

export default class AssetsRepository{
  private threeAssetsMap: object = {}

  public set (key: string, threeAssets: ThreeAsset) {
    if (!key) {
      return
    }
    Vue.set(this.threeAssetsMap, key, threeAssets)
  }

  public get (key: string) {
    return this.threeAssetsMap[key]
  }

  public delete (key: string, threeAssets) {
    if (this.threeAssetsMap[key] === threeAssets) {
      Vue.delete(this.threeAssetsMap, key)
    }
  }
}
