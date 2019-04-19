/**
 * 将 target 的 propertyKey 设为不可枚举型，阻止vue对 propertyKey 进行响应式初始化。
 */
export default function preventReactive (target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    configurable : true,
    writable: true,
    enumerable: false
  })
}
