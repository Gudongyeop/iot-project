var express = require('express');
var router = express.Router();
require('dotenv').config();
var axios = require('axios')
var schedule = require("node-schedule");

var client_id = process.env.NAVER_ID;
var client_secret = process.env.NAVER_SECRET;
var api_url = 'https://openapi.naver.com/v1/search/news.json?query=%EC%BD%94%EB%A1%9C%EB%82%98%20%ED%99%95%EC%A7%84%EC%9E%90&display=20'
var newsList = []
var lastBuild = null

var naverID = {headers : {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}}

var getCoronaNews = function() {
    axios.get(api_url, naverID)
        .then(res => {
            lastBuild = res.data.lastBuildDate
            console.log(lastBuild)
            newsList = res.data.items
            newsList.push({"last_build": lastBuild})
        })
}
getCoronaNews()
schedule.scheduleJob('0 * * * *', function() {
    getCoronaNews()
    console.log('success')
})

router.get('/', function(req, res, next) { // 결과 보여주는 
    res.json(newsList)
})

router.get('/refresh', function(req, res, next) {
    getCoronaNews()
    res.json({'message': '새로고침 완료'})
})

module.exports = router;