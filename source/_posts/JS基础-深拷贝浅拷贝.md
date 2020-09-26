title: JS基础-深拷贝浅拷贝
author: John Doe
date: 2018-02-03 16:28:28
tags: JS基础
---
#### 浅拷贝

> 浅拷贝只解决了第一层的问题，如果接下去的值中有对象的话就需要深拷贝

- Object.assign
- es6展开运算符 ...  `{...Object}  [...Array]`

```
let a = {name: "a"}
let d = [1];
let b = Object.assign({}, a);
let c = {...a};
let e = [...d];
Object.assign 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝。
```

#### 深拷贝

实现一个深拷贝需要考虑很多边界问题，原型链、DOM如何处理等推荐使用loadsh

- [loadsh cloneDeep](https://lodash.com/docs#cloneDeep) 推荐使用
- JSON.parse(JSON.stringify(object))
	- 会忽略undefined
    - 会忽略symbol
    - 会忽略function
    - 不能序列化函数
    - 不能解决循环引用的对象(报错)
``` js
let a = {
  a: undefined,
  b: Symbol('b'),
  c: function() {},
  d: 'd'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "d"}
```
- 简易deepClone

``` js
function deepClone(obj) {
  let isArray = Array.isArray(obj);
  let newObj = isArray ? [...obj] : { ...obj };
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象');
  }

  // Object.keys(newObj)；
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj;
}

let obj = {
  a: [1, 2, 3, 4],
  b: {name: 'b'}
}

let newObj = deepClone(obj)
newObj.a.push(5);
console.log(obj.a); // -> [1, 2, 3, 4]
```

### 参考

- [loadsh cloneDeep](https://lodash.com/docs#cloneDeep)
- [Refkect.ownKeys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)