// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const axios = require('axios')
const URL = 'http://musictest.xiecheng.live/personalized?icode=8887E96AB5058F0B'
const playlistCollection = db.collection('playlist')
const MAX_DATA = 10


// 云函数入口函数
exports.main = async (event, context) => {
  // const list = await playlistCollection.get()
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_DATA) // 需要循环取数据的次数
  const tasks = [] // 任务数组对象

  for(let i=0;i<batchTimes;i++){
    let promise = playlistCollection.skip(i * MAX_DATA).limit(MAX_DATA).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  // 获取歌单数据
  const {data} = await axios.get(URL)
  const playlist = data.result

  const newData = []
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let isOnly = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        isOnly = false
        break
      }
    }
    if (isOnly) {
      newData.push(playlist[i])
    }
  }

  console.log(newData)

  // 将数据插入歌单
  if (newData.length) {
    await playlistCollection.add({
      data: [...newData]
    }).then(() => {
      console.log('Add success!')
    }).catch(() => {
      console.log('Add fail!')
    })
  }
 
  return newData.length
}