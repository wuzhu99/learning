<!--
 * @Author: wuz
 * @Date: 2021-11-23 09:21:41
 * @LastEditTime: 2021-12-06 19:15:21
 * @FilePath: /learning/js设计模式/面向对象的js.md
 * @LastEditors: wuz
-->
- 原型模式
原型模式是一种设计模式，也是一种编程 泛型，它构成了 JavaScript 这门语言的根本。本节首先通过更加简单的 Io 语言来引入原型模式的 概念，随后学习了 JavaScript 中的原型模式。原型模式十分重要，和 JavaScript 开发者的关系十 分密切。
  - 型模式的实现关键，是语言本身是否提供了 clone 方法。ECMAScript 5 提供了 Object.create 方法，可以用来克隆对象。
  - 所有的数据都是对象。
  - 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
  - 对象会记住它的原型。
  - 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。

- this、call 和 apply
  - this的指向
  除去不常用的 with 和 eval 的情况，具体到实际应用中，this 的指向大致可以分为以下 4 种。
    - 作为对象的方法调用。
    - 作为普通函数调用。
    - 构造器调用。
    - Function.prototype.call 或 Function.prototype.apply 调用。

- 命令模式
  - 意图是把请求封装为对象，从而分离请求的发起者和请求的接收者(执行者)之 间的耦合关系。

高阶函数 AOP 装饰者模式实现 科里化函数

  - currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后， 该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保 存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
  - uncurrying 在 JavaScript 中，当我们调用对象的某个方法时，其实不用去关心该对象原本是否被设计为
拥有这个方法，这是动态类型语言的特点，也是常说的鸭子类型思想。  **p72** ***

  - 函数节流
    ```code
    var throttle = function (fn, interval) {
      var __self = fn, // 保存需要被延迟执行的函数引用 
          timer, // 定时器
          firstTime = true // 是否是第一次调用
      return function () {
        var args = arguments,
            __me = this
        if (firstTime) {
          // 如果是第一次调用，不需延迟执行
          __self.apply(__me, args)
          return firstTime = false
        }
        if (timer) {
          // 如果定时器还在，说明前一次延迟执行还没有完成 
          return false;
        }
        timer = setTimeout(function () {
          // 延迟一段时间执行
          clearTimeout(timer);
          timer = null
          __self.apply(__me, args)
        }, interval || 500)
      }
    }
    ```
  - 分时函数 一种限制函数被频繁调用的解决方案
    ```
    function timeChunk( arr, fn, count = 1 ){
            var data,timer
            let start = ()=>{
                for(let i = 0;i < Math.min(count,arr.length);i++){
                data = arr.shift();
                fn(data)
            }
            }
            return function(){
                timer = setInterval(()=>{
                    if(arr.length === 0){
                        return clearInterval(timer)
                    }
                    start()
                },1000)
            }
        }
        var ary = [];
        for ( var i = 1; i <= 1000; i++ ){
            ary.push( i );
        };
        var renderFriendList = timeChunk( ary, function( n ){
            var div = document.createElement( 'div' );
            div.innerHTML = n;
              document.body.appendChild( div );
        }, 2 );
        renderFriendList()
    ```
 - 惰性加载函数 第一次进入条件分支之后，在函数内部会重写这个函 数，重写之后的函数就是我们期望的 addEvent 函数，在下一次进入 addEvent 函数的时候，addEvent 函数里不再存在条件分支语句
   ```code
    var addEvent = function (elem, type, handler) {
      if (window.addEventListener) {
        addEvent = function (elem, type, handler) {
          elem.addEventListener(type, handler, false)
        }
      } else if (window.attachEvent) {
        addEvent = function (elem, type, handler) {
          elem.attachEvent('on' + type, handler)
        }
      }
      addEvent(elem, type, handler)
    } 
    ```

  - 单例模式 惰性单例
  - 策略模式 策略对象
    - 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
    - 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换，易于理解，易于扩展。
    - 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
    - 在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻便的替代方案。
 - 代理模式
    - 为一个对象提供一个代用品或占位符，以便控制对它的访问
    - 保护（保护代理用于控制不同权限的对象对目标对象的访问，但在 JavaScript 并不容易实现保护代 理，因为我们无法判断谁访问了某个对象。而虚拟代理是最常用的一种代理模式）虚拟 缓存（缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参
数跟之前一致，则可以直接返回前面存储的运算结果。）
- 迭代器模式
    迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象 5 的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。
    - 内部迭代器和外部迭代器（外部迭代器必须显式地请求迭代下一个元素。）
- 发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状 态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型 来替代传统的发布—订阅模式。
