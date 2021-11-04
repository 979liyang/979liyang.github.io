title: Typescript
author: liyang
date: 2020-09-15 16:35:20
tags: Typescript
---
#### 基础语法

```js
let isDone: boolean = false;
let decLiteral: number = 6; // 支持 10、16、8、2进制
let name: string = "bob";
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3]; // 使用数组泛型，`Array<元素类型>`
let x: [string, number] = ['hello', 10];
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
x[6] = true; // Error, 布尔不是(string | number)类型
```

#### 枚举 enum

- 从0开始为元素编号, 可以手动的指定成员的数值

```js
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
let colorName: string = Color[4];
console.log(c, colorName);  // ->  2, Blue
```

#### any

```js
let list: any[] = [1, true, "free"];
list[1] = 100;
```

#### void null undefined 

```js
function warnUser(): void {
    alert("This is my warning message");
}

// 可以赋予 undefined null
let unusable: void = undefined;

let u: undefined = undefined;
let n: null = null;
```

#### Never

- `never`类型表示的是那些永不存在的值的类型。
- `any`也不可以赋值给`never`。

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

#### 断言

- <类型>值
- 值 as 类型， 使用jsx时只能用as

```js
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
console.log(strLength);
```

#### 只读

- readonly
- `ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改

```js
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!

// 可用类型断言重写
a = ro as number[];
a.push(1);
```

#### Interface

- `可选属性`名字定义的后面加一个`?`符号
- 传入的值，可以在接口中没有定义，依旧能获取
- 只读属性 `readonly`

```js
interface LabelledValue {
	readonly a: number;
	b?: string;
	c: string;
}
```




















