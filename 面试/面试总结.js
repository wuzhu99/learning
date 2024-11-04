
// 移动端适配 没提查询


// Vue 常考基础知识点  还有其他vue React 问题 直接看 本项目的 掘金小册吧 就不复制了
// react 技术揭秘 可以看这个 https://react.iamkasong.com/#%E5%AF%BC%E5%AD%A6%E8%A7%86%E9%A2%91

`生命周期钩子函数
在 beforeCreate 钩子函数调用的时候，是获取不到 props 或者 data 中的数据的，因为这些数据的初始化都在 initState 中。

然后会执行 created 钩子函数，在这一步的时候已经可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的。

接下来会先执行 beforeMount 钩子函数，开始创建 VDOM，最后执行 mounted 钩子，并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。

接下来是数据更新时会调用的钩子函数 beforeUpdate 和 updated，这两个钩子函数没什么好说的，就是分别在数据更新前和更新后会调用。

另外还有 keep-alive 独有的生命周期，分别为 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

最后就是销毁组件的钩子函数 beforeDestroy 和 destroyed。前者适合移除事件、定时器等等，否则可能会引起内存泄露的问题。然后进行一系列的销毁操作，如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的 destroyed 钩子函数。

NextTick 原理分析
nextTick 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。

在 Vue 2.4 之前都是使用的 microtasks，但是 microtasks 的优先级过高，在某些情况下可能会出现比事件冒泡更快的情况，但如果都使用 macrotasks 又可能会出现渲染的性能问题。所以在新版本中，会默认使用 microtasks，但在特殊情况下会使用 macrotasks，比如 v-on。

对于实现 macrotasks ，会先判断是否能使用 setImmediate ，不能的话降级为 MessageChannel ，以上都不行的话就使用 setTimeout


`
// Vue 和 React 之间的区别 - 下边都是复制的 感觉像放屁

`


// ：前端路由原理？两种实现方式有什么区别？

`Hash 模式        window.addEventListener('hashchange', () => {

History 模式

// 新增历史记录
history.pushState(stateObject, title, URL)
// 替换当前历史记录
history.replaceState(stateObject, title, URL)
当用户做出浏览器动作时，比如点击后退按钮时会触发 popState 事件

window.addEventListener('popstate', e => {
  // e.state 就是 pushState(stateObject) 中的 stateObject
  console.log(e.state)
})



两种模式对比
Hash 模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL
History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候
`
// 前端框架 MVVM
// 什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？

`通过 JS 来模拟 DOM 并且渲染对应的 DOM 只是第一步，难点在于如何判断新旧两个 JS 对象的最小差异并且实现局部更新 DOM。

首先 DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异，那么需要的时间复杂度会是 O(n ^ 3)，
这个复杂度肯定是不能接受的。于是 React 团队优化了算法，实现了 O(n) 的复杂度来对比差异。
实现 O(n) 复杂度的关键就是只对比同层的节点，而不是跨层对比，
这也是考虑到在实际业务中很少会去跨层的移动 DOM 元素。 所以判断差异的算法就分为了两步

首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异
一旦节点有子元素，就去判断子元素是否有不同

TODO: 这里有空需要看下 之前那个 react diff 算法的详细介绍


当然了 Virtual DOM 提高性能是其中一个优势，其实最大的优势还是在于：

将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
实现组件的高度抽象化`

// JSONP
// JSONP 的原理很简单，就是利用 < script > 标签没有跨域限制的漏洞。
// 通过 < script > 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。

` <script src="http:domain/api?param1=a&param2=b&callback=jsonp"></script>
 <script>
     function jsonp(data) {
     	console.log(data)
 	}
 </script>
 JSONP 使用简单且兼容性不错，但是只限于 get 请求。`


// Cookie 和 Session 有什么不同？
`
// https://www.cnblogs.com/ityouknow/p/10856177.html
什么是 Cookie

HTTP Cookie是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。
通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。
Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。
什么是 Session
Session 代表着服务器和客户端一次会话的过程。Session 对象存储特定用户会话所需的属性及配置信息`

`作用范围不同，Cookie 保存在客户端（浏览器），Session 保存在服务器端。
存取方式的不同，Cookie 只能保存 ASCII，Session 可以存任意数据类型，一般情况下我们可以在 Session 中保持一些常用变量信息，比如说 UserId 等。
有效期不同，Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭或者 Session 超时都会失效。
隐私策略不同，Cookie 存储在客户端，比较容易遭到不法获取，早期有人将用户的登录名和密码存储在 Cookie 中导致信息被窃取；Session 存储在服务端，安全性相对 Cookie 要好一些。
存储大小不同， 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie。`
// proxy 了解吗

let onWatch = (obj, setBind, getLogger) => {
    let handler = {
        get(target, property, receiver) {
            getLogger(target, property)
            return Reflect.get(target, property, receiver)
        },
        set(target, property, value, receiver) {
            setBind(value, property)
            return Reflect.set(target, property, value)
        }
    }
    return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
    obj,
    (v, property) => {
        console.log(`监听到属性${property}改变为${v}`)
    },
    (target, property) => {
        console.log(`'${property}' = ${target[property]}`)
    }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
`
// script 标签 async defer 属性 的区别
`

 script 本来是 下载 执行都阻断 HTML 渲染的
 async 可在html渲染时下载js文件 下载不阻塞渲染  下载完执行js 执行阻塞渲染
 defer 也是在html渲染时下载  但完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行js脚本


   defer 设置后，这个布尔属性会向用户代理提示该脚本将不会生成任何网页内容
   （例如，JavaScript中不会生成 “document.write”），
   因此， 用户代理可以继续解析和渲染。

    …如果存在 async 属性，则脚本将会在可用时立即异步执行 …

在 <script> 标签中加上 async 属性后，与 defer 的相同点是也会在后台执行下载
，但不同的是当下载完成会马上暂停 DOM 解析（如果还没有解析完成的话），并开始执行 JavaScript。
因为下载完成后会立即执行，加上 async 属性后，就无法保证执行顺序

type="module"

在主流的现代浏览器中， <script> 的属性可以加上 type="module"。
这时浏览器会认为这个文件是一个JavaScript 模块，其中的解析规则、执行环境会略有不同；
这时 <script> 的默认行为会像是 defer 一样，在后台下载，并且等待 DOM 解析、渲染完成之后才会执行，
所以 defer 属性无法在 type="module" 的情况下发生作用。
但同样可以通过 async 属性使它在下载完成后即刻执行

 说一下浏览器如何渲染页面的？
 `

 `ES6 箭头函数的特性
参考回答：
箭头函数与普通函数的区别在于：

箭头函数没有this，所以需要通过查找作用域链来确定this 的值，这就意味着如果箭头函数被非箭头函数包含，this 绑定的就是最近一层非箭头函数的this，
箭头函数没有自己的arguments 对象，但是可以访问外围函数的arguments 对象
不能通过new 关键字调用，同样也没有new.target 值和原型


// domtree  csstree 合成渲染树 layout（计算元素的布局 位置大小） painting 渲染到屏幕上
`参考回答
【得分点】
dom树、stylesheet、布局树、分层、光栅化、合成
【参考答案】
标准回答
浏览器拿到HTML，先将HTML转换成dom树，再将CSS样式转换成stylesheet，根据dom树和stylesheet创建布局树，对布局树进行分层，为每个图层生成绘制列表，再将图层分成图块，紧接着光栅化将图块转换成位图，最后合成绘制生成页面。
加分回答
分层的目的：避免整个页面渲染，把页面分成多个图层，尤其是动画的时候，把动画独立出一个图层，渲染时只渲染该图层就ok，transform，z-index等，浏览器会自动优化生成图层
光栅化目的：页面如果很长但是可视区很小，避免渲染非可视区的样式造成资源浪费，所以将每个图层又划分成多个小个子，当前只渲染可视区附近区域
`
// 分阶段讲述 react 生命周期
`初始化阶段 constructor
挂载阶段 componentWillMount，render，componentDidMount
更新阶段
   state shouldComponentsUpdate componentWillUpdate render ComponentDidUpDate
   props  componentWillReciveProps   shouldComponentsUpdate componentWillUpdate render ComponentDidUpDate
    * props
    * 1. componentWillReceiveProps(nextProps, nextState)
        这个生命周期主要为我们提供对 props 发生改变的监听，如果你需要在 props 发生改变后，相应改变组件的一些 state。在这个方法中改变 state 不会二次渲染，而是直接合并 state。
    * 2. shouldComponentUpdate(nextProps, nextState)
        这个生命周期需要返回一个 Boolean 类型的值，判断是否需要更新渲染组件，优化 react 应用的主要手段之一，当返回 false 就不会再向下执行生命周期了，在这个阶段不可以 setState()，会导致循环调用。
    * 3. componentWillUpdate(nextProps, nextState)
        这个生命周期主要是给我们一个时机能够处理一些在 Dom 发生更新之前的事情，如获得 Dom 更新前某些元素的坐标、大小等，在这个阶段不可以 setState()，会导致循环调用。
    ** 一直到这里 this.props 和 this.state 都还未发生更新 **
    * 4. render
        执行 render 函数。
    * 5. componentDidUpdate(prevProps, prevState)
在此时已经完成渲染，Dom 已经发生变化，State 已经发生更新，prevProps、prevState 均为上一个状态的值。
* state（具体同上）
    shouldComponentUpdate
    componentWillUpdate
    render
    componentDidUpdate
卸载阶段  componentWillUnmount


React 16 中删除了如下三个生命周期。

componentWillMount
componentWillReceiveProps
componentWillUpdate


取代这三个生命周期的是两个新生命周期

static getDerivedStateFromProps(nextProps,nextState)

在 React 16.3.0 版本中：在组件实例化、接收到新的 props 时会被调用
在 React 16.4.0 版本中：在组件实例化、接收到新的 props 、组件状态更新时会被调用
该方法可以返回一个对象，将会和 state 发生合并，且不会触发 re-render。
这个生命周期主要为我们提供了一个可以在组件实例化或 props、state 发生变化后根据 props 修改 state 的一个时机，用来替代旧的生命周期中的 componentWillMount、ComponentWillReceiveProps。因为是一个静态方法，this 指向不是组件实例。
getSnapshotBeforeUpdate（prevProps,prevState）
在 render 函数调用之后，实际的 Dom 渲染之前，在这个阶段我们可以拿到上一个状态 Dom 元素的坐标、大小的等相关信息。用于替代旧的生命周期中的 componentWillUpdate。
该函数的返回值将会作为 componentDidUpdate 的第三个参数出现。
react.js

`

// 结合OSI模型和TCP/IP模型的五层协议体系结构
`得分点
协议栈自上而下依次为：应用层、运输层、网络层、数据链路层、物理层

五层协议体系结构结合了OSI模型和TCP / IP模型的优点，既简洁又能将每一层描述清楚。在计算机网络中要做到正确的数据交换，就必须提前约定好相应的规则。它是一个协议栈，就是为了统一计算机网络标准，方便数据的交换。
// 它自上而下依次为：应用层，定义是应用进程间通信和交互的规则。运输层，负责给两个计算机进程的通信提供传输服务。网络层，任务是负责为网络上不同的主机提供通信服务。数据链路层，将网络层交下来的数据报组装成帧。物理层，最底层的数据传输，以比特流的形式进行。

加分回答

五层协议体系结构结合了OSI模型和TCP / IP模型的优点，既简洁又能将每一层描述清楚。在计算机网络中要做到正确的数据交换，就必须提前约定好相应的规则。它是一个协议栈，就是为了统一计算机网络标准，方便数据的交换。它自上而下依次为：

应用层：应用层是体系结构中的最高层，定义了应用进程间通信和交互的规则。本层任务就是通过应用进程间的信息数据流通完成特定的网络应用（软件、Web应用等）。因为不同的应用程序都需要不同的应用层协议，所以应用层协议较多，如万维网应用的HTTP协议、电子邮件的SMTP协议、文件传送的DTP协议等。请将应用层交互的数据称为报文，以免产生概念的混淆。

协议：HTTP、HTTPS、FTP、TFTP、SMTP等

运输层：运输层的任务是负责向两个计算机中进程之间的通信提供一种通用的数据传输服务，应用层通过运输层可以传输报文。通用是指不会针对特定的应用层协议进行详细的划分，多种应用层协议公用同一个运输层服务，所以运输层有复用的功能。当然也有分发的功能，指将接受到的信息分别交付到应用层不同的进程中。

协议：UDP、TCP

网络层：网络层的任务是负责为网络上不同的主机提供通信服务。在发送数据时，网络层将运输层产生的报文段或者用户数据报封装成分组或者包（packet）进行传送。由于网络层使用IP协议，所以分组或包（packet）也叫IP数据报，简称数据报。网络层还需要寻找合适的路由路线，让源主机运输层发送下来的数据报能通过路由器找到目的主机。

协议：ICMP、IGMP、IP（IPv4、IPv6）、ARP、RARP

数据链路层：数据链路层简称链路层。两个节点传输数据时，链路层将网络层交下来的数据报组装成帧，在链路上传送帧。每一帧都包括数据和控制信息（同步信息、地址信息、差错控制等）。

物理层：物理层上数据的单位是Bit比特，数据的传输都是通过0（或1）比特流来实现的，而0（或1）比特流与电压的高低有关。物理层中比特流的传输不再加控制信息，需要注意的是比特流应从首部开始传送。

// float精度丢失问题
// 1 考虑到每次浮点数运算的偏差非常小(其实不然) ，可以对结果进行指定精度的四舍五入，比如可以parseFloat(result.toFixed(12));
// 2 将浮点数转为整数运算，再对结果做除法。比如0.1 + 0.2，可以转化为(1 * 2) / 3。=> 受到大整数位数的限制
// 3 把浮点数转化为字符串，模拟实际运算的过程。big.js
// leetcode: https://leetcode.com/problems/add-two-numbers/
 function addStrings(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, add = 0;
    const ans = [];
    while (i >= 0 || j >= 0 || add != 0) {
        const x = i >= 0 ? num1.charAt(i) - '0' : 0;
        const y = j >= 0 ? num2.charAt(j) - '0' : 0;
        const result = x + y + add;
        ans.push(result % 10);
        add = Math.floor(result / 10);
        i -= 1;
        j -= 1;
    }
    return ans.reverse().join('');
}

`
regexp test 对应 String search
regexp exec 对应 String match
 exec 如果是global(g) sticky（y）模式 执行的时候会 改变 regexp.lastIndex 病从lastIndex开始下一次正则
`
`
webpack plugin 及tapable 原理
https://segmentfault.com/a/1190000021821557
https://segmentfault.com/a/1190000023016347`

`姜令浩 简单总结
tapable：就是处理事件流的  有一下两种api
tap(类似addEventListener 添加监听事件的)
call(分同步 异步 瀑布流 并行 等各种  触发事件的)

webpack complier类 中 constructor 中初始化 this.hooks = {
           run: new AsyncSeriesHook(["compiler"]), //异步钩子
           compile: new SyncHook(["params"]),//同步钩子
        };
        实例方法 就是各种生命周期 （run complie emit afterEmit done等） 在里边调用 tapable.call方法 触发事件
webpack plugin 类 apply 方法 会被调用 传入compiler 实例
可以在 compiler.hooks.run.tap('MyPlugin', () => console.log('开始编译...'))
类似这样 调用tapable 的各种添加事件的方法 等待 webpack 执行到某个生命周期的时候被调用
（上边这样就是 run 生命周期的时候 会触发这个插件增加的方法）


问题2

开发插件首先要知道compiler和 compilation 对象是做什么的

Compiler 对象包含了当前运行Webpack的配置，包括entry、output、loaders等配置，
这个对象在启动Webpack时被实例化，而且是全局唯一的。
Plugin可以通过该对象获取到 Webpack 的配置信息进行处理。


`

// complier 源码精简解析
const { SyncHook, SyncBailHook, AsyncSeriesHook } = require('tapable')
class Compiler {
    constructor() {
        // 1. 定义生命周期钩子
        this.hooks = Object.freeze({
            // ...只列举几个常用的常见钩子，更多hook就不列举了，有兴趣看源码
            done: new AsyncSeriesHook(['stats']), //一次编译完成后执行，回调参数：stats
            beforeRun: new AsyncSeriesHook(['compiler']),
            run: new AsyncSeriesHook(['compiler']), //在编译器开始读取记录前执行
            emit: new AsyncSeriesHook(['compilation']), //在生成文件到output目录之前执行，回调参数： compilation
            afterEmit: new AsyncSeriesHook(['compilation']), //在生成文件到output目录之后执行
            compilation: new SyncHook(['compilation', 'params']), //在一次compilation创建后执行插件
            beforeCompile: new AsyncSeriesHook(['params']),
            compile: new SyncHook(['params']), //在一个新的compilation创建之前执行
            make: new AsyncParallelHook(['compilation']), //完成一次编译之前执行
            afterCompile: new AsyncSeriesHook(['compilation']),
            watchRun: new AsyncSeriesHook(['compiler']),
            failed: new SyncHook(['error']),
            watchClose: new SyncHook([]),
            afterPlugins: new SyncHook(['compiler']),
            entryOption: new SyncBailHook(['context', 'entry']),
        })
        // ...省略代码
    }
    newCompilation() {
        // 创建Compilation对象回调compilation相关钩子
        const compilation = new Compilation(this)
        //...一系列操作
        this.hooks.compilation.call(compilation, params) //compilation对象创建完成
        return compilation
    }
    watch() {
        //如果运行在watch模式则执行watch方法，否则执行run方法
        if (this.running) {
            return handler(new ConcurrentCompilationError())
        }
        this.running = true
        this.watchMode = true
        return new Watching(this, watchOptions, handler)
    }
    run(callback) {
        if (this.running) {
            return callback(new ConcurrentCompilationError())
        }
        this.running = true
        process.nextTick(() => {
            this.emitAssets(compilation, (err) => {
                if (err) {
                    // 在编译和输出的流程中遇到异常时，会触发 failed 事件
                    this.hooks.failed.call(err)
                }
                if (compilation.hooks.needAdditionalPass.call()) {
                    // ...
                    // done：完成编译
                    this.hooks.done.callAsync(stats, (err) => {
                        // 创建compilation对象之前
                        this.compile(onCompiled)
                    })
                }
                this.emitRecords((err) => {
                    this.hooks.done.callAsync(stats, (err) => { })
                })
            })
        })

        this.hooks.beforeRun.callAsync(this, (err) => {
            this.hooks.run.callAsync(this, (err) => {
                this.readRecords((err) => {
                    this.compile(onCompiled)
                })
            })
        })
    }
    compile(callback) {
        const params = this.newCompilationParams()
        this.hooks.beforeCompile.callAsync(params, (err) => {
            this.hooks.compile.call(params)
            const compilation = this.newCompilation(params)
            //触发make事件并调用addEntry，找到入口js，进行下一步
            this.hooks.make.callAsync(compilation, (err) => {
                process.nextTick(() => {
                    compilation.finish((err) => {
                        // 封装构建结果（seal），逐次对每个module和chunk进行整理，每个chunk对应一个入口文件
                        compilation.seal((err) => {
                            this.hooks.afterCompile.callAsync(compilation, (err) => {
                                // 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，
                                // 不然运行流程将会一直卡在这不往下执行
                                return callback(null, compilation)
                            })
                        })
                    })
                })
            })
        })
    }
    emitAssets(compilation, callback) {
        const emitFiles = (err) => {
            //...省略一系列代码
            // afterEmit：文件已经写入磁盘完成
            this.hooks.afterEmit.callAsync(compilation, (err) => {
                if (err) return callback(err)
                return callback()
            })
        }

        // emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改(这是最后一次修改最终文件的机会)
        this.hooks.emit.callAsync(compilation, (err) => {
            if (err) return callback(err)
            outputPath = compilation.getPath(this.outputPath, {})
            mkdirp(this.outputFileSystem, outputPath, emitFiles)
        })
    }
    // ...省略代码
}

// apply方法中插入钩子的一般形式如下：

// compiler提供了compiler.hooks，可以根据这些不同的时刻去让插件做不同的事情。
compiler.hooks.阶段.tap函数('插件名称', (阶段回调参数) => { })
compiler.run(callback)



// 理解 Compilation（负责创建 bundles）
// Compilation对象代表了一次资源版本构建。
// 当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。
// 一个 Compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息，简单来讲就是把本次打包编译的内容存到内存里。
// Compilation 对象也提供了插件需要自定义功能的回调，以供插件做自定义处理时选择使用拓展。

// 简单来说, Compilation的职责就是构建模块和 Chunk，并利用插件优化构建过程。

// 和 Compiler 用法相同，钩子类型不同，也可以在某些钩子上访问 tapAsync 和 tapPromise。

`介绍几个常用的 Compilation Hooks
钩子	               类型	              什么时候调用
buildModule	          SyncHook	        在模块开始编译之前触发，可以用于修改模块
succeedModule	      SyncHook	        当一个模块被成功编译，会执行这个钩子
finishModules	      AsyncSeriesHook	当所有模块都编译成功后被调用
seal	              SyncHook	        当一次compilation停止接收新模块时触发
optimizeDependencies  SyncBailHook	    在依赖优化的开始执行
optimize	          SyncHook	        在优化阶段的开始执行
optimizeModules	      SyncBailHook	    在模块优化阶段开始时执行，插件可以在这个钩子里执行对模块的优化，回调参数：modules
optimizeChunks	      SyncBailHook	    在代码块优化阶段开始时执行，插件可以在这个钩子里执行对代码块的优化，回调参数：chunks
optimizeChunkAssets	  AsyncSeriesHook	优化任何代码块资源，这些资源存放在compilation.assets 上。一个 chunk 有一个 files 属性，它指向由一个 chunk 创建的所有文件。任何额外的 chunk 资源都存放在 compilation.additionalChunkAssets 上。回调参数：chunks
optimizeAssets	      AsyncSeriesHook	优化所有存放在 compilation.assets 的所有资源。回调参数：assets
`
// Compiler 和 Compilation 的区别
`Compiler 代表了整个 Webpack 从启动到关闭的生命周期，
而 Compilation 只是代表了一次新的编译，只要文件有改动，compilation就会被重新创建。`
// --------------------------------------------------
// 简单的react 性能优化
`shouldComponentUpdate
浅比较： class组件 class Test extends React.PureComponent
         函数式组件const Test = React.memo(() => (
usememo useCallback
`
// webpack plugin 常用 API
// 读取输出资源、代码块、模块及其依赖
// 有些插件可能需要读取 Webpack 的处理结果，例如输出资源、代码块、模块及其依赖，以便做下一步处理。
// 在 emit 事件发生时，代表源文件的转换和组装已经完成，在这里可以读取到最终将输出的资源、代码块、模块及其依赖，
// 并且可以修改输出资源的内容。
// 插件代码如下：

class Plugin {
    apply(compiler) {
        compiler.plugin('emit', function (compilation, callback) {
            // compilation.chunks 存放所有代码块，是一个数组
            compilation.chunks.forEach(function (chunk) {
                // chunk 代表一个代码块
                // 代码块由多个模块组成，通过 chunk.forEachModule 能读取组成代码块的每个模块
                chunk.forEachModule(function (module) {
                    // module 代表一个模块
                    // module.fileDependencies 存放当前模块的所有依赖的文件路径，是一个数组
                    module.fileDependencies.forEach(function (filepath) { })
                })

                // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
                // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
                // 该 Chunk 就会生成 .js 和 .css 两个文件
                chunk.files.forEach(function (filename) {
                    // compilation.assets 存放当前所有即将输出的资源
                    // 调用一个输出资源的 source() 方法能获取到输出资源的内容
                    let source = compilation.assets[filename].source()
                })
            })

            // 这是一个异步事件，要记得调用 callback 通知 Webpack 本次事件监听处理结束。
            // 如果忘记了调用 callback，Webpack 将一直卡在这里而不会往后执行。
            callback()
        })
    }
}

// 监听文件变化
// Webpack 会从配置的入口模块出发，依次找出所有的依赖模块，当入口模块或者其依赖的模块发生变化时， 就会触发一次新的 Compilation。

// 在开发插件时经常需要知道是哪个文件发生变化导致了新的 Compilation，为此可以使用如下代码：

// 当依赖的文件发生变化时会触发 watch-run 事件
compiler.hooks.watchRun.tap('MyPlugin', (watching, callback) => {
    // 获取发生变化的文件列表
    const changedFiles = watching.compiler.watchFileSystem.watcher.mtimes
    // changedFiles 格式为键值对，键为发生变化的文件路径。
    if (changedFiles[filePath] !== undefined) {
        // filePath 对应的文件发生了变化
    }
    callback()
})
// 默认情况下 Webpack 只会监视入口和其依赖的模块是否发生变化，
// 在有些情况下项目可能需要引入新的文件，例如引入一个 HTML 文件。
// 由于 JavaScript 文件不会去导入 HTML 文件，Webpack 就不会监听 HTML 文件的变化，
// 编辑 HTML 文件时就不会重新触发新的 Compilation。
// 为了监听 HTML 文件的变化，我们需要把 HTML 文件加入到依赖列表中，为此可以使用如下代码：

compiler.hooks.afterCompile.tap('MyPlugin', (compilation, callback) => {
    // 把 HTML 文件添加到文件依赖列表，好让 Webpack 去监听 HTML 模块文件，在 HTML 模版文件发生变化时重新启动一次编译
    compilation.fileDependencies.push(filePath)
    callback()
})
// 修改输出资源
// 有些场景下插件需要修改、增加、删除输出的资源，要做到这点需要监听 emit 事件，
// 因为发生 emit 事件时所有模块的转换和代码块对应的文件已经生成好， 需要输出的资源即将输出，
// 因此 emit 事件是修改 Webpack 输出资源的最后时机。

// 所有需要输出的资源会存放在 compilation.assets 中，compilation.assets 是一个键值对，键为需要输出的文件名称，值为文件对应的内容。

// 设置 compilation.assets 的代码如下：

// 设置名称为 fileName 的输出资源
compilation.assets[fileName] = {
    // 返回文件内容
    source: () => {
        // fileContent 既可以是代表文本文件的字符串，也可以是代表二进制文件的 Buffer
        return fileContent
    },
    // 返回文件大小
    size: () => {
        return Buffer.byteLength(fileContent, 'utf8')
    },
}
callback()

// 当调用setState时，React render 是如何工作的？ TODO:
`咱们可以将"render"分为两个步骤：

虚拟 DOM 渲染:当render方法被调用时，它返回一个新的组件的虚拟 DOM 结构。当调用setState()时，render会被再次调用，因为默认情况下shouldComponentUpdate总是返回true，所以默认情况下 React 是没有优化的。
原生 DOM 渲染:React 只会在虚拟DOM中修改真实DOM节点，而且修改的次数非常少——这是很棒的React特性，它优化了真实DOM的变化，使React变得更快。
`
`redux 详细  单项数据流

三大基本原则：

唯一数据源(store)
保持状态只读(state)
数据改变只能通过纯函数完成(reducer)


setstate 后的过程 批量patch

`
// setState 全过程  https://segmentfault.com/a/1190000018260218
`
1.将setState传入的partialState参数存储在当前组件实例的state暂存队列中。
2.判断当前React是否处于批量更新状态，如果是，将当前组件加入待更新的组件队列中。
3.如果未处于批量更新状态，将批量更新状态标识设置为true，用事务再次调用前一步方法，保证当前组件加入到了待更新组件队列中。
4.调用事务的waper方法，遍历待更新组件队列依次执行更新。
5.执行生命周期componentWillReceiveProps。
6.将组件的state暂存队列中的state进行合并，获得最终要更新的state对象，并将队列置为空。
7.执行生命周期componentShouldUpdate，根据返回值判断是否要继续更新。
8.执行生命周期componentWillUpdate。
9.执行真正的更新，render。
10.执行生命周期componentDidUpdate。


`
`
fiber 对比的逻辑 深度优先  diff的时候不同是 render 还是所有 生命周期改变
// 回答： 所有生命周期 commit 阶段 beforeMuation 阶段 会调用getSnapshotBeforeUpdate生命周期钩子

babel runtime
genetor 生成什么`
 `为什么要有 hooks
    逻辑复用 组件可读性 编写复杂性
     给函数式组件状态
    Component非UI逻辑复用困难。
    组件的生命周期函数不适合side effect逻辑的管理。
    不友好的Class Component。
 `
` require/exports 和 import/export 本质上的差别形式上看起来五花八门，但本质上：
CommonJS 还是 ES6 Module 输出都可以看成是一个具备多个属性或者方法的对象；
default 是 ES6 Module 所独有的关键字，export default fs 输出默认的接口对象，import fs from 'fs' 可直接导入这个对象；
ES6 Module 中导入模块的属性或者方法是强绑定的，包括基础类型；而 CommonJS 则是普通的值传递或者引用传递。
1、2 相对比较好理解，3 需要看个例子：




`
// require，import区别？ - 凯斯的回答 - 知乎
// ：import 是在编译过程中执行，而common的require是同步。

// 还有import传的是值引用，require是值拷贝。

// https://segmentfault.com/a/1190000021911869
// CommonJs模块输出的是一个值的拷贝，ES6模块输出的是值的引用。
// CommonJs模块是运行时加载，ES6模块是编译时输出接口。
// https://www.zhihu.com/question/56820346/answer/250006447
// counter.js
exports.count = 0
setTimeout(function () {
    console.log('increase count to', ++exports.count, 'in counter.js after 500ms')
}, 500)

// commonjs.js
const { count } = require('./counter')
setTimeout(function () {
    console.log('read count after 1000ms in commonjs is', count)
}, 1000)

//es6.js
import { count } from './counter'
setTimeout(function () {
    console.log('read count after 1000ms in es6 is', count)
}, 1000)


    `分别运行 commonjs.js 和 es6.js：
➜  test node commonjs.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in commonjs is 0
➜  test babel-node es6.js
increase count to 1 in counter.js after 500ms
read count after 1000ms in es6 is 1

`
//esmodule commonjs 循环引用 https://blog.esunr.xyz/2021/07/%E4%BB%A4%E4%BA%BA%E5%A4%B4%E5%A4%A7%E7%9A%84ES-Module-%E4%B8%8E-CommonJS/#4-2-ES-Module
`4. 模块导入的执行顺序与循环引用
//姜令浩简单思路 cjs就是第一次require的文件会去执行 然后缓存下来 后续在遇到require此文件就忽略
// 可以认为是多个文件拼接成一个大的js文件再执行
// esmodule import 生成文件的引用 每次去动态的去模块里取值
4.1 CommonJS
CJS 在模块引用时有一个重要的特性就是 加载时执行，的执行规则是沿着入口文件开始，逐次向下执行，遇到 require 语句后执行 require 的模块的内部代码；

如果在模块内部又再次遇到 require 语句，会将当前的代码缓存住，同时检查该模块是否有被引用过（也就是是否存在缓存），这就需要分为两种情况：

如果 require 的模块之前未被引用过，则暂停当前模块的解析，进入新的模块，并执行新模块内部的代码
如果 require 的模块之前被因用过，则无视该 require 语句，继续向下执行
这种引用方式，可以让 CJS 避免循环引用造成代的码锁死，但是也会造成引用顺序不当从而导致某些模块的变量未被创建就本引用的问题。


、4.2 ES Module
ES6模块的运行机制与 CommonJS 不太一样，它遇到模块加载命令 import 时，生成的是一个引用，等到真正是用的时候才会去取值.

    ES6模块不会缓存运行结果，而是动态地去被加载的模块取值，以及变量总是绑定其所在的模块。这导致 ES6 处理”循环加载”与 CommonJS 有本质的不同。
    ES6根本不会关心是否发生了”循环加载”，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。
`
 `React setState   全流程 ( setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。)

    调用setState后，会把我们想要更新的state压进一个待更新队列(即内部实例的_pendingStateQueue)，
    然后执行入栈更新操作enqueueUpdate，判定是否处于批量更新状态。
    如果正在进行组件的批量更新，那么就先把实例推进 dirtyComponents 里面等待下一次批量更新；
    相反若没有批量更新在执行，则会调用一个批量更新的事务。
    --------------------------------------------------------
// https://oychao.github.io/2017/10/11/react/18_set_state/
另一篇文章 比较细的从源码分析  讲的能明白 最好看这个



(dirtyComponents是一个用于存储『脏组件』的数组，所谓的脏组件，就是组件的一些属性发生了变动，但是还没有将新属性更新到视图的组件。



好了，到这一步，setState方法已经完成了所有的工作，我们简单总结一下它做了什么。

根据当前组件实例获取React管理的内部实例，将新的状态放到_pendingStateQueue中，
如果当前React更新组件的策略不处于更新状态，则执行策略的batchedUpdates方法，
否则将当前内部实例放到一个dirtyComponents的数组中。

以上就是setState做的核心工作（不含对callback的处理，对callback的处理类似，也是临时存储，也是将内部实例放到dirtyComponents中）。
那么问题来了，我们有没有看到状态更新呢？并没有，状态依然没有更新，setState并没有直接更新组件的状态。

为了进一步弄明白React是如何更新状态的，在我们完全调试完setState之后，我们还需要继续往上调试，搞清楚了setState做的这些工作还不够，我们还要看看，到底是谁调用handleClick？

为什么要去看handleClick呢？因为我们目前确定的信息是，setState没有更新状态，但handleClick的整个事件处理过程中肯定是在某一步更新了状态。

现在可以总结一下了，
当点击一个事件时，React会启动默认的组件更新策略（ReactDefaultBatchingStrategy），
该策略有一个事务（ReactDefaultBatchingStrategyTransaction），它绑定的目标函数会层层深入，最终执行handleClick中的setState的方法，
然后React管理的内部实例就会保存当前更新的状态。

策略事务的目标函数执行完毕之后，事务的closeAll启动，开始执行绑定的wrapper，
而其中有一个名FLUSH_BATCHED_UPDATES为wrapper，
它的close方法才是真正处理React组件状态更新的地方（其实还包括一些生命周期函数，如果有的话）。


上边是说 click 触发的setState  当执行到的时候已经处于更新状态中了 所以是异步更新的
但是 settimeout 异步触发的setsate时 不处于更新状态 会唤起更新批量更新  执行完 状态就结束了  所以是同步更新的

总结一下，setState执行的关键步骤如下：

React的更新策略已经被启动时（事件触发时）：
React响应事件处理 =>
 启动更新策略事务（绑定了wrapper） =>
 事务perform =>
 setState =>
 获取内部实例 =>
 存储新的状态 =>
 发现更新策略事务已启动 =>
 将当前内部实例放入脏组件数组 =>
 setState执行结束 =>
 更新策略事务perform完毕 =>
 wrapper处理组件状态的更新

React的更新策略没有被启动时（异步触发时）：
setState =>
 获取内部实例 =>
 存储新的状态 =>
 发现更新策略事务未启动 =>
 启动更新策略事务（绑定了wrapper） =>
 事务perform =>
 将当前内部实例放入脏组件数组 =>
 更新策略事务perform完毕 =>
 wrapper处理组件状态的更新 =>
 setState执行结束
以上就是setState更新状态的过程分析，所以下次如果有人问你，setState是异步还是同步，你千万不要轻易地回答是异步（或者是同步），
而应该解释清楚，setState更新状态的过程。




所以强制同步更新 是1 原生事件 或者 2 settimeout() 3 主动调用 batchedUpdates()
// https://www.jianshu.com/p/f0e1b84e3883

`

`
 constructor ->
 componentWillMount ->
 render ->
 componentDidMount ->
 componentWillReceiveProps ->
 shouldComponentUpdate ->
 componentWillUpdate ->
 render ->
 componentDidUpdate


 当中constructor中本身就有state的声明，在这里是最初的state创建，因此不需要使用setState

componentWillMount中，如果进行同步setState调用，此时的操作其实和constructor内定义state是一样的，并不会触发组件的额外渲染，当然这里可以做异步的setState操作，获取页面的初始数据。

render、shouldComponentUpdate、componentWillUpdate这三个函数中，组件还没有渲染结束就继续调用setState，会无限触发更新，陷入死循环，是要注意的。

因此我们可用setState的生命周期钩子函数有：componentWillMount、componentDidMount、componentWillReceiveProps、componentDidUpdate
`
`var和let/const的区别上：

1 var声明的变量会挂到window上，而let和const不会
2 var声明的变量存在变量提升，而let和const不会
3 let和const声明形成块作用域，只能在块作用域里访问，不能跨块访问，也不能跨函数访问
3 同一作用域下let和const不能声明同名变量，而var可以
4 暂时性死区，let和const声明的变量不能在声明前被使用

babel的转化，其实只实现了第2、3、5点
`
`对于const不可修改的特性，我们通过设置writable属性来实现
function _const(key, value) {
    const desc = {
        value,
        writable: false// writable false是无法赋值
    }
    Object.defineProperty(window, key, desc)
}

_const('obj', {a: 1})   //定义obj
obj.b = 2               //可以正常给obj的属性赋值
obj = {}                //无法赋值新对象

`
`手写call()
call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
语法：function.call(thisArg, arg1, arg2, ...)
`

//变更函数调用者示例
function foo() {
    console.log(this.name)
}


// 测试
const obj = {
    name: '写代码像蔡徐抻'
}
obj.foo = foo   // 变更foo的调用者
obj.foo()       // '写代码像蔡徐抻'

// 这个的简单思路 就是 模仿上边的 在函数内部搞一个对象 给这个对象加上foo函数 然后执行函数  执行完再把 对象上的函数删掉
// 姜令浩 简单思路版
Function.prototype.call2 = function (context,...args) {
    context = context || window // 默认为window
    context.fn = this //this 指的是调用call2的函数
    // const args = [...arguments].slice(1) // 在参数上写。。. 就不用这一行了
    const result = context.fn(...args)
    delete context.fn
    return result
}
// call 改变函数的this指向
Function.prototype.myCall = function (thisArg, ...args) {
    const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window    // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this              // this指向调用call的对象,即我们要改变this指向的函数
    const result = thisArg[fn](...args)  // 执行当前函数
    delete thisArg[fn]              // 删除我们声明的fn属性
    return result                  // 返回函数执行结果
}

//测试
foo.myCall(obj)     // 输出'写代码像蔡徐抻'
`手写apply()
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
语法：func.apply(thisArg, [argsArray])`
Function.prototype.myApply = function (thisArg, args) {
    const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window    // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this              // this指向调用call的对象,即我们要改变this指向的函数
    const result = thisArg[fn](...args)  // 执行当前函数（此处说明一下：虽然apply()接收的是一个数组，但在调用原函数时，依然要展开参数数组。可以对照原生apply()，原函数接收到展开的参数数组）
    delete thisArg[fn]              // 删除我们声明的fn属性
    return result                  // 返回函数执行结果
}

//测试
foo.myApply(obj, [])     // 输出'写代码像蔡徐抻'

` 手写bind()
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
语法: function.bind(thisArg, arg1, arg2, ...)
 `
Function.prototype.myBind = function (thisArg, ...args) {
    return () => {
        this.apply(thisArg, args)
    }
}

`但我们忽略了三点：

bind()除了this还接收其他参数，bind()返回的函数也接收参数，这两部分的参数都要传给返回的函数
new会改变this指向：如果bind绑定后的函数被new了，那么this指向会发生改变，指向当前函数的实例
没有保留原函数在原型链上的属性和方法
 `
 Function.prototype.myBind = function (thisArg, ...args) {
    var self = this
    // new优先级
    var fbound = function () {
        self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
    }
    // 继承原型上的属性和方法
    fbound.prototype = Object.create(self.prototype);

    return fbound;
}

//测试
const obj = { name: '写代码像蔡徐抻' }
function foo() {
    console.log(this.name)
    console.log(arguments)
}

foo.myBind(obj, 'a', 'b', 'c')()    //输出写代码像蔡徐抻 ['a', 'b', 'c']
`手写一个防抖函数
防抖，即短时间内大量触发同一事件，只会执行一次函数，
实现原理为设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作，
防抖常用于搜索框/滚动条的监听事件处理，如果不做防抖，每输入一个字/滚动屏幕，都会触发事件处理，造成性能浪费。
 `
// debounce ： 多次触发 只有最后一次能触发执行 其他每次都被取消了定时任务
// if(timeout) clearTimeout(timeout)
function debounce(func, wait) {
    let timeout = null
    return  (...args) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}
`手写一个节流函数
防抖是延迟执行，而节流是间隔执行，函数节流即每隔一段时间就执行一次，
实现原理为设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器，
和防抖的区别在于，防抖每次触发事件都重置定时器，而节流在定时器到时间后再清空定时器
`
// throttle 是节流 每次事件触发 都会进入定时任务 当事件到时间了 执行完了才会释放timeout  允许下一次定时任务
// if(timeout) return
function throttle(func, wait) {
    let timeout = null
    return  (...args) => {
        if(timeout) return
        timeout = setTimeout(() => {
            timeout = null
            func.apply(this, args)
        }, wait)

    }
}
// 套路 反正都一样 fun1 timeout =null  return fun2
// if(timeout) clearTimeout(timeout) =>每次点击都取消上一次 叫防抖  实例：输入框 scroll
// timeout  = setTimeout(()=>  func.apply(this,args))

// if(timeout) return  => 不触发叫 节流
// timeout  = setTimeout(()=> timeout=null func.apply(this,args))


function throttle2(func, wait) {
    var prev = 0;
    return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - prev > wait) {
            func.apply(context, args);
            prev = now;
        }
    }
}

`数组扁平化
对于[1, [1,2], [1,2,3]]这样多层嵌套的数组，我们如何将其扁平化为[1, 1, 2, 1, 2, 3]这样的一维数组呢：`
// flatten
const arr = [1, [1, 2], [1, 2, 3]]
arr.flat(Infinity)  // [1, 1, 2, 1, 2, 3]


const arr = [1, [1, 2], [1, 2, 3]]
const str = `[${JSON.stringify(arr).replace(/(\[|\])/g, '')}]`
JSON.parse(str)   // [1, 1, 2, 1, 2, 3]

const arr = [1, [1, 2], [1, 2, 3]]
// flat 最简单好理解的版本看这个就行
function flat(arr) {
    let result = []
    for (const item of arr) {
        item instanceof Array ? result = result.concat(flat(item)) : result.push(item)
    }
    return result
}

flat(arr) // [1, 1, 2, 1, 2, 3]
const arr = [1, [1, 2], [1, 2, 3]]
function flat(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(cur instanceof Array ? flat(cur) : cur)
    }, [])
}

flat(arr)  // [1, 1, 2, 1, 2, 3]
// 每次while都会合并一层的元素，这里第一次合并结果为[1, 1, 2, 1, 2, 3, [4,4,4]]
// 然后arr.some判定数组中是否存在数组，因为存在[4,4,4]，继续进入第二次循环进行合并
let arr = [1, [1, 2], [1, 2, 3, [4, 4, 4]]]
while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
}

console.log(arr)  // [1, 1, 2, 1, 2, 3, 4, 4, 4]
`9. 手写一个Promise`
// 这个直接看 juejin/promise.js  这个目录下的文件

// vue diff 和reactdiff 有啥区别
// cdn 原理 回流啥的 https://zhuanlan.zhihu.com/p/28940451
`
使用cdn缓存时

客户端浏览器先检查是否有本地缓存是否过期，如果过期，则向CDN边缘节点发起请求，CDN边缘节点会检测用户请求数据的缓存是否过期，如果cdn数据没有过期，则直接响应用户请求，此时一个完成http请求结束；如果cdn数据已经过期，那么CDN还需要向源站发出回源请求，来拉取最新的数据。

缓存优点：
CDN的分流作用不仅减少了用户的访问延时，也减少的源站的负载。
缺点：
当网站更新时，如果CDN节点上数据没有及时更新，即便用户再浏览器使用Ctrl+F5的方式使浏览器端的缓存失效，也会因为CDN边缘节点没有同步最新数据而导致用户访问异常。
八、解决CDN缓存更新的办法

资源url参数加时间戳

url的参数加上时间戳，每次更新时时间戳也跟随更新，重新使cdn边缘节点同步源服务器最新数据。
http://www.cdn.com/static/images/test.png # 没加时间戳
http://www.cdn.com/static/images/test.png?_t=202012290910 # 加了时间戳
复制代码

调用cdn服务商提供的刷新缓存接口

CDN边缘节点对开发者是透明的，相比于浏览器Ctrl+F5的强制刷新来使浏览器本地缓存失效，开发者可以通过CDN服务商提供的“刷新缓存”接口来达到清理CDN边缘节点缓存的目的。
这样开发者在更新数据后，可以使用“刷新缓存”功能来强制CDN节点上的数据缓存过期，保证客户端在访问时，拉取到最新的数据。
 `
`闭包：自由变量的查找，是在函数定义的地方，向上级作用域查找。不是在执行的地方。
// 闭包 的原理 （ 堆内存 栈内存 调用栈 啥的 自己去掘金搜搜吧
// 为什么会有闭包 必报的应用场景
`

`JS面向对象
在JS中一切皆对象，但JS并不是一种真正的面向对象(OOP)的语言，因为它缺少类(class)的概念。虽然ES6引入了class和extends，使我们能够轻易地实现类和继承。但JS并不存在真实的类，JS的类是通过函数以及原型链机制模拟的，本小节的就来探究如何在ES5环境下利用函数和原型链实现JS面向对象的特性
在开始之前，我们先回顾一下原型链的知识，后续new和继承等实现都是基于原型链机制。很多介绍原型链的资料都能写上洋洋洒洒几千字，但我觉得读者们不需要把原型链想太复杂，容易把自己绕进去，其实在我看来，原型链的核心只需要记住三点：

每个对象都有__proto__属性，该属性指向其原型对象，在调用实例的方法和属性时，如果在实例对象上找不到，就会往原型对象上找
构造函数的prototype属性也指向实例的原型对象
原型对象的constructor属性指向构造函数
`


`1. 模拟实现new
首先我们要知道new做了什么

创建一个新对象，并继承其构造函数的prototype，这一步是为了继承构造函数原型上的属性和方法
执行构造函数，方法内的this被指定为该新实例，这一步是为了执行构造函数内的赋值操作
返回新实例（规范规定，如果构造方法返回了一个对象，那么返回该对象，否则返回第一步创建的新对象） `
// 在调用 new 的过程中会发生以上四件事情：

// 新生成了一个对象
// 链接到原型
// 绑定 this
// 返回新对象
// new是关键字,这里我们用函数来模拟,new Foo(args) <=> myNew(Foo, args)
function myNew(foo, ...args) {
    // 创建新对象,并继承构造方法的prototype属性, 这一步是为了把obj挂原型链上, 相当于obj.__proto__ = Foo.prototype
    let obj = Object.create(foo.prototype)

    // 执行构造方法, 并为其绑定新this, 这一步是为了让构造方法能进行this.name = name之类的操作, args是构造方法的入参, 因为这里用myNew模拟, 所以入参从myNew传入
    let result = foo.apply(obj, args)

    // 如果构造方法已经return了一个对象，那么就返回该对象，否则返回myNew创建的新对象
    // （一般情况下，构造方法不会返回新实例，但使用者可以选择返回新实例来覆盖new创建的对象）
    return Object.prototype.toString.call(result) === '[object Object]' ? result : obj
}

// 测试：
function Foo(name) {
    this.name = name
}
const newObj = myNew(Foo, 'zhangsan')
console.log(newObj)                 // Foo {name: "zhangsan"}
console.log(newObj instanceof Foo)  // true
//     instanceof 的原理是什么？

// instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
function myInstanceof(left, right) {
    let prototype = right.prototype
    left = left.__proto__
    while (true) {
        if (left === null || left === undefined)
            return false
        if (prototype === left)
            return true
        left = left.__proto__
    }
}
`ES5如何实现继承
说到继承，最容易想到的是ES6的extends，当然如果只回答这个肯定不合格，我们要从函数和原型链的角度上实现继承，下面我们一步步地、递进地实现一个合格的继承

`


`原型链继承
原型链继承的原理很简单，直接让子类的原型对象指向父类实例，当子类实例找不到对应的属性和方法时，就会往它的原型对象，
也就是父类实例上找，从而实现对父类的属性和方法的继承`


// 父类
function Parent() {
    this.name = '写代码像蔡徐抻'
}
// 父类的原型方法
Parent.prototype.getName = function () {
    return this.name
}
// 子类
function Child() { }

// 让子类的原型对象指向父类实例, 这样一来在Child实例中找不到的属性和方法就会到原型对象(父类实例)上寻找
Child.prototype = new Parent()
Child.prototype.constructor = Child // 根据原型链的规则,顺便绑定一下constructor, 这一步不影响继承, 只是在用到constructor时会需要

// 然后Child实例就能访问到父类及其原型上的name属性和getName()方法
const child = new Child()
child.name          // '写代码像蔡徐抻'
child.getName()     // '写代码像蔡徐抻'
`原型继承的缺点:

由于所有Child实例原型都指向同一个Parent实例, 因此对某个Child实例的父类引用类型变量修改会影响所有的Child实例
在创建子类实例时无法向父类构造传参, 即没有实现super()的功能`
// 示例:
function Parent() {
    this.name = ['写代码像蔡徐抻']
}
Parent.prototype.getName = function () {
    return this.name
}
function Child() { }

Child.prototype = new Parent()
Child.prototype.constructor = Child

// 测试
const child1 = new Child()
const child2 = new Child()
child1.name[0] = 'foo'
console.log(child1.name)          // ['foo']
console.log(child2.name)          // ['foo'] (预期是['写代码像蔡徐抻'], 对child1.name的修改引起了所有child实例的变化)
`二. 构造函数继承
构造函数继承，即在子类的构造函数中执行父类的构造函数，并为其绑定子类的this，让父类的构造函数把成员属性和方法都挂到子类的this上去，
这样既能避免实例之间共享一个原型实例，又能向父类构造方法传参`

function Parent(name) {
    this.name = [name]
}
Parent.prototype.getName = function () {
    return this.name
}
function Child() {
    Parent.call(this, 'zhangsan')   // 执行父类构造方法并绑定子类的this, 使得父类中的属性能够赋到子类的this上
}

//测试
const child1 = new Child()
const child2 = new Child()
child1.name[0] = 'foo'
console.log(child1.name)          // ['foo']
console.log(child2.name)          // ['zhangsan']
child2.getName()                  // 报错,找不到getName(), 构造函数继承的方式继承不到父类原型上的属性和方法

`构造函数继承的缺点:

继承不到父类原型上的属性和方法`
`组合式继承
既然原型链继承和构造函数继承各有互补的优缺点, 那么我们为什么不组合起来使用呢, 所以就有了综合二者的组合式继承
`
function Parent(name) {
    this.name = [name]
}
Parent.prototype.getName = function () {
    return this.name
}
function Child() {
    // 构造函数继承
    Parent.call(this, 'zhangsan')
}
//原型链继承
Child.prototype = new Parent()
Child.prototype.constructor = Child

//测试
const child1 = new Child()
const child2 = new Child()
child1.name[0] = 'foo'
console.log(child1.name)          // ['foo']
console.log(child2.name)          // ['zhangsan']
child2.getName()                  // ['zhangsan']
`组合式继承的缺点:

每次创建子类实例都执行了两次构造函数(Parent.call()和new Parent())，
虽然这并不影响对父类的继承，但子类创建实例时，原型中会存在两份相同的属性和方法，这并不优雅`
`四. 寄生式组合继承
为了解决构造函数被执行两次的问题, 我们将指向父类实例改为指向父类原型, 减去一次构造函数的执行`

function Parent(name) {
    this.name = [name]
}
Parent.prototype.getName = function () {
    return this.name
}
function Child() {
    // 构造函数继承
    Parent.call(this, 'zhangsan')
}
//原型链继承
// Child.prototype = new Parent()
Child.prototype = Parent.prototype  //将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child

//测试
const child1 = new Child()
const child2 = new Child()
child1.name[0] = 'foo'
console.log(child1.name)          // ['foo']
console.log(child2.name)          // ['zhangsan']
child2.getName()                  // ['zhangsan']

`但这种方式存在一个问题，由于子类原型和父类原型指向同一个对象，我们对子类原型的操作会影响到父类原型，
例如给Child.prototype增加一个getName()方法，那么会导致Parent.prototype也增加或被覆盖一个getName()方法，
为了解决这个问题，我们给Parent.prototype做一个浅拷贝
 `

//  寄生组合继承  就看下边这段代码就行
// 简单来说就是 构造函数继承 Parent.call(this, 'zhangsan') +
//  原型链继承 Child.prototype = Object.create(Parent.prototype)  //将`指向父类实例`改为`指向父类原型`

function Parent(name) {
    this.name = [name]
}
Parent.prototype.getName = function () {
    return this.name
}
function Child() {
    // 构造函数继承
    Parent.call(this, 'zhangsan')
}
//原型链继承
// Child.prototype = new Parent()
Child.prototype = Object.create(Parent.prototype)  //将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child

//测试
const child = new Child()
const parent = new Parent()
child.getName()                  // ['zhangsan']
parent.getName()                 // 报错, 找不到getName()
`到这里我们就完成了ES5环境下的继承的实现，这种继承方式称为寄生组合式继承，是目前最成熟的继承方式，babel对ES6继承的转化也是使用了寄生组合式继承
我们回顾一下实现过程：
一开始最容易想到的是原型链继承，通过把子类实例的原型指向父类实例来继承父类的属性和方法，但原型链继承的缺陷在于对子类实例继承的引用类型的修改会影响到所有的实例对象以及无法向父类的构造方法传参。
因此我们引入了构造函数继承, 通过在子类构造函数中调用父类构造函数并传入子类this来获取父类的属性和方法，但构造函数继承也存在缺陷，构造函数继承不能继承到父类原型链上的属性和方法。
所以我们综合了两种继承的优点，提出了组合式继承，但组合式继承也引入了新的问题，它每次创建子类实例都执行了两次父类构造方法，
我们通过将子类原型指向父类实例改为子类原型指向父类原型的浅拷贝来解决这一问题，也就是最终实现 —— 寄生组合式继承
`


`V8  1. V8如何执行一段JS代码
预解析：检查语法错误但不生成AST
生成AST：经过词法/语法分析，生成抽象语法树
生成字节码：基线编译器(Ignition)将AST转换成字节码
生成机器码：优化编译器(Turbofan)将字节码转换成优化过的机器码，此外在逐行执行字节码的过程中，如果一段代码经常被执行，那么V8会将这段代码直接转换成机器码保存起来，下一次执行就不必经过字节码，优化了执行速度

`
`介绍一下引用计数和标记清除

引用计数：给一个变量赋值引用类型，则该对象的引用次数+1，如果这个变量变成了其他值，那么该对象的引用次数-1，垃圾回收器会回收引用次数为0的对象。但是当对象循环引用时，会导致引用次数永远无法归零，造成内存无法释放。
标记清除：垃圾收集器先给内存中所有对象加上标记，然后从根节点开始遍历，去掉被引用的对象和运行环境中对象的标记，剩下的被标记的对象就是无法访问的等待回收的对象。
 `

 `V8如何进行垃圾回收

 JS引擎中对变量的存储主要有两种位置，栈内存和堆内存，
 栈内存存储 基本类型数据 以及 引用类型数据的内存地址，
 堆内存储存 引用类型的数据

栈内存的回收：

栈内存调用栈上下文切换后就被回收，比较简单

堆内存的回收：

V8的堆内存分为新生代内存和老生代内存，新生代内存是临时分配的内存，存在时间短，老生代内存存在时间长

新生代内存回收机制：

新生代内存容量小，64位系统下仅有32M。新生代内存分为From、To两部分，
进行垃圾回收时，先扫描From，将非存活对象回收，将存活对象顺序复制到To中，之后调换From/To，等待下一次回收


老生代内存回收机制

晋升：如果新生代的变量经过多次回收依然存在，那么就会被放入老生代内存中
标记清除：老生代内存会先遍历所有对象并打上标记，然后对正在使用或被强引用的对象取消标记，回收被标记的对象
整理内存碎片：把对象挪到内存的一端
`

`JS相较于C++等语言为什么慢，V8做了哪些优化


JS的问题：

动态类型：导致每次存取属性/寻求方法时候，都需要先检查类型；此外动态类型也很难在编译阶段进行优化
属性存取：C++/Java等语言中方法、属性是存储在数组中的，仅需数组位移就可以获取，而JS存储在对象中，每次获取都要进行哈希查询


V8的优化：

优化JIT(即时编译)：相较于C++/Java这类编译型语言，JS一边解释一边执行，效率低。V8对这个过程进行了优化：如果一段代码被执行多次，那么V8会把这段代码转化为机器码缓存下来，下次运行时直接使用机器码。
隐藏类：对于C++这类语言来说，仅需几个指令就能通过偏移量获取变量信息，而JS需要进行字符串匹配，效率低，V8借用了类和偏移位置的思想，将对象划分成不同的组，即隐藏类
内嵌缓存：即缓存对象查询的结果。常规查询过程是：获取隐藏类地址 -> 根据属性名查找偏移值 -> 计算该属性地址，内嵌缓存就是对这一过程结果的缓存
垃圾回收管理：上文已介绍
 `

 `V8 GC 全停顿问题
 https://time.geekbang.org/column/article/232138?utm_source=related_read&utm_medium=article&utm_term=related_read
由于 JavaScript 是运行在主线程之上的，因此，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。
我们把这种行为叫做全停顿（Stop-The-World）。

 第一，将一个完整的垃圾回收的任务拆分成多个小的任务，这样就消灭了单个长的垃圾回收任务；
 第二，将标记对象、移动对象等任务转移到后台线程进行，这会大大减少主线程暂停的时间，改善页面卡顿的问题，让动画、滚动和用户交互更加流畅。

 `



`1. 浏览器的渲染过程是怎样的
大体流程如下：
HTML和CSS经过各自解析，生成DOM树和CSSOM树
合并成为渲染树
根据渲染树进行布局
最后调用GPU进行绘制，显示在屏幕上 （合成层
`

// 什么是合成层（Compositing Layer）
`
首先合成就是将页面的各个部分分成多个层、单独光栅化（浏览器根据文档的结构、每个元素的样式、页面的几何形状和绘制顺序转换为屏幕上的像素的过程）
它们并在合成器线程中合成为一个页面的技术。


一般来说，拥有一些特定属性的渲染层，会被浏览器自动提升为合成层。
合成层拥有单独的图层（GraphicsLayer），和其他图层之间无不影响。
而其它不是合成层的渲染层，则和第一个拥有图层的父层共用一个，也就是普通文档流中的内容，
我们看一些常见的提升为合成层的属性：

设置 transform: translateZ(0)，注意它必须是 translateZ，因为它使用 GPU 来计算 perspective distortion（透视失真）。如果你使用 translateX 或 translateY，元素将会被绘制在普通文档流中 demo。
backface-visibility: hidden 指定当元素背面朝向观察者时是否可见 demo。
will-change 该属性告诉浏览器该元素会有哪些变化，这样浏览器可以提前做好对应的优化准备工作。当该属性的值为 opacity、transform、top、left、bottom、right 时 demo。
video、canvas、iframe 等元素。
隐式合成：z-index重叠  一个或多个非合成元素应出现在堆叠顺序上的合成元素之上，会被提升为合成层。


4. 合成层的利弊
渲染层的提示带来的好处：

开启硬件加速，合成层的位图会交由 GPU 合成，相比 CPU 处理要快。
合成层发生 repaint 的时候，不会影响其他图层。
对于 transform 和 opacity 效果，不会触发 layout 和 paint。

当然合成层也存在一些问题：

如果我们把所有渲染工作都交给 GPU，在现有的优化下，它会导致渲染内存占用比大幅度提升，反而出现负面的效果。
另外隐式合成容易产生大量我们意料之外的合成层，过大的内存占用，会让页面变的卡顿，性能优化适得其反。



`

`2. 如何根据浏览器渲染机制加快首屏速度

优化文件大小：HTML和CSS的加载和解析都会阻塞渲染树的生成，从而影响首屏展示速度，因此我们可以通过优化文件大小、减少CSS文件层级的方法来加快首屏速度
避免资源下载阻塞文档解析：浏览器解析到<script>标签时，会阻塞文档解析，直到脚本执行完成，因此我们通常把<script>标签放在底部，或者加上defer、async来进行异步下载
 `

 `
 3. 什么是回流(重排)，什么情况下会触发回流

当元素的尺寸或者位置发生了变化，就需要重新计算渲染树，这就是回流
DOM元素的几何属性(width/height/padding/margin/border)发生变化时会触发回流
DOM元素移动或增加会触发回流
读写offset/scroll/client等属性时会触发回流
调用window.getComputedStyle会触发回流
 `
 `
 . 什么是重绘，什么情况下会触发重绘
DOM样式发生了变化，但没有影响DOM的几何属性时，会触发重绘，而不会触发回流。重绘由于DOM位置信息不需要更新，省去了布局过程，因而性能上优于回流
`

`什么是GPU加速，如何使用GPU加速，GPU加速的缺点

优点：使用transform、opacity、filters等属性时，会直接在GPU中完成处理，这些属性的变化不会引起回流重绘
缺点：GPU渲染字体会导致字体模糊，过多的GPU处理会导致内存问题
 `

//  display:none visibility:hidden opcity:0 三者的区别 TODO:


 `如何减少回流

使用 class 替代 style，减少style的使用
使用 resize、scroll 时进行防抖和节流处理，这两者会直接导致回流
使用 visibility:hidden 替换display: none，因为前者只会引起重绘，后者会引发回流
批量修改元素时，可以先让元素脱离文档流，等修改完毕后，再放入文档流
避免触发同步布局事件，我们在获取offsetWidth这类属性的值时，可以使用变量将查询结果存起来，避免多次查询，每次对offset/scroll/client等属性进行查询时都会触发回流
对于复杂动画效果,使用绝对定位让其脱离文档流，复杂的动画效果会频繁地触发回流重绘，我们可以将动画元素设置绝对定位从而脱离文档流避免反复回流重绘。
 `
// 在不考虑缓存和优化网络协议的前提下，考虑可以通过哪些方式来最快的渲染页面，
// 也就是常说的关键渲染路径，这部分也是性能优化中的一块内容。 TODO:
// 当发生 DOMContentLoaded 事件后，就会生成渲染树，生成渲染树就可以进行渲染了，这一过程更大程度上和硬件有关系了。
// 就是看 DOMContentLoaded 越早越好
`提示如何加速：

从文件大小考虑
从 script 标签使用上来考虑
从 CSS、HTML 的代码书写上来考虑
从需要下载的内容是否需要在首屏使用上来考虑`



 `1. 介绍一下浏览器缓存位置和优先级

 Service Worker
Memory Cache（内存缓存）
Disk Cache（硬盘缓存）
Push Cache（推送缓存）
以上缓存都没命中就会进行网络请求
`

`说说不同缓存间的差别


Service Worker


和Web Worker类似，是独立的线程，我们可以在这个线程中缓存文件，在主线程需要的时候读取这里的文件，Service Worker使我们可以自由选择缓存哪些文件以及文件的匹配、读取规则，并且缓存是持续性的


Memory Cache


即内存缓存，内存缓存不是持续性的，缓存会随着进程释放而释放


Disk Cache


即硬盘缓存，相较于内存缓存，硬盘缓存的持续性和容量更优，它会根据HTTP header的字段判断哪些资源需要缓存


Push Cache


即推送缓存，是HTTP/2的内容，目前应用较少
 `

 ` 介绍一下浏览器缓存策略

强缓存(不要向服务器询问的缓存)

设置Expires

即过期时间，例如「Expires: Thu, 26 Dec 2019 10:30:42 GMT」表示缓存会在这个时间后失效，这个过期日期是绝对日期，如果修改了本地日期，或者本地日期与服务器日期不一致，那么将导致缓存过期时间错误。

设置Cache-Control

HTTP/1.1新增字段，Cache-Control可以通过max-age字段来设置过期时间，例如「Cache-Control:max-age=3600」除此之外Cache-Control还能设置private/no-cache等多种字段


协商缓存(需要向服务器询问缓存是否已经过期)

Last-Modified

即最后修改时间，浏览器第一次请求资源时，服务器会在响应头上加上Last-Modified ，当浏览器再次请求该资源时，浏览器会在请求头中带上If-Modified-Since 字段，字段的值就是之前服务器返回的最后修改时间，服务器对比这两个时间，若相同则返回304，否则返回新资源，并更新Last-Modified

ETag

HTTP/1.1新增字段，表示文件唯一标识，只要文件内容改动，ETag就会重新计算。缓存流程和 Last-Modified 一样：服务器发送 ETag 字段 -> 浏览器再次请求时发送 If-None-Match -> 如果ETag值不匹配，说明文件已经改变，返回新资源并更新ETag，若匹配则返回304


两者对比


ETag 比 Last-Modified 更准确：
如果我们打开文件但并没有修改，Last-Modified 也会改变， （坏处1 只打开不改也会变
并且 Last-Modified 的单位时间为一秒，如果一秒内修改完了文件，那么还是会命中缓存（坏处二 精度小于一秒



如果什么缓存策略都没有设置，那么浏览器会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间

参考资料：浏览器缓存机制剖析


实际场景应用缓存策略
频繁变动的资源
对于频繁变动的资源，首先需要使用 Cache-Control: no-cache 使浏览器每次都请求服务器，
然后配合 ETag 或者 Last-Modified 来验证资源是否有效。
这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

代码文件
这里特指除了 HTML 外的代码文件，因为 HTML 文件一般不缓存或者缓存时间很短。

一般来说，现在都会使用工具来打包代码，那么我们就可以对文件名进行哈希处理，只有当代码修改后才会生成新的文件名。
基于此，我们就可以给代码文件设置缓存有效期一年 Cache-Control: max-age=31536000，
这样只有当 HTML 文件中引入的文件名发生了改变才会去下载最新的代码文件，否则就一直使用缓存。


 `
str ='https://juejin.im/post/6844903473268391943'




 `1. 讲讲网络OSI七层模型，TCP/IP和HTTP分别位于哪一层


模型
概述
单位

物理层
网络连接介质，如网线、光缆，数据在其中以比特为单位传输
bit


数据链路层
数据链路层将比特封装成数据帧并传递
帧


网络层
定义IP地址，定义路由功能，建立主机到主机的通信
数据包


传输层
负责将数据进行可靠或者不可靠传递，建立端口到端口的通信
数据段


会话层
控制应用程序之间会话能力，区分不同的进程



表示层
数据格式标识，基本压缩加密功能



应用层
各种应用软件
 `

 `常见HTTP状态码有哪些
100	Continue	继续。客户端应继续其请求
101	Switching Protocols	切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议
2xx 开头（请求成功）

200 OK：客户端发送给服务器的请求被正常处理并返回


3xx 开头（重定向）

301 Moved Permanently：永久重定向，请求的网页已永久移动到新位置。 服务器返回此响应时，会自动将请求者转到新位置
302 Moved Permanently：临时重定向，请求的网页已临时移动到新位置。服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求
304 Not Modified：未修改，自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容


4xx 开头（客户端错误）

400 Bad Request：错误请求，服务器不理解请求的语法，常见于客户端传参错误
401 Unauthorized：未授权，表示发送的请求需要有通过 HTTP 认证的认证信息，常见于客户端未登录
403 Forbidden：禁止，服务器拒绝请求，常见于客户端权限不足
404 Not Found：未找到，服务器找不到对应资源


5xx 开头（服务端错误）

500 Inter Server Error：服务器内部错误，服务器遇到错误，无法完成请求
501 Not Implemented：尚未实施，服务器不具备完成请求的功能
502 Bad Gateway：作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。
503 service unavailable：服务不可用，服务器目前无法使用（处于超载或停机维护状态）。通常是暂时状态。

 `

 `GET请求和POST请求有何区别

标准答案：


GET请求参数放在URL上，POST请求参数放在请求体里
GET请求参数长度有限制，POST请求参数长度可以非常大
POST请求相较于GET请求安全一点点，因为GET请求的参数在URL上，且有历史记录
GET请求能缓存，POST不能


更进一步：

其实HTTP协议并没有要求GET/POST请求参数必须放在URL上或请求体里，也没有规定GET请求的长度，目前对URL的长度限制，是各家浏览器设置的限制。
GET和POST的根本区别在于：GET请求是幂等性的，而POST请求不是

幂等性，指的是对某一资源进行一次或多次请求都具有相同的副作用。例如搜索就是一个幂等的操作，而删除、新增则不是一个幂等操作。

由于GET请求是幂等的，在网络不好的环境中，GET请求可能会重复尝试，造成重复操作数据的风险，
因此，GET请求用于无副作用的操作(如搜索)，新增/删除等操作适合用POST

参考资料：HTTP｜GET 和 POST 区别？网上多数答案都是错的 https://juejin.im/entry/6844903489127219214
`

` HTTP的请求报文由哪几部分组成
一个HTTP请求报文由请求行（request line）、请求头（header）、空行和请求数据4个部分组成
见图 ./http请求报文.webp

响应报文和请求报文结构类似，不再赘述
`

`
HTTP常见请求/响应头及其含义

通用头（请求头和响应头都有的首部）




字段
作用
值




Cache-Control
控制缓存
public：表示响应可以被任何对象缓存(包括客户端/代理服务器)private(默认值)：响应只能被单个客户缓存,不能被代理服务器缓存
no-cache：缓存要经过服务器验证，在浏览器使用缓存前，会对比ETag，若没变则返回304，使用缓存
no-store：禁止任何缓存


Connection
是否需要持久连接(HTTP 1.1默认持久连接)
keep-alive / close


Transfer-Encoding
报文主体的传输编码格式
chunked(分块) / identity(未压缩和修改) / gzip(LZ77压缩) / compress(LZW压缩,弃用) / deflate(zlib结构压缩)




请求头




字段
作用
语法




Accept
告知（服务器）客户端可以处理的内容类型
text/html、image/*、*/*


If-Modified-Since
将Last-Modified的值发送给服务器，询问资源是否已经过期(被修改)，过期则返回新资源，否则返回304
示例：If-Modified-Since: Wed, 21 Oct 2015 07:28:00 GMT


If-Unmodified-Since
将Last-Modified的值发送给服务器，询问文件是否被修改，若没有则返回200，否则返回412预处理错误，可用于断点续传。通俗点说If-Unmodified-Since是文件没有修改时下载，If-Modified-Since是文件修改时下载
示例：If-Unmodified-Since: Wed, 21 Oct 2015 07:28:00 GMT


If-None-Match
将ETag的值发送给服务器，询问资源是否已经过期(被修改)，过期则返回新资源，否则返回304
示例：If-None-Match: "bf13a6472992d82d"


If-Match
将ETag的值发送给服务器，询问文件是否被修改，若没有则返回200，否则返回412预处理错误，可用于断点续传
示例：If-Match: "bf129c88ca92d82d"


Range
告知服务器返回文件的哪一部分, 用于断点续传
示例：Range: bytes=200-1000, 2000-6576, 19000-


Host
指明了服务器的域名（对于虚拟主机来说），以及（可选的）服务器监听的TCP端口号
示例：Host:www.baidu.com


User-Agent
告诉HTTP服务器， 客户端使用的操作系统和浏览器的名称和版本
User-Agent: Mozilla/<version> (<system-information>) <platform> (<platform-details>) <extensions>




响应头




字段
作用
语法




Location
需要将页面重新定向至的地址。一般在响应码为3xx的响应中才会有意义
Location: <url>


ETag
资源的特定版本的标识符，如果内容没有改变，Web服务器不需要发送完整的响应
ETag: "<etag_value>"


Server
处理请求的源头服务器所用到的软件相关信息
Server: <product>




实体头（针对请求报文和响应报文的实体部分使用首部）




字段
作用
语法




Allow
资源可支持http请求的方法
Allow: <http-methods>，示例：Allow: GET, POST, HEAD


Last-Modified
资源最后的修改时间，用作一个验证器来判断接收到的或者存储的资源是否彼此一致，精度不如ETag
示例：Last-Modified: Wed, 21 Oct 2020 07:28:00 GMT


Expires
响应过期时间
Expires: <http-date>，示例：Expires: Wed, 21 Oct 2020 07:28:00 GMT



HTTP首部当然不止这么几个，但为了避免写太多大家记不住(主要是别的我也没去看)，这里只介绍了一些常用的，详细的可以看MDN的文档
 `


 `HTTP/1.0和HTTP/1.1有什么区别

长连接： HTTP/1.1支持长连接和请求的流水线，在一个TCP连接上可以传送多个HTTP请求，避免了因为多次建立TCP连接的时间消耗和延时
缓存处理： HTTP/1.1引入Entity tag，If-Unmodified-Since, If-Match, If-None-Match等新的请求头来控制缓存，详见浏览器缓存小节
带宽优化及网络连接的使用： HTTP1.1则在请求头引入了range头域，支持断点续传功能
Host头处理： 在HTTP/1.0中认为每台服务器都有唯一的IP地址，但随着虚拟主机技术的发展，多个主机共享一个IP地址愈发普遍，HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会400错误

 `

    `介绍一下HTTP/2.0新特性

多路复用： 即多个请求都通过一个TCP连接并发地完成 （实现原理就是 二进制分帧层 带id的帧发送后可重新组合）
服务端推送： 服务端能够主动把资源推送给客户端
新的二进制格式： HTTP/2采用二进制格式传输数据，相比于HTTP/1.1的文本格式，二进制格式具有更好的解析性和拓展性
header压缩： HTTP/2压缩消息头，减少了传输数据的大小
`

`说说HTTP/2.0多路复用基本原理以及解决的问题

HTTP/2解决的问题，就是HTTP/1.1存在的问题：


TCP慢启动： TCP连接建立后，会经历一个先慢后快的发送过程，就像汽车启动一般，如果我们的网页文件(HTML/JS/CSS/icon)都经过一次慢启动，对性能是不小的损耗。另外慢启动是TCP为了减少网络拥塞的一种策略，我们是没有办法改变的。
多条TCP连接竞争带宽： 如果同时建立多条TCP连接，当带宽不足时就会竞争带宽，影响关键资源的下载。
HTTP/1.1队头阻塞： 尽管HTTP/1.1长链接可以通过一个TCP连接传输多个请求，但同一时刻只能处理一个请求，当前请求未结束前，其他请求只能处于阻塞状态。

为了解决以上几个问题，HTTP/2一个域名只使用一个TCP⻓连接来传输数据，而且请求直接是并行的、非阻塞的，这就是多路复用
实现原理： HTTP/2引入了一个二进制分帧层，客户端和服务端进行传输时，数据会先经过二进制分帧层处理，转化为一个个带有请求ID的帧，这些帧在传输完成后根据ID组合成对应的数据。
`

`说说HTTP/3.0
尽管HTTP/2解决了很多1.1的问题，但HTTP/2仍然存在一些缺陷，这些缺陷并不是来自于HTTP/2协议本身，而是来源于底层的TCP协议，
我们知道TCP链接是可靠的连接，如果出现了丢包，那么整个连接都要等待重传，
HTTP/1.1可以同时使用6个TCP连接，一个阻塞另外五个还能工作，但HTTP/2只有一个TCP连接，阻塞的问题便被放大了。
由于TCP协议已经被广泛使用，我们很难直接修改TCP协议，基于此，HTTP/3选择了一个折衷的方法——UDP协议，
HTTP/2在UDP的基础上实现多路复用、0-RTT、TLS加密、流量控制、丢包重传等功能。


参考资料：http发展史(http0.9、http1.0、http1.1、http2、http3)梳理笔记 (推荐阅读)
https://juejin.im/post/6844904001528397837#heading-9


小结一下
我们首先分析了影响HTTP / 1.1效率的三个主要因素: TCP的慢启动、多条TCP连接竞争带宽和队头阻塞。
接下来我们分析了HTTP / 2是如何采用多路复用机制来解决这些问题的。多路复用是通过在协议栈中添加二进制分帧层来实现的，有了二进制分帧层还能够实现请求的优先级、服务器推送、头部压缩等特性，从而大大提升了文件传输效率。


2=>3
2的缺点：
tcp 队头阻塞 由于 http2 只有一个tcp连接  所以随着丢包率的增加，HTTP/2的传输效率也会越来越差  ； 1.1有六个tcp 一个丢包 不影响其他的
建立连接延迟  +TLS层 总之，在传输数据之前，我们需要花掉3〜4个RTT

网络延迟又称为RTT(Round Trip Time)。我们把从浏览器发送一个数据包到服务器，再从服务器返回数据包到浏览器的整个往返时间称为RTT

http3  QUIC协议（全称Quick UDP Internet Connections，快速UDP互联网连接）
实现了类似TCP的流量控制、传输可靠性的功能。虽然UDP不提供可靠性的传输，但QUIC在UDP的基础 之上增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制以及其他一些TCP中存在的特性。
集成了TLS加密功能。目前QUIC使用的是TLS1.3，相较于早期版本，TLS1.3有更多的优点，其中最重要的 一点是减少了握手所花费的RTT个数。
实现了HTTP/2中的多路复用功能。和TCP不同，QUIC实现了在同一物理连接上可以有多个独立的逻辑数 据流(如下图)。实现了数据流的单独传输，就解决了TCP中队头阻塞的问题。

实现了快速握手功能。由于QUIC是基于UDP的，所以QUIC可以实现使用0-RTT或者1-RTT来建立连接， 这意味着QUIC可以用最快的速度来发送和接收数据，这样可以大大提升首次打开⻚面的速度。


 缺点就是 生态不成熟


`


// tcp udp 区别
`
 1、基于连接与无连接；
 2、对系统资源的要求（TCP较多，UDP少）；
 3、UDP程序结构较简单；
 4、流模式与数据报模式 ；
 5、TCP保证数据正确性，UDP可能丢包；
 6、TCP保证数据顺序，UDP不保证。


 四、TCP和UDP的比较
1. 对比
UDP	                                                 TCP
是否连接	无连接	                                  面向连接
是否可靠	不可靠传输，不使用流量控制和拥塞控制	       可靠传输，使用流量控制和拥塞控制
连接对象个数	支持一对一，一对多，多对一和多对多交互通信	 只能是一对一通信
传输方式	面向报文	                              面向字节流
首部开销	首部开销小，仅8字节	                       首部最小20字节，最大60字节
适用场景	适用于实时应用（IP电话、视频会议、直播等）	   适用于要求可靠传输的应用，例如文件传输
2. 总结
TCP向上层提供面向连接的可靠服务 ，UDP向上层提供无连接不可靠服务。
虽然 UDP 并没有 TCP 传输来的准确，但是也能在很多实时性要求高的地方有所作为
对数据准确性要求高，速度可以相对较慢的，可以选用TCP
`
`
UDP（User Data Protocol，用户数据报协议）
1、UDP是一个非连接的协议，传输数据之前源端和终端不建立连接， 当它想传送时就简单地去抓取来自应用程序的数据，并尽可能快地把它扔到网络上。 在发送端，UDP传送数据的速度仅仅是受应用程序生成数据的速度、 计算机的能力和传输带宽的限制； 在接收端，UDP把每个消息段放在队列中，应用程序每次从队列中读一个消息段。
2、由于传输数据不建立连接，因此也就不需要维护连接状态，包括收发状态等， 因此一台服务机可同时向多个客户机传输相同的消息。
3、UDP信息包的标题很短，只有8个字节，相对于TCP的20个字节信息包的额外开销很小。
4、吞吐量不受拥挤控制算法的调节，只受应用软件生成数据的速率、传输带宽、 源端和终端主机性能的限制。
5、UDP使用尽最大努力交付，即不保证可靠交付， 因此主机不需要维持复杂的链接状态表（这里面有许多参数）。
6、UDP是面向报文的。发送方的UDP对应用程序交下来的报文， 在添加首部后就向下交付给IP层。既不拆分，也不合并，而是保留这些报文的边界， 因此，应用程序需要选择合适的报文大小。
`

`TCP（Transmission Control Protocol，传输控制协议）是面向连接的协议，
也就是说，在收发数据前，必须和对方建立可靠的连接。
一个TCP连接必须要经过三次“对话”才能建立起来，其中的过程非常复杂， 只简单的描述下这三次对话的简单过程：

1）主机A向主机B发出连接请求数据包：“我想给你发数据，可以吗？”，这是第一次对话；

2）主机B向主机A发送同意连接和要求同步 （同步就是两台主机一个在发送，一个在接收，协调工作）的数据包 ：“可以，你什么时候发？”，这是第二次对话；

3）主机A再发出一个数据包确认主机B的要求同步：“我现在就发，你接着吧！”， 这是第三次对话。

三次“对话”的目的是使数据包的发送和接收同步， 经过三次“对话”之后，主机A才向主机B正式发送数据。
TCP三次握手过程
第一次握手：主机A通过向主机B 发送一个含有同步序列号的标志位的数据段给主机B，向主机B 请求建立连接，通过这个数据段， 主机A告诉主机B 两件事：我想要和你通信；你可以用哪个序列号作为起始数据段来回应我。

第二次握手：主机B 收到主机A的请求后，用一个带有确认应答（ACK）和同步序列号（SYN）标志位的数据段响应主机A，也告诉主机A两件事：我已经收到你的请求了，你可以传输数据了；你要用那个序列号作为起始数据段来回应我

第三次握手：主机A收到这个数据段后，再发送一个确认应答，确认已收到主机B 的数据段："我已收到回复，我现在要开始传输实际数据了，这样3次握手就完成了，主机A和主机B 就可以传输数据了。

3次握手的特点
没有应用层的数据, SYN这个标志位只有在TCP建立连接时才会被置1, 握手完成后SYN标志位被置0。



TCP建立连接要进行3次握手，而断开连接要进行4次
第一次： 当主机A完成数据传输后, 将控制位FIN置1，提出停止TCP连接的请求 ；

第二次： 主机B收到FIN后对其作出响应，确认这一方向上的TCP连接将关闭, 将ACK置1；

第三次： 由B 端再提出反方向的关闭请求, 将FIN置1 ；

第四次： 主机A对主机B的请求进行确认，将ACK置1，双方向的关闭结束.。



由TCP的三次握手和四次断开可以看出，TCP使用面向连接的通信方式， 大大提高了数据通信的可靠性，使发送数据端和接收端在数据正式传输前就有了交互， 为数据正式传输打下了可靠的基础。

`
` HTTP和HTTPS有何区别

HTTPS使用443端口，而HTTP使用80
HTTPS需要申请证书
HTTP是超文本传输协议，是明文传输；HTTPS是经过SSL加密的协议，传输更安全
HTTPS比HTTP慢，因为HTTPS除了TCP握手的三个包，还要加上SSL握手的九个包
 `

 `HTTPS是如何进行加密的
我们通过分析几种加密方式，层层递进，理解HTTPS的加密方式以及为什么使用这种加密方式：

对称加密

客户端和服务器公用一个密匙用来对消息加解密，这种方式称为对称加密。客户端和服务器约定好一个加密的密匙。客户端在发消息前用该密匙对消息加密，发送给服务器后，服务器再用该密匙进行解密拿到消息。

这种方式一定程度上保证了数据的安全性，但密钥一旦泄露(密钥在传输过程中被截获)，传输内容就会暴露，因此我们要寻找一种安全传递密钥的方法。

非对称加密

采用非对称加密时，客户端和服务端均拥有一个公钥和私钥，公钥加密的内容只有对应的私钥能解密。私钥自己留着，公钥发给对方。
这样在发送消息前，先用对方的公钥对消息进行加密，收到后再用自己的私钥进行解密。
这样攻击者只拿到传输过程中的公钥也无法破解传输的内容

尽管非对称加密解决了由于密钥被获取而导致传输内容泄露的问题，
但中间人仍然可以用篡改公钥的方式来获取或篡改传输内容，
而且非对称加密的性能比对称加密的性能差了不少


第三方认证

上面这种方法的弱点在于，客户端不知道公钥是由服务端返回，还是中间人返回的，
因此我们再引入一个第三方认证的环节：即第三方使用私钥加密我们自己的公钥，
浏览器已经内置一些权威第三方认证机构的公钥，浏览器会使用第三方的公钥来解开第三方私钥加密过的我们自己的公钥，
从而获取公钥，如果能成功解密，就说明获取到的自己的公钥是正确的
但第三方认证也未能完全解决问题，第三方认证是面向所有人的，中间人也能申请证书，如果中间人使用自己的证书掉包原证书，客户端还是无法确认公钥的真伪


数字签名

为了让客户端能够验证公钥的来源，我们给公钥加上一个数字签名，这个数字签名是由企业、网站等各种信息和公钥经过单向hash而来，一旦构成数字签名的信息发生变化，hash值就会改变，这就构成了公钥来源的唯一标识。
具体来说，服务端本地生成一对密钥，然后拿着公钥以及企业、网站等各种信息到CA(第三方认证中心)去申请数字证书，CA会通过一种单向hash算法(比如MD5)，生成一串摘要，这串摘要就是这堆信息的唯一标识，然后CA还会使用自己的私钥对摘要进行加密，连同我们自己服务器的公钥一同发送给我我们。
浏览器拿到数字签名后，会使用浏览器本地内置的CA公钥解开数字证书并验证，从而拿到正确的公钥。
由于非对称加密性能低下，拿到公钥以后，客户端会随机生成一个对称密钥，
使用这个公钥加密并发送给服务端，服务端用自己的私钥解开对称密钥，
此后的加密连接就通过这个对称密钥进行对称加密。
综上所述，HTTPS在验证阶段使用非对称加密+第三方认证+数字签名获取正确的公钥，获取到正确的公钥后以对称加密的方式通信


参考资料：看图学HTTPS https://juejin.im/post/6844903608421449742#heading-5
 `


// 怎么验证ca证书 TODO:

// 1. vue怎么实现数据劫持
// 可以从new Vue()开始描述，描述new Vue()的过程，然后再说Vue2的observe方法怎么劫持数据，例如defineReactive方法内部调用Object.defineProperty劫持每个属性的get和set，同时还实例化dep对象负责收集依赖和派发更新。（最好再说一下Vue3劫持数据的过程，越详细越好）
// 4. document.ready和window.onload区别
`document.ready:是DOM结构绘制完毕后就执行，不必等到加载完毕。
意思就是DOM树加载完毕，就执行，不必等到页面中图片或其他外部文件都加载完毕。
并且可以写多个.ready。 执行 要早于 window.onload

window.onload:是页面所有元素都加载完毕，包括图片等所有元素。只能执行一次。

`
 `什么是CSRF攻击

CSRF即Cross-site request forgery(跨站请求伪造)，是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。

假如黑客在自己的站点上放置了其他网站的外链，例如"www.weibo.com/api，默认情况下，浏览器会带着weibo.com的cookie访问这个网址，
如果用户已登录过该网站且网站没有对CSRF攻击进行防御，那么服务器就会认为是用户本人在调用此接口并执行相关操作，致使账号被劫持。
 `

 `如何防御CSRF攻击

验证Token：浏览器请求服务器时，服务器返回一个token，每个请求都需要同时带上token和cookie才会被认为是合法请求
验证Referer：通过验证请求头的Referer来验证来源站点，但请求头很容易伪造
设置SameSite：设置cookie的SameSite，可以让cookie不随跨域请求发出，但浏览器兼容不一
 `

 `什么是XSS攻击

XSS即Cross Site Scripting（跨站脚本），指的是通过利用网页开发时留下的漏洞，注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。
常见的例如在评论区植入JS代码，用户进入评论页时代码被执行，造成页面被植入广告、账号信息被窃取
 `

 `XSS攻击有哪些类型

存储型：即攻击被存储在服务端，常见的是在评论区插入攻击脚本，如果脚本被储存到服务端，那么所有看见对应评论的用户都会受到攻击。
反射型：攻击者将脚本混在URL里，服务端接收到URL将恶意代码当做参数取出并拼接在HTML里返回，浏览器解析此HTML后即执行恶意代码
DOM型：将攻击脚本写在URL中，诱导用户点击该URL，如果URL被解析，那么攻击脚本就会被运行。和前两者的差别主要在于DOM型攻击不经过服务端
 `

 `
 如何防御XSS攻击

输入检查：对输入内容中的<script><iframe>等标签进行转义或者过滤
设置httpOnly：很多XSS攻击目标都是窃取用户cookie伪造身份认证，设置此属性可防止JS获取cookie
开启CSP，即开启白名单，可阻止白名单以外的资源加载和运行


// 下边是详细补充 说到上边三点就好了
通常可以通过两种方式来开启 CSP：

设置 HTTP Header 中的 Content-Security-Policy
设置 meta 标签的方式 <meta http-equiv="Content-Security-Policy">

以 HTTP Header 来举例

只允许加载本站资源

Content-Security-Policy: default-src ‘self’
只允许加载 HTTPS 协议图片

Content-Security-Policy: img-src https://*
允许加载任何来源框架

Content-Security-Policy: child-src 'none'

`


// 什么是点击劫持？如何防范点击劫持？

`点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，
并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

X-FRAME-OPTIONS
X-FRAME-OPTIONS 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。
这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。

该响应头有三个值可选，分别是

DENY，表示页面不允许通过 iframe 的方式展示
SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示`
// 对于 cookie 来说，我们还需要注意安全性。

// 属性	作用
// value	如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识
// http-only	不能通过 JS 访问 Cookie，减少 XSS 攻击
// secure	只能在协议为 HTTPS 的请求中携带
// same-site	规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击
`
JSON.parse(JSON.stringfy(obj))实现深拷贝的局限
会忽略 undefined
会忽略 symbol
不能序列化函数
不能解决循环引用的对象`

// 手写深拷贝
function deepClone(obj) {
    // 先判断是对象还是数组
    let copy = obj instanceof Array ? [] : {};
    for (let key in obj) {
        // 判断是否是对象上的属性，而不是原型上的属性
        if (obj.hasOwnProperty(key)) {
            // obj[key] 是否是对象，如果是对象，递归遍历
            copy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return copy;
}
`1. 手写冒泡排序
`
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}
`2. 如何优化一个冒泡排序
冒泡排序总会执行(N-1)+(N-2)+(N-3)+..+2+1趟，但如果运行到当中某一趟时排序已经完成，或者输入的是一个有序数组，那么后边的比较就都是多余的，
为了避免这种情况，我们增加一个flag，判断排序是否在中途就已经完成（也就是判断有无发生元素交换）
 `
 function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let flag = true
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = false
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
        // 这个flag的含义是：如果`某次循环`中没有交换过元素，那么意味着排序已经完成
        if (flag) break;
    }
    return arr
}
`3. 手写快速排序
快排基本步骤：

选取基准元素
比基准元素小的元素放到左边，大的放右边
在左右子数组中重复步骤一二，直到数组只剩下一个元素
向上逐级合并数组
`
function quickSort(arr) {
    if (arr.length <= 1) return arr          //递归终止条件
    const pivot = arr.length / 2 | 0        //基准点
    const pivotValue = arr.splice(pivot, 1)[0]
    const leftArr = []
    const rightArr = []
    arr.forEach(val => {
        val > pivotValue ? rightArr.push(val) : leftArr.push(val)
    })
    return [...quickSort(leftArr), pivotValue, ...quickSort(rightArr)]
}
`4. 如何优化一个快速排序

原地排序

上边这个快排只是让读者找找感觉，我们不能这样写快排，如果每次都开两个数组，会消耗很多内存空间，数据量大时可能造成内存溢出，我们要避免开新的内存空间，即原地完成排序
我们可以用元素交换来取代开新数组，在每一次分区的时候直接在原数组上交换元素，将小于基准数的元素挪到数组开头，以[5,1,4,2,3]为例：
 `

// 我们定义一个pos指针, 标识等待置换的元素的位置, 然后逐一遍历数组元素, 遇到比基准数小的就和arr[pos]交换位置, 然后pos++
function quickSort(arr, left, right) {          //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
    if (left < right) {
        let pos = left - 1                      //pos即“被置换的位置”，第一趟为-1
        for (let i = left; i <= right; i++) {    //循环遍历数组，置换元素
            let pivot = arr[right]              //选取数组最后一位作为基准数，
            if (arr[i] <= pivot) {               //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
                pos++
                let temp = arr[pos]
                arr[pos] = arr[i]
                arr[i] = temp
            }
        }
        //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
        quickSort(arr, left, pos - 1)
        quickSort(arr, pos + 1, right)
    }
    return arr      //数组只包含1或0个元素时(即left>=right)，递归终止
}

//使用
var arr = [5, 1, 4, 2, 3]
var start = 0;
var end = arr.length - 1;
quickSort(arr, start, end)
`三路快排

上边这个快排还谈不上优化，应当说是快排的纠正写法，其实有两个问题我们还能优化一下：

有序数组的情况：如果输入的数组是有序的，而取基准点时也顺序取，就可能导致基准点一侧的子数组一直为空, 使时间复杂度退化到O(n2)
大量重复数据的情况：例如输入的数据是[1,2,2,2,2,3], 无论基准点取1、2还是3, 都会导致基准点两侧数组大小不平衡, 影响快排效率

对于有序数组的情况, 我们可以通过在取基准点的时候随机化来解决，
对于大量重复数据的情况，我们可以使用三路快排的方式来优化，比方说对于上面的[1,2,2,2,2,3]，我们基准点取2，在分区的时候，将数组元素分为小于2|等于2|大于2三个区域，其中等于基准点的部分不再进入下一次排序, 这样就大大提高了快排效率
 `
/**
 * 快速排序是不稳定的排序
 * 原地排序，空间复杂度O（1），比归并排序使用更广泛
 * 平均复杂度基本接近O(nlg(n))
 */

export class QuickSort {
    static sort(array: number[]): void {
        this.sortInternally(array, 0, array.length - 1)
    }
    private static sortInternally(array: number[], p: number, r: number) {
        if (p >= r) return
        // 获取分界点
        const q: number = this.partition(array, p, r)
        this.sortInternally(array, p, q - 1)
        this.sortInternally(array, q + 1, r)
    }
    private static partition(array: number[], p: number, r: number): number {
        /**
         * 参考值pivot，小于pivot的放在左边，大于pivot的在右边，最后再把分界点的值和它做交换
         * 这样返回的index一定是值在中间的下标
         */
        const pivot = array[p]
        // 分界点
        //双指针  index 是左指针
        // 如果i找到一个比pivot更小的就 和index 交换 让index 成为比pivot小的 交换完 index ++ 继续存放下一个比pivot小的值
        // 一直到i==r 的时候 [p...index) 区间内都是比pivot小的值
        //  交换 index-1  p   啊 原来p就是pivot 这里是默认左边界为pivot的
        // 返回p的下标 给上层函数分治就行了
        let index = p + 1
        for (let i = index; i <= r; i++) {
            if (array[i] < pivot) {
                this.swap(array, index, i)
                // 找到了比标记值小的元素就移动分界点
                index++
            }
        }
        this.swap(array, p, index - 1)
        return index - 1
    }

    private static swap(array: number[], p: number, q: number) {
        const temp = array[p]
        array[p] = array[q]
        array[q] = temp
    }
}

const testSort = [1, 3, 2, 3, 10, 9, 7, 6, 0, -12]
QuickSort.sort(testSort)
console.log(testSort)

 ` 手写归并排序
归并排序和快排的思路类似，都是递归分治，区别在于快排边分区边排序，而归并在分区完成后才会排序`

function mergeSort(arr) {
    if (arr.length <= 1) return arr		//数组元素被划分到剩1个时，递归终止
    const midIndex = arr.length / 2 | 0
    const leftArr = arr.slice(0, midIndex)
    const rightArr = arr.slice(midIndex, arr.length)
    return merge(mergeSort(leftArr), mergeSort(rightArr))	//先划分，后合并
}

//合并
function merge(leftArr, rightArr) {
    const result = []
    while (leftArr.length && rightArr.length) {
        leftArr[0] <= rightArr[0] ? result.push(leftArr.shift()) : result.push(rightArr.shift())
    }
    while (leftArr.length) result.push(leftArr.shift())
    while (rightArr.length) result.push(rightArr.shift())
    return result
}
`手写堆排序

堆是一棵特殊的树, 只要满足这棵树是完全二叉树和堆中每一个节点的值都大于或小于其左右孩子节点这两个条件, 那么就是一个堆,
根据堆中每一个节点的值都大于或小于其左右孩子节点, 又分为大根堆和小根堆

堆排序的流程：

初始化大根堆，此时根节点为最大值，将根节点与最后一个节点(数组最后一个元素)交换


重复步骤二，直到堆中元素剩一个，排序完成
以[1,5,4,2,3]为例构筑大根堆：
`
// https://www.jianshu.com/p/90bf2dcd6a7b
// TODO: buhui
// 堆排序
const heapSort = array => {
    // 我们用数组来储存这个大根堆,数组就是堆本身
    // 初始化大顶堆，从第一个非叶子结点开始
    for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
        heapify(array, i, array.length);
    }
    // 排序，每一次 for 循环找出一个当前最大值，数组长度减一
    for (let i = Math.floor(array.length - 1); i > 0; i--) {
        // 根节点与最后一个节点交换
        swap(array, 0, i);
        // 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，所以第三个参数为 i，即比较到最后一个结点前一个即可
        heapify(array, 0, i);
    }
    return array;
};

// 交换两个节点
const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

// 将 i 结点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：
// 假设结点 i 以下的子堆已经是一个大顶堆，heapify 函数实现的
// 功能是实际上是：找到 结点 i 在包括结点 i 的堆中的正确位置。
// 后面将写一个 for 循环，从第一个非叶子结点开始，对每一个非叶子结点
// 都执行 heapify 操作，所以就满足了结点 i 以下的子堆已经是一大顶堆
const heapify = (array, i, length) => {
    let temp = array[i]; // 当前父节点
    // j < length 的目的是对结点 i 以下的结点全部做顺序调整
    for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
        temp = array[i]; // 将 array[i] 取出，整个过程相当于找到 array[i] 应处于的位置
        if (j + 1 < length && array[j] < array[j + 1]) {
            j++; // 找到两个孩子中较大的一个，再与父节点比较
        }
        if (temp < array[j]) {
            swap(array, i, j); // 如果父节点小于子节点:交换；否则跳出
            i = j; // 交换后，temp 的下标变为 j
        } else {
            break;
        }
    }
}

`归并、快排、堆排有何区别



排序
时间复杂度(最好情况)
时间复杂度(最坏情况)
空间复杂度
稳定性




快速排序
O(nlogn)
O(n^2)
O(logn)~O(n)
不稳定


归并排序
O(nlogn)
O(nlogn)
O(n)
稳定


堆排序
O(nlogn)
O(nlogn)
O(1)
不稳定



其实从表格中我们可以看到，就时间复杂度而言，快排并没有很大优势，然而为什么快排会成为最常用的排序手段，
这是因为时间复杂度只能说明随着数据量的增加，算法时间代价增长的趋势，并不直接代表实际执行时间，
实际运行时间还包括了很多常数参数的差别，此外在面对不同类型数据(比如有序数据、大量重复数据)时，表现也不同，
综合来说，快排的时间效率是最高的
在实际运用中, 并不只使用一种排序手段,
例如V8的Array.sort()就采取了当 n<=10 时, 采用插入排序,
                          当 n>10 时，采用三路快排的排序策略
 `

 `设计模式有许多种，这里挑出几个常用的：

设计模式
描述
例子

单例模式
一个类只能构造出唯一实例
Redux/Vuex的store

工厂模式
对创建对象逻辑的封装
jQuery的$(selector)

观察者模式
当一个对象被修改时，会自动通知它的依赖对象
Redux的subscribe、Vue的双向绑定

装饰器模式
对类的包装，动态地拓展类的功能
React高阶组件、ES7 装饰器

适配器模式
兼容新旧接口，对类的包装
封装旧API

代理模式
控制对象的访问
事件代理、ES6的Proxy
 `

 `
 介绍一下单一职责原则和开放封闭原则


单一职责原则：一个类只负责一个功能领域中的相应职责，或者可以定义为：就一个类而言，应该只有一个引起它变化的原因。


开放封闭原则：核心的思想是软件实体（类、模块、函数等）是可扩展的、但不可修改的。也就是说,对扩展是开放的,而对修改是封闭的。
 `

 `单例模式
单例模式即一个类只能构造出唯一实例，单例模式的意义在于共享、唯一，Redux/Vuex中的store、JQ的$或者业务场景中的购物车、登录框都是单例模式的应用

 `
 class SingletonLogin {
    constructor(name, password) {
        this.name = name
        this.password = password
    }
    static getInstance(name, password) {
        //判断对象是否已经被创建,若创建则返回旧对象
        if (!this.instance) this.instance = new SingletonLogin(name, password)
        return this.instance
    }
}

let obj1 = SingletonLogin.getInstance('CXK', '123')
let obj2 = SingletonLogin.getInstance('CXK', '321')

console.log(obj1 === obj2)    // true
console.log(obj1)           // {name:CXK,password:123}
console.log(obj2)           // 输出的依然是{name:CXK,password:123}

`工厂模式
工厂模式即对创建对象逻辑的封装，或者可以简单理解为对new的封装，这种封装就像创建对象的工厂，故名工厂模式。
工厂模式常见于大型项目，比如JQ的$对象，我们创建选择器对象时之所以没有new selector就是因为$()已经是一个工厂方法，
其他例子例如React.createElement()、Vue.component()都是工厂模式的实现。
工厂模式有多种：简单工厂模式、工厂方法模式、抽象工厂模式，这里只以简单工厂模式为例：
 `
class User {
    constructor(name, auth) {
        this.name = name
        this.auth = auth
    }
}

class UserFactory {
    static createUser(name, auth) {
        //工厂内部封装了创建对象的逻辑:
        //权限为admin时,auth=1, 权限为user时, auth为2
        //使用者在外部创建对象时,不需要知道各个权限对应哪个字段, 不需要知道赋权的逻辑，只需要知道创建了一个管理员和用户
        if (auth === 'admin') new User(name, 1)
        if (auth === 'user') new User(name, 2)
    }
}

const admin = UserFactory.createUser('cxk', 'admin');
const user = UserFactory.createUser('cxk', 'user');
`
观察者模式
观察者模式算是前端最常用的设计模式了，观察者模式概念很简单：观察者监听被观察者的变化，被观察者发生改变时，通知所有的观察者。
观察者模式被广泛用于监听事件的实现，有关观察者模式的详细应用，可以看我另一篇讲解Redux实现的文章
https://juejin.im/post/6844904036013965325#heading-3
有些文章也把观察者模式称为发布订阅模式，其实二者是有所区别的，发布订阅相较于观察者模式多一个调度中心。

`
//观察者
class Observer {
    constructor(fn) {
        this.update = fn
    }
}
//被观察者
class Subject {
    constructor() {
        this.observers = []          //观察者队列
    }
    addObserver(observer) {
        this.observers.push(observer)//往观察者队列添加观察者
    }
    notify() {                       //通知所有观察者,实际上是把观察者的update()都执行了一遍
        this.observers.forEach(observer => {
            observer.update()            //依次取出观察者,并执行观察者的update方法
        })
    }
}

var subject = new Subject()       //被观察者
const update = () => { console.log('被观察者发出通知') }  //收到广播时要执行的方法
var ob1 = new Observer(update)    //观察者1
var ob2 = new Observer(update)    //观察者2
subject.addObserver(ob1)          //观察者1订阅subject的通知
subject.addObserver(ob2)          //观察者2订阅subject的通知
subject.notify()                  //发出广播,执行所有观察者的update方法
` 装饰器模式
装饰器模式，可以理解为对类的一个包装，动态地拓展类的功能，ES7的装饰器语法以及React中的高阶组件（HoC）都是这一模式的实现。
react-redux的connect()也运用了装饰器模式，这里以ES7的装饰器为例：`
function info(target) {
    target.prototype.name = '张三'
    target.prototype.age = 10
}

@info
class Man { }

let man = new Man()
man.name // 张三
`适配器模式
适配器模式，将一个接口转换成客户希望的另一个接口，使接口不兼容的那些类可以一起工作。
我们在生活中就常常有使用适配器的场景，例如出境旅游插头插座不匹配，这时我们就需要使用转换插头，也就是适配器来帮我们解决问题。`
class Adaptee {
    test() {
        return '旧接口'
    }
}

class Target {
    constructor() {
        this.adaptee = new Adaptee()
    }
    test() {
        let info = this.adaptee.test()
        return `适配${info}`
    }
}

let target = new Target()
console.log(target.test())
`代理模式
代理模式，为一个对象找一个替代对象，以便对原对象进行访问。
即在访问者与目标对象之间加一层代理，通过代理做授权和控制。
最常见的例子是经纪人代理明星业务，假设你作为一个投资者，想联系明星打广告，
那么你就需要先经过代理经纪人，经纪人对你的资质进行考察，并通知你明星排期，替明星本人过滤不必要的信息。
事件代理、JQuery的$.proxy、ES6的proxy都是这一模式的实现，下面以ES6的proxy为例
 `

const idol = {
    name: '蔡x抻',
    phone: 10086,
    price: 1000000  //报价
}

const agent = new Proxy(idol, {
    get: function (target) {
        //拦截明星电话的请求,只提供经纪人电话
        return '经纪人电话:10010'
    },
    set: function (target, key, value) {
        if (key === 'price') {
            //经纪人过滤资质
            if (value < target.price) throw new Error('报价过低')
            target.price = value
        }
    }
})


agent.phone        //经纪人电话:10010
agent.price = 100  //Uncaught Error: 报价过低


`说说HTML5在标签、属性、存储、API上的新特性

标签：新增语义化标签（aside / figure / section / header / footer / nav等），增加多媒体标签video和audio，使得样式和结构更加分离
属性：增强表单，主要是增强了input的type属性；meta增加charset以设置字符集；script增加async以异步加载脚本
存储：增加localStorage、sessionStorage和indexedDB，引入了application cache对web和应用进行缓存
API：增加拖放API、地理定位、SVG绘图、canvas绘图、Web Worker、WebSocket
`


`doctype的作用是什么？
声明文档类型，告知浏览器用什么文档标准解析这个文档：

怪异模式：浏览器使用自己的模式解析文档，不加doctype时默认为怪异模式
标准模式：浏览器以W3C的标准解析文档
`

`几种前端储存以及它们之间的区别

cookies： HTML5之前本地储存的主要方式，大小只有4k，HTTP请求头会自动带上cookie，兼容性好
localStorage：HTML5新特性，持久性存储，即使页面关闭也不会被清除，以键值对的方式存储，大小为5M
sessionStorage：HTML5新特性，操作及大小同localStorage，和localStorage的区别在于sessionStorage在选项卡(页面)被关闭时即清除，且不同选项卡之间的sessionStorage不互通
IndexedDB： NoSQL型数据库，类比MongoDB，使用键值对进行储存，异步操作数据库，支持事务，储存空间可以在250MB以上，但是IndexedDB受同源策略限制
Web SQL：是在浏览器上模拟的关系型数据库，开发者可以通过SQL语句来操作Web SQL，是HTML5以外一套独立的规范，兼容性差

 `

 `href和src有什么区别
href（hyperReference）即超文本引用：当浏览器遇到href时，会并行的地下载资源，不会阻塞页面解析，例如我们使用<link>引入CSS，浏览器会并行地下载CSS而不阻塞页面解析. 因此我们在引入CSS时建议使用<link>而不是@import
<link href="style.css" rel="stylesheet" />
src（resource）即资源，当浏览器遇到src时，会暂停页面解析，直到该资源下载或执行完毕，这也是script标签之所以放底部的原因
<script src="script.js"></script>
`

`meta有哪些属性，作用是什么
meta标签用于描述网页的元信息，如网站作者、描述、关键词，meta通过name=xxx和content=xxx的形式来定义信息，常用设置如下：

charset：定义HTML文档的字符集

 <meta charset="UTF-8" >
http-equiv：可用于模拟http请求头，可设置过期时间、缓存、刷新

＜meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT"＞
viewport：视口，用于控制页面宽高及缩放比例

<meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1"
>
 `


 `viewport有哪些参数，作用是什么

width/height，宽高，默认宽度980px
initial-scale，初始缩放比例，1~10
maximum-scale/minimum-scale，允许用户缩放的最大/小比例
user-scalable，用户是否可以缩放 (yes/no)
`

`http-equiv 属性的作用和参数

expires，指定过期时间
progma，设置no-cache可以禁止缓存
refresh，定时刷新
set-cookie，可以设置cookie
X-UA-Compatible，使用浏览器版本
apple-mobile-web-app-status-bar-style，针对WebApp全屏模式，隐藏状态栏/设置状态栏颜色
`

`清除浮动的方法

为什么要清除浮动：清除浮动是为了解决子元素浮动而导致父元素高度塌陷的问题


1.添加新元素
<div class="parent">
  <div class="child"></div>
  <!-- 添加一个空元素，利用css提供的clear:both清除浮动 -->
  <div style="clear: both"></div>
</div>
2.使用伪元素
/* 对父元素添加伪元素 */
.parent::after{
  content: "";
  display: block;
  height: 0;
  clear:both;
}
3.触发父元素BFC
.parent {
  overflow: hidden;
  /* float: left; */
  /* position: absolute; */
  /* display: inline-block */
  /* 以上属性均可触发BFC */
}
 `


 `介绍一下flex布局
其实我本来还写了一节水平/垂直居中相关的，不过感觉内容过于基础还占长篇幅，所以删去了，作为一篇总结性的文章，这一小节也不应该从“flex是什么”开始讲，主轴、侧轴这些概念相信用过flex布局都知道，所以我们直接flex的几个属性讲起：

容器属性（使用在flex布局容器上的属性）


justify-content
定义了子元素在主轴(横轴)上的对齐方式

.container {
    justify-content: center | flex-start | flex-end | space-between | space-around;
    /* 主轴对齐方式：居中 | 左对齐(默认值) | 右对齐 | 两端对齐(子元素间边距相等) | 周围对齐(每个子元素两侧margin相等） */
}


align-items
定义了定义项目在交叉轴(竖轴)上对齐方式

.container {
    align-items: center | flex-start | flex-end | baseline | stretch;
    /* 侧轴对齐方式：居中 | 上对齐 | 下对齐 | 项目的第一行文字的基线对齐 | 如果子元素未设置高度，将占满整个容器的高度（默认值） */
}


flex-direction
主轴(横轴)方向

.container {
    flex-direction: row | row-reverse | column | column-reverse;
    /* 主轴方向：水平由左至右排列（默认值） | 水平由右向左 | 垂直由上至下 | 垂直由下至上 */
}


flex-wrap
换行方式

.container {
    flex-wrap: nowrap | wrap | wrap-reverse;
    /* 换行方式：不换行（默认值） | 换行 | 反向换行 */
}


flex-flow
flex-flow属性是flex-direction属性和flex-wrap的简写

.container {
    flex-flow: <flex-direction> || <flex-wrap>;
    /* 默认值：row nowrap */
}


align-content
定义多根轴线的对齐方式

.container {
    align-content: center | flex-start | flex-end | space-between | space-around | stretch;
    /* 默认值：与交叉轴的中点对齐 | 与交叉轴的起点对齐 | 与交叉轴的终点对齐 | 与交叉轴两端对齐 | 每根轴线两侧的间隔都相等 | （默认值）：轴线占满整个交叉轴 */
}



项目属性（使用在容器内子元素上的属性）


flex-grow
定义项目的放大比例，默认为0，即使有剩余空间也不放大。如果所有子元素flex-grow为1，那么将等分剩余空间，如果某个子元素flex-grow为2，那么这个子元素将占据2倍的剩余空间

.item {
  flex-grow: <number>; /* default 0 */
}


flex-shrink
定义项目的缩小比例，默认为1，即如果空间不足，子元素将缩小。如果所有子元素flex-shrink都为1，某个子元素flex-shrink为0，那么该子元素将不缩小

.item {
  flex-shrink: <number>; /* default 1 */
}


flex-basis
定义在分配多余空间之前，项目占据的主轴空间，默认auto，即子元素本来的大小，如果设定为一个固定的值，那么子元素将占据固定空间

.item {
  flex-basis: <length> | auto; /* default auto */
}


flex
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto，即有剩余空间不放大，剩余空间不够将缩小，子元素占据自身大小

.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}

flex有两个快捷值：auto和none，分别代表1 1 auto（有剩余空间则平均分配，空间不够将等比缩小，子元素占据空间等于自身大小）和0 0 auto（有剩余空间也不分配，空间不够也不缩小，子元素占据空间等于自身大小）

order
定义项目的排列顺序。数值越小，排列越靠前，默认为0

.item {
  order: <integer>;
}


align-self
定义单个子元素的排列方式，例如align-items设置了center，使得所有子元素居中对齐，那么可以通过给某个子元素设置align-self来单独设置子元素的排序方式

.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}


参考资料：阮一峰Flex布局
 `

//  CSS中用 opacity、visibility、display 属性将 元素隐藏 的 对比分析
`display: none;
DOM 结构：浏览器不会渲染 display 属性为 none 的元素，不占据空间；
事件监听：无法进行 DOM 事件监听；
性能：动态改变此属性时会引起重排，性能较差；
继承：不会被子元素继承，毕竟子类也不会被渲染；
transition：transition 不支持 display。

visibility: hidden;
DOM 结构：元素被隐藏，但是会被渲染不会消失，占据空间；
事件监听：无法进行 DOM 事件监听；
性 能：动态改变此属性时会引起重绘，性能较高；
继 承：会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏；
transition：transition 不支持 display。

opacity: 0;
DOM 结构：透明度为 100 %，元素隐藏，占据空间；
事件监听：可以进行 DOM 事件监听；
性 能：提升为合成层，不会触发重绘，性能较高；
继 承：会被子元素继承, 且，子元素并不能通过 opacity: 1 来取消隐藏；
transition：transition 不支持 opacity。`
// https://segmentfault.com/a/1190000015116392
`opacity:0 用来设置透明度                       占据空间  子元素继承此属性无法展示                只有这个会触发事件
visibility:hidden 用来设置元素是否可见。          占据空间   子元素不继承 visibility:visible;  可以展示出来
display:none 定义建立布局时元素生成的显示框类型 回流 不占据空间 子元素继承此属性无法展示

是否影响其他元素触发事件
visibility 和 display 属性是不会影响其他元素触发事件的，而 opacity 属性 如果遮挡住其他元素，其他的元素就不会触发事件了。

dispaly 属性会产生回流，而 opacity 和 visibility 属性不会产生回流。

dispaly 和 visibility 属性会产生重绘，而 opacity 属性不一定会产生重绘。
元素提升为合成层后，transform 和 opacity 不会触发 repaint，如果不是合成层，则其依然会触发 repaint。




`
 `什么是BFC
    全称 Block Formatting Context 即块级格式上下文，
简单的说，BFC是页面上的一个隔离的独立容器，不受外界干扰或干扰外界
如何触发:
float不为 none
overflow的值不为 visible
position 为 absolute 或 fixed
display的值为 inline-block 或 table-cell 或 table-caption 或 grid

BFC的渲染规则是什么

BFC是页面上的一个隔离的独立容器，不受外界干扰或干扰外界
计算BFC的高度时，浮动子元素也参与计算（即内部有浮动元素时也不会发生高度塌陷）
BFC的区域不会与float的元素区域重叠
BFC内部的元素会在垂直方向上放置
BFC内部两个相邻元素的margin会发生重叠

BFC的应用场景

清除浮动：BFC内部的浮动元素会参与高度计算，因此可用于清除浮动，防止高度塌陷
避免某元素被浮动元素覆盖：BFC的区域不会与浮动元素的区域重叠
阻止外边距重叠：属于同一个BFC的两个相邻Box的margin会发生折叠，不同BFC不会发生折叠
`

`e.target 事件冒泡或捕获时实际 实际触发的元素  所以可以用来做事件委托
 e.currenttarget  固定为绑定事件的元素`


`从URL输入到页面展现到底发生什么？(从输入URL到页面加载的全过程)
总体来说分为以下几个过程:
查找本地缓存
DNS 解析:将域名解析成 IP 地址
TCP 连接：TCP 三次握手
发送 HTTP 请求
服务器处理请求并返回 HTTP 报文
浏览器解析渲染页面 （可以详细讲一下 dom + cssom = renderTree + layout + painting) (JS引擎解析过程：调用JS引擎执行JS代码（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）)
断开连接：TCP 四次挥手

链接：https://www.nowcoder.com/questionTerminal/887985a22baf44508847c01b0b71e3d0
第一次
第一次握手：建立连接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers）。
第二次
第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；
第三次
第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手
`

// macro - task(宏任务)：script，setTimeout，setInterval
// micro - task(微任务)：Promise，process.nextTick
`事件循环 Eventloop   每次事件循环 包括一次宏任务 一次微任务
1 宏任务即为同步代码  顺序执行 过程中如果有异步代码  按类型入栈（promise MutationObserver 是微任务 其余宏任务）
2 宏任务执行完后 执行栈中的微任务 栈空了以后 完成一次事件循环
3下一次同样以宏任务开始  但是宏任务栈中 的任务要先出栈  然后顺序执行 同步代码 you回到了1 `


`webpack 多入口 配置及代码分割



entry{
    home:'./src/home.js',
    other:'./src/other.js',
}

output{

    filename:'[name].js'
}

plugins{
    new htmlWebpackPlugin({
        fileName:'home.html',
        chunks:['home']
    }),
     new htmlWebpackPlugin({
        fileName:'other.html',
        chunks:['other']
    })
}
`

`
@babel/plugin-transform-runtime

babel 在转译的过程中，对 syntax 的处理可能会使用到 helper 函数，对 api 的处理会引入 polyfill。

默认情况下，babel 在每个需要使用 helper 的地方都会定义一个 helper，导致最终的产物里有大量重复的 helper；引入 polyfill 时会直接修改全局变量及其原型，造成原型污染。

@babel/plugin-transform-runtime 的作用是将 helper 和 polyfill 都改为从一个统一的地方引入，并且



`


`Webpack 如何实现热更新的呢 HMR？
首先是建立起浏览器端和服务器端之间的通信，浏览器会接收服务器端推送的消息，
如果需要热更新，浏览器发起http请求去服务器端获取打包好的资源解析并局部刷新页面。

1 将代码编译时放在内存里 同时修改webpack entry 增加 socket-client webpack-dev-sever
2 watch文件变化 dev-sever 通知浏览器dev-client
3 client将文件信息 传递给 webpack （为了解耦 socket 只处理信息）
4 webpack 收到hash值 验证 并请求模块代码 主要看三个方法：
    监听浏览器client发过来的消息 调用HMR的 check方法 过程中调用 JSONPRunTime的 两个方法

    hotDownloadManifest 方法是调用 AJAX 向服务端请求是否有更新的文件，如果有将发更新的文件列表返回浏览器端，

    hotDownloadUpdateChunk 方法是通过 jsonp 请求最新的模块代码，然后将代码返回给 HMR runtime，HMR runtime 会根据返回的新模块代码做进一步处理，可能是刷新页面，也可能是对模块进行热更新。

5 HMR RunTime 对模块热更新 查找 删除 过期模块 生成新模块 等待下次 __webpack__require__ 调用

6 当用新的模块代码替换老的模块后，但是我们的业务代码并不能知道代码已经发生变化，也就是说，
 在入口文件中调用 HMR的 accept 方法   添加模块更新后的处理函数，及时将 hello 方法的返回值插入到页面中。代码如下：

if(module.hot) {
 module.hot.accept('./hello.js', function() {
  div.innerHTML = hello()
 })
}

这里可以参考 ：Vuex 支持在开发过程中热重载 mutation、module、action 和 getter。
 https://vuex.vuejs.org/zh/guide/hot-reload.html#%E5%8A%A8%E6%80%81%E6%A8%A1%E5%9D%97%E7%83%AD%E9%87%8D%E8%BD%BD

`
`作者：熊杰
链接：https://www.zhihu.com/question/434959110/answer/1629733612

JWT 全称 JSON web token相对于 session 方案， JWT 会生成一个 token 而不是 session_id
 与 session 方案不同的是
 JWT 生成的 token， 不需要在后端存储任何东西
 JWT 的理念是直接将状态放在前端
 至于说在前端用 cookie 保存还是 localStorage 保存还是其它的手段保存都不重要
 JWT 包括三个部分:header, 用于表示该 token 是用算法来编程的
payload， 应用层自己带的数据信息
因为该部分是明文的， 所以不可以带敏感信息
 比如可以带 user_id， 但是不可以带 user 的密码等
signature, 根据 header 和 payload ，而且根据加密算法与密钥生成的签名
 该签名的作用是让整个 token 无法伪造
 简单的说就中
 即使你知道我的 user_id
 你可以修改 payload 的部分将 user_id 修改成我的
 但是你没办法修改 signature 部分
 因为该部分的生成需要一个密钥
 那个密钥在后端， 前端无法拿到
 同时也说明了该密钥的重要性
 如果密钥泄露了
你就可以伪造 token
 此时后端只能重新生成密钥
 该操作的后果就是所有已经签发的 token 都失效
现在来回答问题：这个 token 后端保存在哪里？ 答案是不需要保存
 后端只要校验这个 token 是合法的， 就会信仰这个 token
 就可以将 token 中的信息拿出来使用
 举个例子
 session 方案中， session 中会存储 user_id， 后端在通过 session 服务拿到 user_id 后， 如果想要拿 user 的全量信息， 就会去 user 服务获取
 而 JWT 方案中， 是从 token 中拿到的 user_id, 再去 user 服务去取
 为什么重启服务不会使 token 失效？因为后端不需要存储所谓的 JWT token
 所以后端，包括 JWT 签发鉴权服务， 都是无状态的
JWT 服务只要保证重启的时候， 密钥与上一个密钥是相同的
就能保证 token 能够正常的鉴定
再补充一下， JWT 之所以可以做到这些
 利益于密钥学
简单的说就是， 在现有的技术下， 不管你通过什么手段
 你都没法做到修改信息后， 还能将 signature 对应上
这个技术可以类比纸币
国家通过某种技术制造纸币， 并且相信没有人可以伪造纸币（假币）
所有的商家只要相信拿来纸币的都是可以流通的
 JWT 相对于纸币而言是， 纸币真的存在造假
 需要公安机关打击造假行为
但是 JWT 目前看来， 基本无法造假
`

// 实现 EventEmitter 订阅监听模式
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [callback];
        } else {
            this.events[eventName].push(callback);
        }
    }

    emit(eventName, ...args) {
        this.events[eventName].forEach(fn => fn.apply(this, args));
    }

    once(eventName, callback) {
        const fn = () => {
            callback();
            this.remove(eventName, fn);
        }
        this.on(eventName, fn)
    }

    remove(eventName, callback) {
        this.events[eventName] = this.events[eventName].filter(fn => fn != callback);
    }
}


`   mouseover  和 mouseenter 的区别
      一句话： 鼠标在子元素上时， over 冒泡  enter 不冒泡 再复杂dom结构中性能好
      形象的理解： over 理解为在元素 z轴空间上 只要在桌子上方就判定为在桌子上 在桌子上的 碗 上 也是在桌子上
      enter 理解为 平面xy轴 2d区间 在桌子平面空间内判定为进入   但是到桌子上的碗里就判定为 不在2d空间内
`

`js 严格模式 中的变化
将过失错误转成异常
    第一，严格模式下无法再意外创建全局变量。
            mistypedVaraible = 17; // 因为变量名拼写错误
                        // 这一行代码就会抛出 ReferenceError
    第二, 严格模式会使引起静默失败(silently fail,注:不报错也没有任何效果)的赋值操作抛出异常.
        例如, NaN 是一个不可写的全局变量. 在正常模式下, 给 NaN 赋值不会产生任何作用; 开发者也不会受到任何错误反馈.
        但在严格模式下, 给 NaN 赋值会抛出一个异常.
        任何在正常模式下引起静默失败的赋值操作
        (给不可写属性赋值, 给只读属性(getter-only)赋值, 给不可扩展对象(non-extensible object)的新属性赋值)
        都会抛出异常:
    第三, 在严格模式下, 试图删除不可删除的属性时会抛出异常(之前这种操作不会产生任何效果):
        delete Object.prototype; // 抛出TypeError错误
    第五, 严格模式要求函数的参数名唯一.
    第六, 严格模式禁止八进制数字语法. ECMAScript并不包含八进制语法
        var a = 0o10; // ES6: 八进制
    第七，ECMAScript 6中的严格模式禁止设置primitive值的属性.
        不采用
        严格模式,设置属性将会简单忽略(no-op),采用严格模式,将抛出TypeError错误
简化变量的使用
    第一, 严格模式禁用 with
    第二, 严格模式下的 eval 不再为上层范围(surrounding scope,注:包围eval代码块的范围)引入新变量. 在正常模式下,  代码 eval("var x;") 会给上层函数(surrounding function)或者全局引入一个新的变量 x
    第三, 严格模式禁止删除声明变量
让eval和arguments变的简单
    ..........  文章太长了 想看自己点 链接吧
    https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F%E4%B8%AD%E7%9A%84%E5%8F%98%E5%8C%96



`

`

//  简而言之
    polyfill是全量污染
    runtime + plugin-transform-runtime 可以做到按需引入 polyfill + helper函数 但是实例上的方法([].includes) 无法实现
so: 具体项目还是需要使用 babel-polyfill，只使用 babel-runtime 的话，实例方法不能正常工作（例如 "foobar".includes("foo")）；
    JavaScript 库和工具可以使用 babel-runtime，在实际项目中使用这些库和工具，需要该项目本身提供 polyfill；


    https://juejin.cn/post/6844903869353295879

babel-polyfill
    它会加载整个polyfill，针对编译的代码中新的API进行处理，并且在代码中插入一些帮助函数，比较适合单独运行的项目。

    babel-polyfill解决了Babel不转换新API的问题，但是直接在代码中插入帮助函数，会导致污染了全局环境，
    并且不同的代码文件中包含重复的代码，导致编译后的代码体积变大。
    虽然这对于应用程序或命令行工具来说可能是好事，但如果你的代码打算发布为供其他人使用的库，
    或你无法完全控制代码运行的环境，则会成为问题。

babel-runtime
    一般应用于两种场景：
        开发类库/工具（生成不污染全局空间和内置对象原型的代码）
        借助 @babel/runtime 中帮助函数（helper function）移除冗余工具函数

    Babel为了解决上述问题，提供了单独的包babel-runtime用以提供编译模块的工具函数，
    启用插件babel-plugin-transform-runtime后，Babel就会使用babel-runtime下的工具函数。

    babel-runtime插件能够将这些工具函数的代码转换成require语句，指向为对babel-runtime的引用。
    每当要转译一个api时都要手动加上require('babel-runtime')。
    简单说 babel-runtime 更像是一种按需加载的实现，比如你哪里需要使用 Promise，
    只要在这个文件头部 require Promise from 'babel-runtime/core-js/promise'就行了

    不过如果你许多文件都要使用 Promise，难道每个文件都要 import 一遍不成？

babel-plugin-transform-runtime#
    为了方便使用 babel-runtime，解决手动 require 的苦恼。它会分析我们的 ast 中，是否有引用 babel-rumtime 中的垫片（通过映射关系），如果有，就会在当前模块顶部插入我们需要的垫片。

    transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。

    好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。

    所以 transform-runtime 的方式更适合开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。

⭐比较#
    babel-polyfill与babel-runtime相比虽然有各种缺点，但在某些情况下仍然不能被babel-runtime替代， 例如，

    [1, 2, 3].includes(3)，Object.assign({}, {key: 'value'})，Array，Object以及其他”实例”下es6的方法，babel-runtime是无法支持的， 因为babel-runtime只支持到 static 的方法。

安装
    babel-runtime 和 babel-plugin-transform-runtime#
    在大多数情况下，你应该安装 babel-plugin-transform-runtime 作为开发依赖（使用 --save-dev），并且将 babel-runtime 作为生产依赖（使用 --save）。这个看vue-cli生成的 package.json就能发现。

    因为babel编译es6到es5的过程中，babel-plugin-transform-runtime这个插件会自动polyfill es5不支持的特性，这些polyfill包就是在babel-runtime这个包里（core-js 、regenerator等）


用法#
通过 .babelrc（推荐）



Copy
{
  "plugins": ["transform-runtime"]
}
包含选项:

{
  "plugins": [
    ["transform-runtime", {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
选项#
1.辅助(helpers)

默认值是:true

表示是否开启内联的babel helpers(即babel或者环境本来的存在的垫片或者某些对象方法函数)(clasCallCheck,extends,etc)在调用模块名字(moduleName)时将被替换名字。

2.垫片/polyfill

默认值是:true'

表示是否把内置的东西(Promise, Set, Map, tec)转换成非全局污染垫片。

3.重新生成 / regenerator

默认值是: true

是否开启generator函数转换成使用regenerator runtime来避免污染全局域。

4.模块名字 / moduleName

默认值: babel - runtime

当调用辅助（内置垫片）设置模块（module）名字 / 路径.

    例子：

{
    "moduleName": "flavortown/runtime"
}
import extends from 'flavortown/runtime/helpers/extends';
优点#
不会污染全局变量

多次使用只会打包一次

依赖统一按需引入, 无重复引入, 无多余引入

缺点#
不支持实例化的方法，例Array.includes(x) 就不能转化

如果使用的API用的次数不是很多，那么transform - runtime 引入polyfill的包会比不是transform - runtime 时大

随着应用的增大，相同的 polyfill 每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。

`


`
genetor 生成的是什么
`

// React diff 算法  （讲fiber 就会讲到diff 但是上次面阿里他没有深入问）
`Diff的瓶颈以及React如何应对
由于Diff操作本身也会带来性能损耗，React文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3)，其中n是树中元素的数量。

如果在React中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。

为了降低算法复杂度，React的diff会预设三个限制： (jlh: 只对比同级元素 且 元素类型不同直接产生不同的树 且 （如果是不同元素也想保持稳定）开发者可以传key 标识元素在不同渲染下保持稳定 不会被销毁)

只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。

两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。

开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。考虑如下例子：`


`diff 算法 分别处理 单节点 多节点
单节点diff：  key  类型 是否相同 相同就可以复用
多节点diff:
第一轮遍历步骤如下： (newCHildren 是jsx)
let i = 0，遍历newChildren，将newChildren[i]与oldFiber比较，判断DOM节点是否可复用。
    如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling，可以复用则继续遍历。
如果不可复用，立即跳出整个遍历，第一轮遍历结束。


第一轮遍历：处理更新的节点。
第二轮遍历：处理剩下的不属于更新的节点。
第二轮遍历 时 会有三种情况   新增 删除 位移
newChildren遍历完，oldFiber没遍历完 => 删除
newChildren没遍历完，oldFiber遍历完 => 新增
newChildren没遍历完，oldFiber没遍历完 => 位移


标记移动的节点
参照物是：
最后一个可复用的节点
在oldFiber中的位置索引
（用变量lastPlacedIndex表示）。
abcd  acdb b为参照物  会把 b 移到 最后
Abcd dabc  d 为参照物  会把 abc 移到d后边



`



`computed和watch的区别
computed是计算属性，一般用于计算复杂的逻辑并将结果保存在computed中。
watch是监听某个data的变化，并执行回调函数。
在原理的实现上，vue初始化时会为computed创建一个watcher实例和dep实例，当template引用到该计算属性时会触发该计算属性的依赖收集以及计算该计算属性的结果。在计算结果的过程中computed作为active watcher又会被其依赖的data属性所收集。当data更新时，会触发其收集的computed watcher重新计算，当计算结果发生改变时才会触发computed收集的渲染watcher重新渲染。
watch内部会调用$watch方法，同样创建了一个watcher，并通过直接访问监听的data的方式触发data的依赖收集，因此data的改变会执行对应的回调。
`

`、Vue nextTick、事件循环］
　　nextTick的由来：
　　　　由于VUE的数据驱动视图更新，是异步的，即修改数据的当下，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
　　nextTick的触发时机：
　　　　在同一事件循环中的数据变化后，DOM完成更新，立即执行nextTick(callback)内的回调。
　　应用场景：
　　　　需要在视图更新之后，基于新的视图进行操作。
　　以上出现了事件循环的概念，其涉及到JS的运行机制，包括主线程的执行栈、异步队列、异步API、事件循环的协作，此处不展开之后再总结。
大致理解：主线程完成同步环境执行，查询任务队列，提取队首的任务，放入主线程中执行；执行完毕，再重复该操作，该过程称为事件循环。而主线程的每次读取任务队列操作，是一个事件循环的开始。异步callback不可能处在同一事件循环中。
　　简单总结事件循环：
　　　　同步代码执行 -> 查找异步队列，推入执行栈，执行callback1[事件循环1] ->查找异步队列，推入执行栈，执行callback2[事件循环2]...
　　即每个异步callback，最终都会形成自己独立的一个事件循环。
　　结合nextTick的由来，可以推出每个事件循环中，nextTick触发的时机：
　　　　同一事件循环中的代码执行完毕 -> DOM 更新 -> nextTick callback触发
 　　tips：本文的任务队列、消息队列、异步队列指同一个东西，均指macrotask queue。
　　　　   事件循环详解：http://www.cnblogs.com/hity-tt/p/6733062.html

vue的 nexttick 怎么实现的

vue为了 性能 比如 for 循环里 一直改变100次数据  不会让vue 改变100次dom ；而是将一次事件循环中 所有的数据改动统一放到一个时间点，这样就可以减少dom更新的次数。这个时间点就是 一次事件循环的最后 微任务
原理就是使用宏任务或微任务来完成事件调用的机制，让自己的回调事件在一个eventloop的最后执行。
宏任务或微任务根据浏览器情况采取不同的api，常见的 macro task 有 setTimeout、MessageChannel、postMessage、setImmediate；常见的 micro task 有 MutationObsever 和 Promise.then。你去看看源码就是在判断到底用哪个api。
在通俗一点 ，你可以吧nexttick想象成为setTimeout 你就是要把这个事件放到本次事件的循环末尾调用

在vue2.5的源码中，macrotask降级的方案依次是：setImmediate、MessageChannel、setTimeout.

总结
    以上就是vue的nextTick方法的实现原理了，总结一下就是：
            vue用异步队列的方式来控制DOM更新和nextTick回调先后执行
            microtask因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
            因为兼容性问题，vue不得不做了microtask向macrotask的降级方案
`
// 小程序的双线程架构 及为什么使用
// https://juejin.cn/post/6896370758407159821#heading-13
// 为什么要这样子设计呢？
// 为了管控和安全，微信小程序阻止开发者使用一些浏览器提供的，
// 诸如跳转页面、操作 DOM、动态执行脚本的开放性接口。
// 将逻辑层与视图层进行分离，视图层和逻辑层之间只有数据的通信，
// 可以防止开发者随意操作界面，更好的保证了用户数据安全。
`1. 双线程模型

小程序的渲染层和逻辑层分别由2个线程管理：

渲染层： 界面渲染相关的任务全都在WebView里执行。一个小程序存在多个界面，所以渲染层存在多个WebView线程。
逻辑层：采用JsCore线程运行JS脚本。

视图层和逻辑层通过系统层的WeixinJsBridge进行通信：逻辑层把数据变化通知到视图层，触发视图层页面更新，视图层把触发的事件通知到逻辑层进行业务处理。
页面渲染的具体流程是:
在渲染层，宿主环境会把WXML转化成对应的JS对象，
在逻辑层发生数据变更的时候，我们需要通过宿主环境提供的setData方法把数据从逻辑层传递到渲染层，
再经过对比前后差异，把差异应用在原来的DOM树上，渲染出正确的UI界面。

4. 运行机制
1.启动

热启动：假如用户已经打开某小程序，然后在一定时间内再次打开小程序，此时无需重新启动，只需将后台小程序切换到前台，这个过程就是热启动；
冷启动：用户首次打开或小程序被微信主动销毁后再次打开的情况，此时小程序需要重新加载启动，即冷启动。

2.销毁
只有当小程序进入后台一定时间（不知道是多久），或者系统资源占用过高，才会被真正的销毁。
5. 更新机制
开发者在后台发布新版本之后，无法立刻影响到所有现网用户，但最差情况下，也在发布之后24小时之内下发新版本信息到用户。
小程序每次冷启动时，都会检查是否有更新版本，如果发现有新版本，将会异步下载最新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上。
所以如果想让用户使用最新版本的小程序，可以利用wx.getUpateManager做个检查更新的功能：
checkNewVersion() {
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(res => {
    console.log('hasUpdate', res.hasUpadate) // 请求完新版本信息的回调
    if (res.hasUpdate) {
      updateManager.onUpdateReady(() => {
        this.setData({
          hasNewVersion: true
        })
      })
    }
  })
}



 小程序为什么使用双线程
小程序的渲染层和逻辑层分别由两个线程管理：
渲染层的界面使用WebView进行渲染;
逻辑层采用JSCore运行JavaScript代码。
一个小程序存在多个界面，所以渲染层存在多个WebView。
这两个线程间的通信经由小程序Native侧中转，逻辑层发送网络请求也经由Native侧转发。



程序架构设计时，要求渲染快，加载快，渲染页面的技术主要分为三种：

纯客户端原生技术渲染（纯客户端技术需要与微信代码一起编包，跟随微信发布版本，这样的开发节奏不好，较难控制）；
纯web技术渲染（纯web技术，那么一些复杂交互页面可能面临一些性能问题，因为Web技术中，UI和JS的脚本在单线程中，这样容易导致逻辑任务抢占UI渲染资源。）
介于客户端技术和Web技术之间（Hybrid技术）。

最终选取的是类似微信JSSDK之后这样的HyBrid技术，页面用Web技术渲染，辅之以大量的接口提供丰富的客户端原生能力。同时，每个小程序的页面都是使用不同的WebView渲染。
如果开发者可以直接通过JS操作界面的DOM树，那么一些敏感数据就毫无安全性可言，
故微信提供了一个沙箱的环境来运行开发者的JS代码，这个环境不能有任何的浏览器相关的接口，
只能通过JS解释执行环境，类似于HTML5的ServiceWorker启动另一个线程来执行JS.
但由于小程序是多WebView的架构，所以每一个页面都是不同的WebView渲染显示，
所以单独创建了一个线程去执行JS，也就是逻辑层，而界面渲染的任务都在WebView线程里执行（渲染层）。
即双线程模型，将逻辑层与视图层进行分离，视图层和逻辑层之间只有数据的通信，
可以防止开发者随意操作界面，更好的保证用户的数据安全。

`
// react diff 算法
// vue diff 算法
`1. 当数据发生变化时，vue是怎么更新节点的？
要知道渲染真实DOM的开销是很大的，比如有时候我们修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排，有没有可能我们只更新我们修改的那一小块dom而不要更新整个dom呢？diff算法能够帮助我们。
我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode。
diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁。

当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图。

具体的diff算法 和react 差不多 详细的可以看这边文章
https://juejin.cn/post/6844903607913938951
`

// webpack 优化
`webpack 打包速度 ： （缓存 多线程 优化resolve include esbuild exteranls noparse  IgnorePlugin：忽略moment本地语言包）
版本5  cache:{type:'filesyetem'} 使用磁盘缓存 提高二次构建性能
多线程 thread-loader
优化resolve(exeteions 只写需要的后缀名 modules写明src 如果没有npmlink 就symlinks: false,)
减少loader plugin（include: path.resolve('src'),
esbuild-loader : 替代babel 速度更快
选择合适的sourceMap： eval-cheap-module-source-map
noParse 第三方模块没有 AMD/CommonJS 规范版本如jquery 只引用不解析 || externals 不解析 library 文件
使用 IgnorePlugin 忽略第三方包指定目录，例如 moment 的本地语言包     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)


webpack 减小打包体积 (压缩 分离 摇树 静态资源上cdn)
代码压缩 TerserWebpackPlugin 压缩js  CssMinimizerWebpackPlugin 压缩 css
代码分离： splitChunks 可以根据配置 超过2次引用 或者超过30kb就分离成单独的文件  MiniCssExtractPlugin 分离css
treeShaking  根据esmodule 的export import静态分析 去除没有被引用的代码  "sideEffects": ["./src/some-side-effectful-file.js"]               purgecss-webpack-plugin 删除不用的css
静态资源使用cdn

webpack 加快加载速度 （按需加载 浏览器缓存 静态资源cdn ）
按需加载 import()语法
利用浏览器缓存：output:{filename: '[hash].js'} 通过配置 contenthash/hash，浏览器缓存了未改动的文件，仅重新加载有改动的文件 。
静态资源全部上传cdn output: {
    publicPath: ctx.isEnvProduction ? 'https://xxx.com' : '', // CDN 域名
  },`

//   CDN原理
`正常请求  浏览器去DNS解析域名 域名解析到IP地址 再请求ip地址 发送请求
CDN请求  浏览器不去DNS解析域名 只请求CDN域名 发送请求 CDN 去负载均衡服务器获取距离最近的IP地址 发送请求
（GSLB 负责均衡服务器 的主要功能是根据本地 DNS 的 IP 地址判断用户的位置，筛选出距离用户较近的本地负载均衡系统SLB）
本地 DNS 将 SLB 的 IP 地址发回给浏览器，浏览器向 SLB 发出请求。
SLB 根据浏览器请求的资源和地址，选出最优的缓存服务器发回给浏览器。
浏览器再根据 SLB 发回的地址重定向到缓存服务器。
如果缓存服务器有浏览器需要的资源，就将资源发回给浏览器。如果没有，就向源服务器请求资源，再发给浏览器并缓存在本地。
简单思路： cdn=>gslb=>dns=>ip=>server=>cache=>browser

`

// web worker有什么用
`这个worker是独立于web主线程的，在后台运行的线程。

web worker的优点就是可以将工作交给独立的其他线程去做，这样就不会阻塞主线程。

worker有一个构造函数如下：

Worker("path/to/worker/script")

我们传入要执行脚本的路径，即可创建worker。
Workers中也可以创建新的Workers,前提是这些worker都是同一个origin。

除此之外，worker可以监听onmessage和onmessageerror两个事件。

提供了两个方法：postMessage和terminate。
worker和主线程都可以通过postMessage来给对方发送消息，也可以用onmessage来接收对方发送的消息。

还可以添加和移除EventListener。
`

const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

if (window.Worker) {
	const myWorker = new Worker("worker.js");

	first.onchange = function() {
	  myWorker.postMessage([first.value, second.value]);
	  console.log('Message posted to worker');
	}

	second.onchange = function() {
	  myWorker.postMessage([first.value, second.value]);
	  console.log('Message posted to worker');
	}

	myWorker.onmessage = function(e) {
		result.textContent = e.data;
		console.log('Message received from worker');
	}
} else {
	console.log('Your browser doesn\'t support web workers.')
}
// 上面的例子创建了一个woker，并向worker post了一个消息。

// 再看一下worker.js的内容是怎么样的：

onmessage = function(e) {
  console.log('Worker: Message received from main script');
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two numbers');
  } else {
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  }
}

// 如果想要立马结束一个worker，我们可以使用terminate：

myWorker.terminate();
// 要想处理worker的异常，可以使用onerror来处理异常。

// 如果worker的script比较复杂，需要用到其他的script文件，我们可以使用importScripts来导入其他的脚本：

importScripts();                         /* imports nothing */
importScripts('foo.js');                 /* imports just "foo.js" */
importScripts('foo.js', 'bar.js');       /* imports two scripts */
importScripts('//example.com/hello.js'); /* You can import scripts from other origins */


`Web Workers根据工作环境的不同，可以分为DedicatedWorker和SharedWorker两种。

DedicatedWorker的Worker只能从创建该Woker的脚本中访问，而SharedWorker则可以被多个脚本所访问。
上面的例子中我们创建的worker就是DedicatedWorker。
`
// 怎么创建sharedWorker呢 ?
var myWorker = new SharedWorker('worker.js');
`我们知道worker和main thread之间是通过postMessage和onMessage进行交互的。这里面涉及到了数据传输的问题。

实际上数据在worker和main thread之间是以拷贝的方式并且是以序列化的形式进行传输的。 `

`场景：  加密  预取数据（可以xhr） 预渲染（复杂canvas 光影反射 材料等）

复杂数据的处理（检索排序过滤分析）

高频的用户交互：

高频的用户交互适用于根据用户的输入习惯、历史记录以及缓存等信息来协助用户完成输入的纠错、校正功能等类似场景，用户频繁输入的响应处理同样可以考虑放在web worker中执行。

web worker的本质是支持我们把数据刷新与页面渲染两个动作拆开执行（不使用web worker的话这两个动作在主线程中是线性执行的）。
`

// js为什么要设计成单线程？
// 这主要和js的用途有关，js是作为浏览器的脚本语言，主要是实现用户与浏览器的交互，以及操作dom；
// 这决定了它只能是单线程，否则会带来很复杂的同步问题。
// 举个例子：如果js被设计了多线程，如果有一个线程要修改一个dom元素，另一个线程要删除这个dom元素，
// 此时浏览器就会一脸茫然，不知所措。
// 所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变
// 为了提高运行效率 js 分为异步 同步任务 这个语言就是异步单线程的
// 为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

// vite 原理  见 ./vite.md 或者看这篇文章 讲的很容易懂
// https://juejin.cn/post/6844904146915573773
`

Vite，一个基于浏览器原生ES模块的开发服务器。
利用浏览器去解析模块，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。
同时另有有Vue文件支持，还搞定定了热更新，而且热更新的速度不会随着模块增加而变慢。

Vite的特点
    闪电般快速的冷服务器启动-闪电般的冷启动速度
    即时热模块更换（HMR）-即时热模块更换（热更新）
    真正的按需编译-真正的按需编译
为了实现上述特点，Vite要求项目完全由ES模块模块组成，common.js模块不能直接在Vite上使用。
因此不能直接在生产环境中使用。
生成环境在打包上依旧还是使用rollup等传统打包工具。
Vite 可能更像是替代了 webpack-dev-server 的一个东西。

请求拦截原理
当声明一个 script 标签类型为 module 时，浏览器就会像服务器发起一个GET
Vite 通过劫持浏览器的这些请求，并在后端进行相应的处理，将项目中使用的文件通过简单的分解与整合，然后以ES模块格式再返回给浏览器。

热更新
Hmr module replace
1、server 监听文件修改, 向client推送socket消息

2、client接收到socket消息后进行 fetchUpdate

3、fetchUpdate进行依赖收集并重新向前端发起请求

4、浏览器元数据挂载 import.meta.hot 并执行



`

// requestAnimationFrame 和 requestIdleCallback 区别
`
window.requestAnimationFrame()
告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用 window.requestAnimationFrame()

当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。为了提高性能和电池寿命，因此在大多数浏览器里，当 requestAnimationFrame() 运行在后台标签页或者隐藏的 <iframe> 里时， requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

回调函数会被传入 DOMHighResTimeStamp参数， DOMHighResTimeStamp指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。该时间戳是一个十进制数，单位毫秒，最小精度为1ms(1000μs)。

。需要注意的是这个方法虽然能够 保证回调函数在每一帧内只渲染一次 ，但是 如果这一帧有太多任务执行，还是会造成卡顿的；因此它只能保证重新渲染的时间间隔最短是屏幕的刷新时间。

requestIdleCallback
是浏览器每一帧 执行完 用户输入 js 渲染 rAF layout painting 之后如果有空余时间 才会执行 优先级较低
`

// vue.esm.js
`common和esm分别是2种现代模块化规范CommonJS和EcmaScript Module的缩写。
现在主流的webpack2采用esm，也就是es6及以上的模块化编程，说白了就是

    import ... from ...

vue.runtime.js则是运行时的意思，纯粹全是javascript，适用于生产环境，需要经过预编译。
官方说法是用来创建 Vue 实例，渲染并处理 virtual DOM 等行为的代码。基本上就是除去编译器的其他一切。

vue.esm.js，预编译 + 运行时，也就是模板字符串和现在最常用的单文件组件.vue文件，
需要经过它预编译转化成纯javascrit，然后再运行，适用于开发环境。
官方说法叫 用来将模板字符串编译成为 JavaScript 渲染函数的代码。

vue.js则是直接用在 < script > 标签中的。
----
vue.js ： vue.js则是直接用在<script>标签中的，完整版本，直接就可以通过script引用。
vue.common.js :预编译调试时，CommonJS规范的格式，可以使用require("")引用的NODEJS格式。
vue.esm.js：预编译调试时， EcmaScript Module（ES MODULE)，支持import from 最新标准的。 `


// 移动端适配方案
// rem 就是为了模拟 vw vh 把屏幕分成100份 看不动了 回家再看吧



// 划重点：3件事

// 通过 watcher.evaluate() 将自身实例赋值给 Dep.target
// 调用 dep.depend() 将dep实例将 watcher 实例 push 到 dep.subs中
// 通过数据劫持，在调用被劫持的对象的 set 方法时，调用 dep.subs 中所有的 watcher.update()

// // 从此。双向绑定完成。
// Vuex仅仅是Vue的一个插件。Vuex只能使用在vue上，因为其高度依赖于Vue的双向绑定和插件系统。
// Vuex的注入代码比较简单，调用了一下applyMixin方法，现在的版本其实就是调用了Vue.mixin，
// 在所有组件的 beforeCreate生命周期注入了设置 this.$store这样一个对象
// Vuex的双向绑定通过调用 new Vue实现，然后通过 Vue.mixin 注入到Vue组件的生命周期中，
// 再通过劫持state.get将数据放入组件中


// HTTP协议的状态
// HTTP是一种无状态协议，即服务器不保留与客户交易时的任何状态。
// 上一次的请求对这次的请求没有任何影响，服务端也不会对客户端上一次的请求进行任何记录处理。
// 保持HTTP状态的技术就应运而生了，一个是 Cookie，而另一个则是 Session。
// cookie 机制采用的是在客户端保持状态的方案。
// Cookie 是服务器生成的，但是发送给客户端，并且由客户端来保存。每次请求加上 Cookie就行
// Session 保存在服务器上。
// Session 需要使用Cookie 作为识别标志。HTTP协议是无状态的，
// Session 不能依据HTTP连接来判断是否为同一客户，
// 因此服务器向客户端浏览器发送一个名为 JSESSIONID 的 Cookie，
// 它的值为该 Session 的 id（即放在HTTP响应报文头部信息里的Set - Cookie）。
// Session依据该 Cookie 来识别是否为同一用户。

// boss  Vue this.$message.success('操作成功'); 类似这种组件的调用 具体的技术细节 是什么
// vue.use()  plugin install 方法里是怎么 把$message放到vue实例上的
function range(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
range(1, 10)
 