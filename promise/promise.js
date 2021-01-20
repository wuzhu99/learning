// Promise 三个状态
const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

//resolvePromise 的实现遵循 Promise A+ 规范
const resolvePromise = (promise2, x, resolve, reject) => {
  // x 可能是普通值 也可能是Promise,当 x 与 Promise 相等时候 抛出一个错误
  // 判断x的值 =》 promise2的值
  if (x === promise2) {
    return reject(
      new TypeError('Chaining cycle detected for Promise #<Promise>')
    )
  }
  //  当 x 是一个对象或者函数
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called // 内部测试的时候 会成功和失败都调用
    //then如果是一个函数 防止then方法可能会被 Object.defineProperty定义,需要进行容错处理
    try {
      let then = x.then // 能保证不能再用次取then的值
      if (typeof then === 'function') {
        // then如果是一个函数 防止then方法可能会被 Object.defineProperty定义,需要进行容错处理
        //直接调用 then 并以当前调用成功的 resolve 作为 resolve 抛出，如果失败 则 以当前失败的 reject 作为 Promise 失败的原因
        then.call(
          x,
          (y) => {
            if (called) {
              return
            }
            called = true
            // 有可能还是一个Promise，直接解析出来的值是一个普通值
            resolvePromise(promise2, y, resolve, reject) // 采用Promise成功结果向下传递
          },
          (r) => {
            if (called) {
              return
            }
            called = true
            reject(r) // 采用Promise失败结果向下传递
          }
        )
      } else {
        //x是一个普通对象
        resolve(x) // 采用Promise成功结果向下传递
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true
      reject(e) // 采用Promise失败结果向下传递
    }
  } else {
    // x 是一个普通值
    resolve(x) // 直接让promise2成功即可
  }
}
class Promise {
  constructor(executor) {
    this.status = PENDING // 默认pending状态
    this.value = undefined // 成功返回的原因
    this.reason = undefined // 失败返回的原因
    this.onFulfilledCbs = []
    this.onRejectedCbs = []
    //成功
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCbs.forEach((fn) => fn())
      }
    }
    //失败
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCbs.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject) // 默认执行器立即执行
    } catch (e) {
      reject(e) // 报错直接抛出异常
    }
  }
  then(onFulfilled, onRejected) {
    // 成功的回调与失败的回调 参数可选
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    //then 函数是可以链式调用的 必然是返回了一个新的 Promise
    let promise2 = new Promise((resolve, reject) => {
      // 如果是成功就执行成功的回调用  失败就执行失败的回调
      /**
       * then 中的 回调函数 返回的也可能是个 Promise ，当返回的是个Promise的时候会以该Promise的状态向外传递
       * 假设返回的是个Promise，记为promise2，则需要先拿到当前的 Promise
       * 对当前 Promise 的 resolve reject 回调函数委托到外层 promise2 上进行处理
       * 使用 setTimeout 拿到 promise2,抽离出resolvePromise函数，而该函数恰是链式调用的关键所在
       */
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      // 如果是异步就先订阅好
      if (this.status === PENDING) {
        this.onFulfilledCbs.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCbs.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}

// 扩充 api
// 解决嵌套
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
