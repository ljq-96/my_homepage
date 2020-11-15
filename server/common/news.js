const schedule = require('node-schedule')
const axios = require('axios')
const cheerio = require('cheerio')
const news = {
  isEmpty: true,
  weibo: []
}

schedule.scheduleJob('00 0 * * * *', getNews)

async function getNews() {
  const data = await axios.get('https://s.weibo.com/top/summary')
  const $ = cheerio.load(data.data)
  news.weibo.length = 0
  $('.list_a li:not(:first-child)').each(function (index) {
    const obj = {}
    obj.index = $(this).find('strong').text()
    obj.title = $(this).find('span').children()[0].prev.data
    obj.subtitle = ($(this).find('em').text() / 10000).toFixed(0) + '万'
    obj.link = `https://s.weibo.com${$(this).find('a').attr('href')} `
    news.weibo.push(obj)
    if (index === 9) return false
  })
  news.isEmpty = false
}

async function getTranslate(words) {
  const url = `https://www.youdao.com/w/${words}/`
  const phonetic = []
  const translation = []
  let isSuccess = false
  try {
    const result = await axios.get(encodeURI(url))
    const $ = cheerio.load(result.data)

    $('#phrsListTab .pronounce').each(function () {
      const item = $(this).text()
      phonetic.push(item.replace(/[\r,\n,\r\n,\s]/g, ''))
    })
    $('#phrsListTab .trans-container li').each(function () {
      translation.push($(this).text())
    })
    $('#phrsListTab .trans-container .contentTitle').each(function () {
      translation.push($(this).text())
    })
    if (!phonetic.length && !translation.length) {
      phonetic.push('未找到翻译')
    }
    isSuccess = true
  } catch (err) {
    phonetic.push('服务器异常')
  }
  return { isSuccess, phonetic, translation }
}

module.exports = { news, getNews, getTranslate }
