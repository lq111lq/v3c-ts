import ThreeAssets from './ThreeAssets'
import Vue from 'Vue'

export default class AssetsRepository{
  private threeAssetsMap: object = {}

  public set (key: string, type: string, threeAssets: ThreeAssets) {
    if (!key) {
      return
    }
    Vue.set(this.threeAssetsMap, type + ':' + key, threeAssets)
  }

  public get (key: string, type: string) {
    return this.threeAssetsMap[type + ':' + key]
  }

  public delete (key: string, type: string, threeAssets) {
    if (this.threeAssetsMap[type + ':' + key] === threeAssets) {
      Vue.delete(this.threeAssetsMap, type + ':' + key)
    }
  }
}
