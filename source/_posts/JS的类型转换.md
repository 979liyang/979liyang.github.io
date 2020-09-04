title: JS的类型转换
author: John Doe
date: 2018-01-24 15:29:00
tags:
---
首先,在 JS 中类型转换只有三种情况，分别是：
- 转换为布尔值
- 转换为数字
- 转换为字符串

*** 类型转换表 : ***
![upload successful](/images/type.png)


*** 转成Boolean : ***

- 在条件判断时，除了undefined， null， false， NaN， ''， 0， -0， 其他所有值都转为 true，包括所有对象。

*** 对象转原始类型 : ***

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：

-	如果已经是原始类型了，那就不需要转换了
-	调用 x.valueOf()，如果转换为基础类型，就返回转换的值
-	调用 x.toString()，如果转换为基础类型，就返回转换的值
-	如果都没有返回原始类型，就会报错

> 当然你也可以重写 Symbol.toPrimitive ，该方法在转原始类型时调用优先级最高。

```js

let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
console.log(1 + a) // => 3

```
