export default async (req: any, ctx: { user?: any }) => {
  if (!ctx.user) throw 'login first!'
}