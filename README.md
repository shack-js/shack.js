# shack.js

with shack.js you can just forget `fetch`, `axios` and things alike, you call backend functions directly, and of course with access control


## quick usage

```
npx @shack-js/cli init my-app 
cd my-app
npm i
npm run dev
# npm run build
# npm run start
```

keep these in mind when you code, and it should work:

- keep backend functions in `apis` folder
- add webpack configs you need into `shack.config.js` 



## examples

- [basic](./examples/basic)
- [custom html](./examples/custom-html)
- [jwt auth](./examples/jwt-auth)
- [typescript](./examples/typescript)
- [react](./examples/react)
- [react+typescript](./examples/react-typescript)
- [sequelize](./examples/react-sequelize)

## templates

 `npx @shack-js/cli init <name> -t <template>`, default template is `basic`

- [basic](https://github.com/shack-js/template-basic)
- [typescript](https://github.com/shack-js/template-typescript)
- [react](https://github.com/shack-js/template-react)
- [react-typescript](https://github.com/shack-js/template-react-typescript)

## todos

- hot reload for browser 
- stop caching modules on server when dev
- expose express instance for futher custom like websocket, SSE
