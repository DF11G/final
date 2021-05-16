// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.use(async (ctx, next) => {
    ctx.data = {}
    // event具有天然的鉴权机制，可以获取用户的openId
    ctx.data.openId = event.userInfo.openId
    // 继续异步执行
    await next()
  })

  // 只针对music的操作
  app.router('music', async (ctx, next) => {
    ctx.data.musicName = 'Music11111'
    await next()
  }, async (ctx, next) => {
    ctx.data.musicType = 'Type11111'
    ctx.body = {
      data: ctx.data
    }
  })

  // 只针对movie的操作
  app.router('movie', async (ctx, next) => {
    ctx.data.movieName = 'Movie11111'
    await next()
  }, async (ctx, next) => {
    ctx.data.movieType = 'Type11111'
    ctx.body = {
      data: ctx.data
    }
  })

  return app.serve()
}