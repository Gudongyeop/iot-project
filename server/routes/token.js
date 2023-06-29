const express = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { verifyToken } = require('./middlewares');


const router = express.Router();

var mysql = require('mysql');

let client = mysql.createConnection({
  host: '3.34.131.194',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  database: 'ssafypjt1'
})

router.post('/', function(req, res, next) {
    var signInInfo = req.body
    var id = signInInfo.username
    var password = signInInfo.password
    var email = signInInfo.email    
    var query = `SELECT COUNT(*) as result FROM user WHERE id = "${id}" and pw = "${password}" and email = "${email}"`
    client.query(query, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(result[0].result)
            if (result[0].result === 1) {
                const token = jwt.sign({
                    id,
                    email
                }, process.env.JWT_SECRET, {
                    expiresIn: '8h',
                    issuer: '토큰발급자',
                });
                res.json(token)
            } else {
                res.status(400).json({success: false, error: 'Sorry, error'});
            }

        }
    })
});


// 토큰을 발급하는 라우터
// router.post('/', async (req, res) => {
//   try {
//     // 대충 DB에서 사용자 정보를 찾는 코드: 대충 id, nick 정보를 찾았다고 가정
//     // API 키를 발급하여 사용하면 좋음(?)
//     const id = 'ingyeo';
//     const nick = 'ing-yeo';
//     // console.log(process.env.JWT_SECRET)
//     // jwt.sign() 메소드: 토큰 발급
//     const token = jwt.sign({
//       id,
//       nick,
//     }, process.env.JWT_SECRET, {
//       expiresIn: '1m', // 1분
//       issuer: '토큰발급자',
//     });

//     return res.json({
//       code: 200,
//       message: '토큰이 발급되었습니다.',
//       token,
//     });
//   }

//   catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       code: 500,
//       message: '서버 에러',
//     });
//   }
// });

// // 발급된 토큰을 테스트하는 라우터
router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;