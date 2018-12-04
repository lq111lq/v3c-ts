export default function preventReactive (target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    configurable : true,
    writable: true,
    enumerable: false
  })
}
