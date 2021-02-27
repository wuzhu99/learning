const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

//resolvePromise的实现遵循Promise+规范
const resolvePromise = (promise2, x, resolve, reject) => {
  // promise2的调用限制，防止多次调用成功和失败
  // resolve和reject均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
  let called
  if (x === promise2) {
    reject(
      //如果promise和x指向同一对象，以TypeError为据因拒绝执行promise
      new TypeError('Chaining cycle detected for Promise #<Promise>')
    )
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // x为对象或函数
    try {
      // 把x.then赋值给then 能保证不能再用次取then的值
      let then = x.then()
      if (typeof then === 'function') {
        // then如果是一个函数防止then方法可能会被Object.defineProperty定义,需要进行容错处理
        // 直接调用then并以当前调用成功的resolve作为resolve抛出，如果失败则以当前失败的reject作为Promise失败的原因
        then.call(
          (y) => {
            if (called) {
              return
            }
            called = true
            // y有可能还是一个Promise，递归调用resolvePromise直到解析出来的值是一个普通值/对象
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) {
              return
            }
            called = true
            reject(r)
          }
        )
      } else {
        // 如果x是一个普通对象让promise2成功
        resolve(x)
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true
      // 抛出异常则采用失败结果向下传递
      reject(e)
    }
  } else {
    // x是一个普通值直接让promise2成功即可
    resolve(x)
  }
}
class Promise {
  constructor(executor) {
    this.status = PENDING // 默认pending状态
    this.value = undefined // 成功传入的值
    this.reason = undefined // 失败传入的原因
    this.onFulfilledCbs = [] // 存放then成功回调的数组
    this.onRejectedCbs = [] // 存放then失败回调的数组
    // 成功 传入成功的值 status变为FULFILLED
    let resolve = (value) => {
      // 判断status 如果status改变就不会再被改变了，要么是成功态，要么是失败态
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 状态改变后依次执行
        this.onFulfilledCbs.forEach((fn) => fn())
      }
    }
    // 失败 失败传入的原因 status变为REJECTED
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 状态改变后依次执行
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
    // then接受两个参数成功的回调与失败的回调
    // 参数可选
    onFulfilled =
      typeof onFulfilled === 'function'
        ? onFulfilled
        : (data) => {
            data
          }
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (error) => {
            throw error
          }
    // then方法可以被同一个promise调用多次  必然是返回了一个新的Promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 如果onFulfilled或者onRejected抛出一个异常e，则promise2必须拒绝执行，并返回拒因e
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
    // then方法必须返回一个promise对象
    return promise2
  }
  catch(fn) {
    return this.then(undefined, fn)
  }
  finally(fn) {
    return this.then(
      (data) => {
        return Promise.resolve(fn()).then(() => {
          data
        })
      },
      (err) => {
        return Promise.resolve(fn()).then(() => {
          throw err
        })
      }
    )
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
Promise.resolve = function (value) {
  if (value instanceof Promise) {
    try {
      let then = value.then
      return new Promise(then.bind(value))
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
  } else {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
}
Promise.reject = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    let arr = []
    let i = 0
    const valueNum = values.length
    function resolveData(data, index) {
      arr[index] = data
      if (++i === valueNum) {
        resolve(arr)
      }
    }
    values.forEach((value, index) => {
      try {
        if (value instanceof Promise) {
          // 判断数组中的值是不是一个promise
          // yes: 成功状态 =》拿到它的值push到相应结果的数组
          //       失败状态=》直接reject失败的原因
          // no: 当普通值处理 push到相应结果的数组
          value.then(
            (res) => {
              resolveData(res, index)
            },
            (err) => {
              reject(err)
            }
          )
        } else {
          resolveData(value, index)
        }
      } catch (err) {
        reject(err)
      }
    })
  })
}
Promise.allSettled = (values) => {
  const result = values.map((p) => {
    return Promise.resolve(p).then(
      (value) => {
        return { status: 'fulfilled', value }
      },
      (reason) => {
        return { status: 'rejected', reason }
      }
    )
  })
  return Promise.all(result)
}
Promise.race = (values) => {
  return new Promise((resolve, reject) => {
    values.forEach((p) => {
      p.then(
        (value) => {
          resolve(value)
        },
        (reason) => {
          reject(reason)
        }
      )
    })
  })
}
module.exports = Promise
