export default async (req, { user }, args = []) => {
  const { name } = user
  if (name != 'admin') throw 'not admin!'
}