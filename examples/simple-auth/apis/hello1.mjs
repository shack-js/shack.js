export const _auth = async (req, state, args = []) => {
  const [{ token }] = args
  if (token != '123') throw 'wrong token!'
}

export const authInFileToken = async token => {
  return 'hello!'
}