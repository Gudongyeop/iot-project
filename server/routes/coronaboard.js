var express = require('express');
var router = express.Router();

require('dotenv').config();
var axios = require('axios')
var schedule = require("node-schedule");

let yesterday = new Date()
let dd = yesterday.getDate()
let mm = yesterday.getMonth()+1 // Jan is 0
let yyyy = yesterday.getFullYear()

let dayBeforeYesterday = new Date()
let weekDate = dayBeforeYesterday.getTime() - (7*24*60*60*1000)
dayBeforeYesterday.setTime(weekDate)
let dd2 = dayBeforeYesterday.getDate()
let mm2 = dayBeforeYesterday.getMonth() + 1
let yyyy2 = dayBeforeYesterday.getFullYear()

if(dd<10){
  dd = '0'+dd
}                
if(mm<10){
  mm = '0'+mm
}
if(dd2<10){
  dd2 = '0'+dd2
}                
if(mm2<10){
  mm2 = '0'+mm2
}                           
yesterday = `${yyyy}${mm}${dd}`
dayBeforeYesterday = `${yyyy2}${mm2}${dd2}`


const BASE_URL = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson'
const API_URL = `${BASE_URL}?serviceKey=${process.env.API_KEY}&startCreateDt=${dayBeforeYesterday}&endCreateDt=${yesterday}&`

var coronaData = {}
var requestAPI = function() {
    axios.get(API_URL)
    .then(result => {
        //console.log(result.data.response.body.items)
        coronaData = result.data.response.body.items.item
    })
    .catch(err => {
        console.log(err)
    })
}
requestAPI()
schedule.scheduleJob('0 * * * *', function() {
    requestAPI()
    console.log('success')
})

router.get('/', function(req, res, next) {
  res.json(coronaData);
});


router.get('/update', function(req, res, next) {
    requestAPI()
    res.json(coronaData)

}) 


module.exports = router;