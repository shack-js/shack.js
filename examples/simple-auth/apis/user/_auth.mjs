export default async (req, state, args = []) => {
  const [{ user }] = args
  if (!user) throw 'not user!'
  return { ...state, user }
}