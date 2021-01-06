# calc.js 

用于计算浮点数。

当使用原生 `js` 的计算出现浮点苏精度 `bug` 的时候， 你将可以使用它。

## 下载 

```bash
npm i float-calc-expression
```

## 使用

`calc` 函数接受 数字，小数， 加减乘除 组成的表达式。

```js
import { calc } from 'float-calc-expression'

calc('40.120-36*4/18+35')
```

还提供 加减乘除 方法， 用于当你想要用括号的时候。

```js
import { calc, add, subtract, multiply, divide, } from 'float-calc-expression'

// 3 + (15 - 10 / 2)
add(3, calc('15 - 10 / 2'))
```