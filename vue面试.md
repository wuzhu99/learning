<!--
 * @Author: wuz
 * @Date: 2021-08-06 00:45:48
 * @LastEditTime: 2021-09-15 02:06:08
 * @FilePath: /learning/vue面试.md
-->
## 基础

- 差值表达式 只能是表达是不能是js语句（如if判断等）
- v-html（会有xss风险 会覆盖子元素）
- computed（有缓存、v-model的时候必须要有get、set不然会报错）
- watch （浅度监听 监听对象或者是数组的时候拿不到oldvalue-存的是地址）
- v-show （频繁切换 display none 渲染dom）
- v-if （切换不频繁 没有dom节点）
- v-for
  - 一开始只支持数组 后面2.x后也可以以遍历对象
  - key很重要 尽量不使用如index、random
  - 不能和v-if一起使用
  - v-for比v-if的渲染优先级高
- 事件
  - event参数-event对象是原生的、事件被挂载到当前元素上、自定义参数 （a,b,c,...,event）
  - 事件修饰符、按键修饰符
  - 事件绑定
- **表单**
  - v-model 修饰符 .lazy防抖

## 组件使用

- props父->子 $emit子->父
- 组件间通讯 - 自定义事件 兄弟组件之间通讯 引入一个vue实例 event.$emit('xx',参数)发 event.$on('xx',函数)绑定 $off('xx',函数)销毁
- 生命周期
  - 单个组件
    - 挂载 created(vue初始化实例) mounted(页面已经渲染完毕)
    - 更新
    - 销毁 beforeDestory(解除监听、销毁子组件)
  - 父子组件
    - 加载渲染过程：父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
    - 子组件更新过程：父beforeUpdate->子beforeUpdate->子updated->父updated
    - 父组件更新过程：父beforeUpdate->父updated
    - 销毁过程：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## vue高级特性

- 自定义v-model
  - 使用:value、上面的event事件和model.event要对应起来
- $nextTick会在dom渲染之后被触发，以获取最新的dom
- slot插槽
  - 作用域插槽
    - v-slot=xxx :xxx(xxx.xxx)
  - 具名插槽
    - v-slot:xxx  name='xxx'
- 动态、异步组件
  - 动态组件 :is
  - 异步：import
- keepAlive
- mixin
  - 多个组件有相同的逻辑抽离出来
  - 问题
    - 变量来源不明确 不利于阅读
    - 多mixins可能造成命名冲突
    - mixins和组件会出现多对多的关系 复杂度高
  - composition Api
- vuex
- vue-router
  - 动态路由 /:id $router.params.id
  - 懒加载 import

## 原理

- 如何理解mvvm、setState 数据驱动视图
  - asp jsp php 就有组件化 node.js也有组件化 传统组件只是静态渲染，但是更新还要依赖于操作dom
- 响应式原理
  - object.defindpropty(obj,'label',{})
  - 深度监听 需要递归操作 一次性计算量大 监听数组
  - 新增属性监听不到 data.a = x  ==》退回vue.$set
  - 删除属性监听不到 delete data.a  ==》退回vue.$delete
  - 无法监听数组 需要特殊处理 vue监听数组的变化 重写原型
- 虚拟dom和diff
  - vdom **用js模拟dom结构**，计算出最小的变更操作dom 数据驱动试图 控制dom操作
  - diff（对比）算法 key
    - 只比较同一层级 不跨级比较
    - tag不同直接删掉重建 不再深度比较
    - tag和key都相同则认为是相同节点 不再深度比较
    - patchnode key addVnode removeVnodes updatechild（key）
  - dom操作非常耗费性能 jq是可以自行操控dom的操作时机
- 模板编译
  - 指令、插值、js表达式，能判断循环、判断（html是标签语言，只有js可以循环、判断，所以模板一定是转换成js代码，即模板编译）
  - 组件渲染和更新过程来考察**模板编译** -- render函数 -- 返回vnode -- 基于vnode在执行render和diff -- 渲染和更新
  - js **with语法** （找不到obj的属性会报错，打破了作用域规则 易读性变差）
  - vue-template-compiler

    ```javascript
      const obj = {a:1,b:2}
      with(obj){
        console.log(a)
      }
    ```

  - v-if编译的时候返回的是三元表达式
  - v-model 双向绑定原理
  - webpack vue-loader 在开发环境下编译
  - render 有些复杂情况中不能用template vue组件可以用render代替template
  - react一只都是render
  - 一个组件渲染到页面，修改data里面的数据更新视图
- 组件渲染过程
  - 初次渲染
    - 解析模板为render函数（开发环境下vue-loader完成）
    - 触发响应式，geter（收集依赖）/setter（修改data，观察是否有watch，有的话出发render函数）
    - 执行render函数生成vnode，patch（elm，vnode） 执行render函数会触发getter
  - 更新过程
    - 修改data触发setter（此前在getter中已经被监听）
    - 重新执行render函数生成newVnode
    - patch（vnode，newVnode）
  - 异步渲染
    - 渲染是异步的，$nexkTick带渲染完再回调，页面渲染会将data的修改做整合，多次data修改也只会渲染一次
    - 汇总data的修改，一次性更新视图
    - 减少DOM操作次数，提高性能
- SPA前端路由原理
  - mode：hash/history(需要服务端配置)
    - hash变化会触发网页跳转，不会刷新页面，hash不会提交到server端 onhaschange
    - history用url规范的路由
      - pushState()跳转的时候不刷新页面
      - onpopstate()监听浏览器的前进后退
      - 后端设置返回主文件html就可以

fbeforcreated  - fcreated - fbeformounted - zbeforcreated  - zcreated  - zbeformounted - zmounted - fmounted

fbeforupdate - zbeforupdate - zupdated - fupdated

fbefordestory - zbefordestory - zdestored - fdestored

vue3 reflect
