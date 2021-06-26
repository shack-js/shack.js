import { hello } from "../apis/hello.mjs"
  ;
(async () => alert(await hello('world')))()

// for hot reload 
import.meta.webpackHot && import.meta.webpackHot.accept()