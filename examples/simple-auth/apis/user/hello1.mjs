export const _auth = async (req, { user }, args = []) => {
  const { name } = user
  if (name != 'admin') throw 'not admin!'
}

export const chainAuthInFileAdmin = async user => {
  return 'hello!'
}