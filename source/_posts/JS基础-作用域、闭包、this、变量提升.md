title: JS基础-作用域、闭包、this、变量提升
author: liyang
date: 2018-03-04 20:39:57
tags:
---
#### 下面打印的结果是什么？ 为什么？

- 第1题

```js
console.log(a);
var a = 123; 
```
{% spoiler "答案" %}
  变量提升
  console.log(a);  //undefined
  因为变量a的声明被提到了作用域顶端。上面代码编译后应该是下面这个样子
  ```js
   var a;
   console.log(a)
   a = 123
   //所以输出内容为 undeifend
  ```
{% endspoiler %}

- 第2题

```js
console.log("a: ",v1);
var v1 = 100;
function foo() {
    console.log("b: ",v1);
    var v1 = 200;
    console.log("c: ",v1);
}
foo();
console.log("d: ",v1);

```

{% spoiler "答案" %}
a:  undefined
b:  undefined
c:  200
d:  100
词法分析如下：
```js
function foo() {
	var v1;
    console.log("b: ",v1); // undefined
    v1 = 200;
    console.log("c: ",v1); // 200
}
var v1;
console.log("a: ",v1); // undefined
v1 = 100;
foo();
console.log("d: ",v1); // 100
```
{% endspoiler %}

- 第3题

```js
bar()

var bar = function() {
  console.log(1);
}
```
{% spoiler "答案" %}
// 报错：TypeError: bar is not a function
{% endspoiler %}

- 第4题

```js
bar()

function bar() {
  console.log(1);
}
```
{% spoiler "答案" %}
输出： 1
```js 
// 词法分析
function bar() {
  console.log(1);
}
bar()
```
{% endspoiler %}

- 第5题 

```js
var a = 1;
if (!(b in window)) {
    var b = 2;
    a += 1;
} else {
    a += 2;
}
console.log(a);
console.log(b);
```

{% spoiler "答案" %}
  变量提升
  console.log(a); // ->  3
  console.log(b); // ->  undefined
{% endspoiler %}

- 第6题 

```js
var m = 1;
function log() {
    var m = 2;
    return function () {
        m += 1;
    }
}

var _log = log();
_log();
console.log(m);
```
{% spoiler "答案" %}
作用域、闭包
console.log(m); // -> 1
{% endspoiler %}

- 第7题

```js
for (var i = 0; i < 5; i++) {
    (function () {
        setTimeout(function () {
            console.log('循环 i：', i);
        }, 1000);
    })(i)
}

console.log('外层 i：', i);
```

{% spoiler "答案" %}
```
  作用域
  console.log('外层 i：', i); // -> 外层 i： 5
  一秒后执行：
  console.log('循环 i：', i); // -> 循环 i： 5  (打印55555)

  // 传入变量j
  for (var i = 0; i < 5; i++) {
      (function (j) {
          setTimeout(function () {
              console.log('循环 i：', i, j); // 50 51 52 53 54
          }, 1000);
      })(i)
  }
```
{% endspoiler %}

- 第8题

```js
function fun() { };
console.log(typeof fun);
console.log(fun instanceof Function);
console.log(fun instanceof Object);
```
{% spoiler "答案" %}
console.log(typeof fun); // -> function
console.log(fun instanceof Function); // -> true
console.log(fun instanceof Object); // -> true
{% endspoiler %}

- 第9题

```js
var a = 1;
var obj = {
    a: 2,
    getA: function () {
        return this.a;
    }
}
console.log(obj.getA()); 
console.log(obj.getA.call());
console.log(obj.getA.call({ a: 10 }));
```
{% spoiler "答案" %}
console.log(obj.getA()); // => 2
console.log(obj.getA.call()); // => 1
console.log(obj.getA.call({ a: 10 })); // => 10
{% endspoiler %}

- 第10题

```js
var arr = [1, 2, 3];
function test(arr) {
    arr.push(4)
    arr = [];
}
test(arr);
console.log(arr);
```
{% spoiler "答案" %}
参数传递的是副本
console.log(arr); // => [1, 2, 3, 4]
{% endspoiler %}

- 第11题

```js
function Foo() { 
    getName = function () {
        console.log(1);
    }
    return this;
}

Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3);
}
var getName = function () {
    console.log(4);
}
function getName() {
    console.log(5);
}
// 输出结果
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo.getName();
```

{% spoiler "答案" %}
Foo.getName() // -> 2
getName() // -> 4
Foo().getName() // -> 1
getName() // -> 1
new Foo.getName() // -> 2
new Foo().getName() // -> 3
new new Foo.getName() // -> 2
{% endspoiler %}

#### 知识点

- 所有的声明都会提升到作用域的最顶上去
- 同一个变量只会声明一次，其他的会被忽略掉或者覆盖掉
- 函数声明的优先级高于变量声明的优先级，并且函数声明和函数定义的部分一起被提升

```
//函数声明式
function bar () {}

//变量形式声明 、 函数字面量式
var foo = function () {}
```