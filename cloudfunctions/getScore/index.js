// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const myURL = 'http://tu39432812.qicp.vip/app.do'
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let {
    xueHao, password, xnxqid
  } = event
  let scoreList = []
  // const res = await axios.get(myURL + '?method=authUser' + '&xh' + xueHao + '&pwd' + password)
  const res = await axios.get(myURL + '?method=authUser' + '&xh=' + xueHao + '&pwd=' + password)
  const token = res.data.token
  console.log(token)
  // const score = await axios.get(myURL + '?method=getCjcx' + '&xh' + xueHao + '&xnxqid' + xnxqid)
  const score = await axios.get(
    (myURL + '?method=getCjcx' + '&xh=' + xueHao + '&xnxqid=' + xnxqid),
    {headers: { token: token }}
  )
  console.log(score)
  const scoreData = score.data.result
  console.log(scoreData)
  return scoreData
}