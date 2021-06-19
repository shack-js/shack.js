import { hello } from "../apis/hello"
  ;
(async () => alert(await hello('world')))()