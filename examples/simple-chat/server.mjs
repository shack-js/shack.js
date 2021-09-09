import getApp from '@shack-js/runner-express'
import teminatorModule from 'http-terminator'
import { getDevApp } from '@shack-js/cli/src/dev/get-dev-app.mjs'
import { Server } from 'socket.io'
import { createServer } from 'http'

const DEV = !process.env.PRODUCTION
  ;
(async (options) => {
  let { port = 3000, ...rest } = options
  let app = DEV ? await getDevApp(rest) : await getApp(rest)
  
  let server = createServer(app)
  let io = new Server(server)
  io.on('connection', socket => {
    socket.on('join', room => (socket.join(room),console.log(`join ${room}`)))
    socket.on('leave', room => (socket.leave(room),console.log(`leave ${room}`)))
    socket.on('msg', ({ fromid, toid }) => (io.to(`to_${toid}`).emit('msg', fromid),console.log(`msg ${fromid} ${toid}`)))
  })

  server.listen(port, () => console.log(`server started on ${port}`))
  let teminator = teminatorModule.createHttpTerminator({ server })
  let handleSignal = signal => {
    teminator.terminate()
    console.log(`got signal: ${signal}, terminating...`)
  }
  process.on('SIGTERM', handleSignal)
  process.on('SIGINT', handleSignal)
})(DEV ? {
  extension: '.ts',
  static: 'dist/web'
} : {
  extension: '.js',
  static: 'dist/web',
  apis: 'dist/tsc/apis'
})