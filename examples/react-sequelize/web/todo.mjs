import StoreModule from 'react-tiny-states'
import { list } from '../apis/todo.mjs'

const  Store = StoreModule.default
export const todos = new Store([], [], async () => list())
export const loadingIndex = new Store(-2) // -2=none, -1=new, 0,1,..=index