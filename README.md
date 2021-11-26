# shack.js

shack a JavaScript fullstack solution. an alternative for ember.js or meteor, more clean and flex and less API to learn

shack 是一个全栈方案，用于替代 ember或 meteor，但 shack 更加干净和灵活，也不基本不需要需要学习 API

with shack.js you can just forget `fetch`, `axios` and things alike, you **call backend functions directly**, and of course with **access control**

使用 shack 的时候，你不再需要使用 `fetch`、`axios` 一类的 API，你可以**直接调用后台的函数**，并且当然这些都是有**权限控制**的

server | 服务端:

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

```diff
-import axios from 'axios'
+import { hello } from '../apis/hello.mjs'
  ;
(async () => {
-  alert((await axios.post('/hello', {name:'world'})).data)
+  alert(await hello('world'))
})()
```

[*why shack.js and why not | shack.js 的优缺点*](./docs/why-shackjs-and-why-not.md)

try it out on codesandbox: https://codesandbox.io/s/shack-js-mjs-zny16

## quick usage | 快速上手

- create file `apis/hello.mjs` with content `import { platform } from 'os';export const hello = async name => 'hello ' + name + '! from ' + platform()` | 创建 `apis/hello.mjs` 文件并添加前面代码
- create file `web/index.mjs` with content `import { hello } from "../apis/hello.mjs";(async () => alert(await hello('world')))()` | 创建 `web/index.mjs` 文件并添加前面代码
- run command `npm i @shack-js/cli` | 运行 `npm i @shack-js/cli`
- run command `./node_modules/.bin/shack dev` | 运行 `./node_modules/.bin/shack dev`

open http://localhost:3000 and it shall be there | 打开 http://localhost:3000 体验效果

keep these in mind when you code, and it should work: | 在使用 shack 编码过程中需要注意

- export backend functions to be used by web in `apis` folder | 在 `apis` 目录下的文件仅导出（`export`）前端需要的函数
- add webpack configs you need into `shack.config.mjs` | 当你需要添加 webpack 的配置时，以相同格式添加到 `shack.config.mjs` 即可

[![quick usage](https://img.youtube.com/vi/IhlW78_KaFI/0.jpg)](https://www.youtube.com/watch?v=IhlW78_KaFI&list=PLM1v95K5B1ntVsYvNJIxgRPppngrO_X4s)

example on youtube: https://www.youtube.com/watch?v=IhlW78_KaFI&list=PLM1v95K5B1ntVsYvNJIxgRPppngrO_X4s


## use template | 使用模板
```
npx @shack-js/cli init my-app -t react-typescript
cd my-app
npm i
npm run dev
# npm run build
# npm run start
```
more | 更多：https://github.com/shack-js/cli

## examples | 示例

- [basic](./examples/basic)
- [custom html](./examples/custom-html)
- [jwt auth](./examples/jwt-auth)
- [typescript](./examples/typescript)
- [react](./examples/react)
- [react+typescript](./examples/react-typescript)
- [sequelize](./examples/react-sequelize)
- [mongoose](./examples/mongoose)
- [elasticsearch](./examples/elasticsearch)
- [blog site | 博客网站](./examples/blog-site)
- [simple chat with socket.io | 基于 socket.io 的简单聊天](./examples/simple-chat)

## tutorials | 教程

- [blog site | 博客网站](./examples/blog-site/README.md)

## templates | 模板

 `npx @shack-js/cli init <name> -t <template>`, default template is `basic` | 默认模板为 `basic`

- [basic](https://github.com/shack-js/template-basic)
- [typescript](https://github.com/shack-js/template-typescript)
- [react](https://github.com/shack-js/template-react)
- [react-typescript](https://github.com/shack-js/template-react-typescript)

or | 或者 `npx @shack-js/cli init <name> -t <git repo>`
