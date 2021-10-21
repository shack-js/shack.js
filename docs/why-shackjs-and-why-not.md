# why shack.js and why not

## why shack.js | shack.js 的好处

### low code | 低代码

server | 服务端: 

no more need to take care of express | 不用写 express 的代码 

```diff
-import express from 'express'
-import {json} from 'body-parser'
import { platform } from 'os'

-const app = express()
-const port = 3000

-const hello = async name => 'hello ' + name + '! from ' + platform()
+export const hello = async name => 'hello ' + name + '! from ' + platform()

-app.use(express.static('public'))
-app.use(json())
-app.get('/hello', async (req, res) => {
-  res.json(await hello(req.body.name))
-})

-app.listen(port, () => {
-  console.log(`Example app listening at http://localhost:${port}`)
-})
```

client | 客户端:

no more need to take care of requests | 不用写请求网络的代码 

```diff
-import axios from 'axios'
+import { hello } from '../apis/hello.mjs'
  ;
(async () => {
-  alert((await axios.post('/hello', {name:'world'})).data)
+  alert(await hello('world'))
})()
```


### better IDE hint | 更好的 IDE 提示

when you get a response and IDE don't know the structure of it so we need to define typings | 编辑器不知道网络请求结果的结构，我们需要额外定义

```typescript
type SomeType=...
let res = await fetch(...args)
let val = (await res.json()) as SomeType
```

but with shack.js it is done automatically | 使用 shack.js 则无需定义，IDE 自动推导

```
import {xxx} from '../apis/xxx'
let val = await xxx()
```

### typings are best api docs | 使用类型代替 API 文档

`apis/cat.ts`

```typescript
type Cat = { name: string, age: number }
export const getCats = async (): Promise<Cat[]> => {
  return []
}
```

if you don't use result of `getCats()` as `Cat[]` the IDE will know and compilation will fail | 如果你不按照 `Cat[]` 类型使用 `getCats()` 的结果，IDE 会提示且编译无法通过

### layered authentication | 分层的权限
```
+-- apis
     +-- user
     |    +-- _auth.ts # allow only user
     |    +-- admin
     |    |    +-- _auth.ts # allow only admin
     |    |    +-- *.ts # admin apis
     |    +-- *.ts # user apis
     +-- *.ts # anonymous apis  
```

### other | 其他

- hot reload for frontend | 前端热更新
- support mjs/cjs/ts
- webpack-like config in `shack.config.js` | 和 webpack 格式相同的配置文件

## why not shack.js | shack.js 不好的地方

### blured edge between frontend and backend

if you import value/type meant for backend into frontend code, webpack build will fail | 如果引用了仅用于后台的值或类型，打包会失败 

`web/xx.ts`

```
import {some_async_function} from '../apis/xxx' // √
import {connect} from 'mysql' // ×
```

### only export async functions in apis | API 目录下仅导出异步函数

`apis/xx.js`

```
export const xx = async (...args) => {
  ...
  return rtn
}
```

### only use api params and results as simple data | API 的参数和返回值仅可作为简单数据使用

`apis/cat.js`
```
class Cat {
  constructor(name){
    this.name=name
  }
  meow(){
    return `${this.name} meow!`
  }
}

export const getCat=async()=>new Cat('black')
```

`web/xx.js`

```
let cat = await getCat()
console.log(cat.name) // √
console.log(cat.meow()) // × lost during serialize and deserialize | 序列化反序列化过程中丢失
```