import preventReactive from './util/preventReactive'

/**
 * EventDispatcher基类，提供事件的监听，和触发功能。
 */
export default class EventDispatcher {
  /**
   * 用于存储 event 和 callback 映射关系的对象
   */
  private _events: object = Object.create(null)
  private _eventErrorHandler: Function = function name (e: Error, message: string) {
    console.log(message)
  }

  constructor () {
    preventReactive(this, '_events')
    preventReactive(this, '_eventErrorHandler')
  }
  public setEventErrorHandler (value: Function) {
    this._eventErrorHandler = value
  }

  /**
   * 监听当前实例上的自定义事件。
   * @param event - 事件名.
   * @param fn - 事件处理函数.
   */
  $on (event: string | Array<string>, fn: Function): void {
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.$on(event[i], fn)
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn)
    }
  }
  /**
   * 监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。
   * @param event - 事件名.
   * @param fn - 事件处理函数.
   */
  $once (event: string, fn: Function): void {
    function on () {
      this.$off(event, on)
      fn.apply(this, arguments)
    }
    on.fn = fn
    this.$on(event, on)
  }

  /**
   * 触发当前实例上的事件。附加参数都会传给监听器回调。。
   * @param event - 事件名.
   * @param args - 附加的参数.
   */
  $emit (event: string, ...args: any[]): void {
    let cbs = this._events[event]
    if (cbs) {
      for (let i = 0; i < cbs.length; i++) {
        try {
          cbs[i].apply(this, args)
        } catch (e) {
          this._eventErrorHandler(e, `apply event handler for "${event}" fail`)
        }
      }
    }
  }

  /**
   * 移除当前实例上的自定义事件监听器。
   * 如果没有提供参数，则移除所有的事件监听器。
   * 如果只提供了事件，则移除该事件所有的监听器。
   * 如果同时提供了事件与回调，则只移除这个回调的监听器。
   * @param event - 事件名.
   * @param fn - 事件处理函数.
   */
  $off (event?: string | Array<string>, fn?: Function): void {
    if (!arguments.length) {
      this._events = Object.create(null)
    }

    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.$off(event[i], fn)
      }
      return
    }

    const cbs = this._events[event]

    if (!cbs) {
      return
    }

    if (fn) {
      let cb
      let i = cbs.length
      while (i--) {
        cb = cbs[i]
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1)
          break
        }
      }
    } else {
      this._events[event] = null
    }
  }
}
