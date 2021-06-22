export const hello = async () => `hello!`

export const authInMethodToken = async ({ token }) => {
  if (token != '123') throw 'wrong token!'
  return 'hello!'
}