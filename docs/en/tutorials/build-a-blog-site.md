# build a blog site with shack.js

## init project with react + typescript template

```
npx @shack-js/cli init blog-site -t react-typescript
cd blog-site
npm i
yarn dev 
```
now check localhost:3000 to see if it's working
![screenshot](../../images/inital.jpg)

## define database tables

let's use sequelize, and [example codes](https://github.com/shack-js/shack.js/tree/main/examples/react-sequelize) can help

```
npm i sequelize sqlite3 md5 -S
npm i @types/sequelize @types/express @types/md5 -D
```
