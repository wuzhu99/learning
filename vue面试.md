<!--
 * @Author: wuz
 * @Date: 2021-08-06 00:45:48
 * @LastEditTime: 2021-09-11 13:00:58
 * @FilePath: /learning/vue面试.md
-->
## 基础
- 差值表达式 只能是表达是不能是js语句（如if判断等）
- v-html（会有xss风险 会覆盖子元素）
- conputed（有缓存、v-model的时候必须要有get、set不然会报错）
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
- $nextTick
- slot插槽
- 动态、异步组件
- keepAlive
- mixin


## 原理

- 如何理解mvvm、setState 数据驱动视图
  - asp jsp php 就有组件化 mode.js也有组件化 传统组件只是静态渲染，但是更新还要依赖于操作dom
- 响应式原理
  - object.defindpropty(obj,'label',{})
  - 深度监听 需要递归操作 一次性计算量大
  - 新增属性监听不到 data.a = x  ==》退回vue.set
  - 删除属性监听不到 delete data.a  ==》退回vue.delete
- vue监听数组的变化
  - 