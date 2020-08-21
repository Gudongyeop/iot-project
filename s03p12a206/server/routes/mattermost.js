var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();
const { verifyToken } = require('./middlewares');
const axios = require('axios');
const { query } = require('express');
const BASE_URL = 'https://meeting.ssafy.com/api/v4'

let client = mysql.createConnection({
  host: '3.34.131.194',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  database: 'ssafypjt1'
})


// const teamChannelId = '85os7piwqpbtt89d6fwbx7mm8o'

// const myID = '1bj5twiozjbrpegyy7eafoiwqh'

async function login () {
    // 로그인 데이터
    const data = {
        'login_id': 'hhk9292@gmail.com',
        'password': process.env.MATTER_PW
    }
    try {
        return await axios.post(BASE_URL+'/users/login', data)
    } catch (error) {
        console.error(error);
    }
};
// 토큰 받아오는 함수 => 로그인이랑 묶어서 사용하기
async function getToken() {
    const response = await login();
    const token = response.headers.token
    return token
}

// 토큰이 유효한지 확인하는 함수 본인의 정보가 나오면 검증된 것 => getToken 실행해서 토큰 받아오고 그 토큰으로 검증하는 방식
// 즉 로그인 -> 토큰 -> 토큰 확인 순서
async function auth() {
    const myToken = await getToken()
    const headers = {'Authorization': `Bearer ${myToken}`}
    const config = {headers}
    axios
    .get(BASE_URL + '/users/me', config)
    .then(res => {
        console.log(res.status)
        console.log(res.data)
    })
    .catch(err => console.error(err.response.data))
}
async function tempNotice(message, channelId) {    
    const myToken = await getToken()
    const headers = {'Authorization': `Bearer ${myToken}`}
    const config = {headers}
    const data = {
        'channel_id': channelId,
        'message': message
    }
    axios
    .post(BASE_URL + '/posts', data, config)
    .then(res => console.log(res.data))
    .catch(err => console.error(err.config))
}

router.post('/send/message',verifyToken, function(req, res, next) {
    let info = req.body
    let message = info.message
    let students = info.students

    students.forEach(e => {
        let basicMessage1 = `@here ${e.name}님 빨리 체온 측정 하세요.`
        if (message === "") {
            tempNotice(basicMessage1, e.channel_id)
        } else {
            let changeMessage = `@here ${message}`
            tempNotice(changeMessage, e.channel_id)
        }
    })
    res.json({"message": "발송 완료!" })
})

// async function direct(name) {
//     const myToken = await getToken()
//     const headers = {'Authorization': `Bearer ${myToken}`}
//     const config = {headers}
//     const friend = myTeam[name]['id']
//     const data = [myID, friend]
//     try {
//         return await axios.post(BASE_URL + '/channels/direct', data, config)
//     } catch (error) {
//         console.error(error)
//     }
// }
// // 위에 있는 direct랑 묶어서 1:1 채팅 채널 id 찾기
// async function getChannelId(name) {
//     const response = await direct(name);
//     const channelId = response.data.id
//     return channelId
// }

// async function directMessage(name, message) {
//     const channelId = myTeam[name]['direct']
//     const myToken = await getToken()
//     const headers = {'Authorization': `Bearer ${myToken}`}
//     const config = {headers}
//     const data = {
//         'channel_id': channelId,
//         'message': message
//     }
//     axios
//     .post(BASE_URL + '/posts', data, config)
// }

// async function groupMessage(message) {
//     const channelId = teamChannelId
//     const myToken = await getToken()
//     const headers = {'Authorization': `Bearer ${myToken}`}
//     const config = {headers}
//     const data = {
//         'channel_id': channelId,
//         'message': message
//     }
//     axios
//     .post(BASE_URL + '/posts', data, config)
// }
module.exports = router;


