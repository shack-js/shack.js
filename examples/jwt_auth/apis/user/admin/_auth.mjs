export default async (req, { user }) => {
  if (user != 'admin') throw 'need admin login!'
}