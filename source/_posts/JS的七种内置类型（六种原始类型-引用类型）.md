title: JS的七种内置类型（六种原始类型+引用类型）
author: John Doe
date: 2018-01-26 12:02:17
tags:
---
#### 六种原始类型（Primitive）

JS1997年标准化后，定义了六种内置类型，包含五种原始(Primitive)类型以及一种引用类型，ES6又新增了一种原始类型symbol

* number
* string
* null
* undefined
* boolean
* symbol （Symbol是ES6新增的一种数据类型，表示独一无二的值，Symbol最大的用途是用来定义对象的唯一属性名。）

##### 注意

1. 原始类型存储的都是值，是没有函数可以调用的。`undefined.toString() 会报错`
2. number精度问题 `0.1 + 0.2 !== 0.3 `
3. typeof null === 'object'  `000开头代表对象， null表示为全零`
4. boolean `常用的运算符 && || ! ` `[]为true` 以下值为false：
     - false
     - undefined
     - null
     - 0
     - -0
     - NaN
     - ""

---

#### 对象类型（Object）

在JS中，除了原始类型，其它的都是对象类型了，对象类型和原始类型不同，原始类型存储的是值，对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。

```js
const a = [];
const b = a;

console.log("a:",a, "b:",b)   //输出： a: [ ] b: [ ]
b.push(1);
console.log("a:",a, "b:",b)   //输出： a: [1] b: [1]

/*
  1. 对于常量 a 来说，假设内存地址为 #001，那么在地址 #001 的位置存放
  了值 []，常量 a 存放了地址 #001，再看以下代码
  
  2. 当我们将变量赋值给另外一个变量时，复制的是原本变量的地址，也就是说当
  前变量 b 存放的地址也是 #001，当我们进行数据修改的时候，就会修改存放在
  地址 #001 上的值，也就导致了两个变量的值都发生了改变。
*/

```

---

#### 面试题

- 问题一：对象类型和原始类型的不同之处？
- 问题二：函数参数是对象会发生什么问题？
	- 首先，函数传参是传递对象指针的副本
    - 函数内部可以修改参数的属性 `person.age = 26`
    - 函数内部直接修改参数不能更改传入值本身 `person = {} 不能更改传递的参数本身p1`

```js
function test(person) {
  person.age = 26
  person = {
    name: 'two',
    age: 30
  }

  return person
}
const p1 = {
  name: 'one',
  age: 25
}
const p2 = test(p1)
console.log(p1) // ->  { name: 'one', age: 26 }
console.log(p2) // ->  { name: 'two', age: 30 }
```