export default async (req, { user }) => {
  if (user.user != 'admin') throw 'need admin login!'
}