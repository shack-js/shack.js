# shack.js

a JavaScript fullstack solution. an alternative for ember.js or meteor, more clean and flex and less API to learn

with shack.js you can just forget `fetch`, `axios` and things alike, you **call backend functions directly**, and of course with **access control**

browser:

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

client:

```diff
-import axios from 'axios'
+import { hello } from '../apis/hello.mjs'
  ;
(async () => {
-  alert((await axios.post({name:'world'})).data)
+  alert(await hello('world'))
})()
```


## quick usage

- create file `apis/hello.mjs` with content `import { platform } from 'os';export const hello = async name => 'hello ' + name + '! from ' + platform()`
- create file `web/index.mjs` with content `import { hello } from "../apis/hello.mjs";(async () => alert(await hello('world')))()`
- run command `npm i @shack-js/cli`
- run command `./node_modules/.bin/shack dev`

open http://localhost:3000 and it shall be there

keep these in mind when you code, and it should work:

- export backend functions to be used by web in `apis` folder
- add webpack configs you need into `shack.config.js` 

[![quick usage](https://img.youtube.com/vi/IhlW78_KaFI/0.jpg)](https://www.youtube.com/watch?v=IhlW78_KaFI&list=PLM1v95K5B1ntVsYvNJIxgRPppngrO_X4s)

example on youtube: https://www.youtube.com/watch?v=IhlW78_KaFI&list=PLM1v95K5B1ntVsYvNJIxgRPppngrO_X4s


## normal usage
```
npx @shack-js/cli init my-app -t react-typescript
cd my-app
npm i
npm run dev
# npm run build
# npm run start
```

## examples

- [basic](./examples/basic)
- [custom html](./examples/custom-html)
- [jwt auth](./examples/jwt-auth)
- [typescript](./examples/typescript)
- [react](./examples/react)
- [react+typescript](./examples/react-typescript)
- [sequelize](./examples/react-sequelize)
- [mongoose](./examples/mongoose)
- [elasticsearch](./examples/elasticsearch)
- [blog site](./examples/blog-site)

## tutorials

- [blog site](./examples/blog-site/README.md)

## templates

 `npx @shack-js/cli init <name> -t <template>`, default template is `basic`

- [basic](https://github.com/shack-js/template-basic)
- [typescript](https://github.com/shack-js/template-typescript)
- [react](https://github.com/shack-js/template-react)
- [react-typescript](https://github.com/shack-js/template-react-typescript)


