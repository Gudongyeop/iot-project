var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();
const { verifyToken } = require('./middlewares');

let client = mysql.createConnection({
  host: '3.34.131.194',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  database: 'ssafypjt1'
})

/* GET users listing. */
router.get('/', verifyToken ,function(req, res, next) {
  client.query("SELECT * FROM student;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.", err);
    }
    else{
      res.json(result);
    }
  });
});

// POST
router.post('/', verifyToken ,function(req, res, next) {
  var info = req.body;
  var name = info.name;
  var gisu = info.gisu; 
  var area = info.area;
  var part = info.part;
  var stu_class = info.stu_class;
  var serial = info.serial;
  var queryString = `INSERT INTO student (name, gisu, area, part, stu_class, serial) VALUES ("${name}", "${gisu}", "${area}", "${part}", "${stu_class}", "${serial}")`
  client.query(queryString, function (err, result) {
    if (err) {
      // Throw your error output here.
      console.log(stu_class)
      console.log(queryString);
    } else {
        // Throw a success message here.
        console.log("1 record successfully inserted into db");
        res.json({"message": "1 record successfully inserted into db"})
    }
  });
});


//Detail 
router.get('/:no', verifyToken ,function(req, res, next) {
  var no = req.params.no;
  client.query(`SELECT * FROM student WHERE no = ${no}`, function(err, result) {
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
      res.status(401).json({success: false, error: 'Sorry, error'})
    }
    else{
      if (result.length===0) {
        res.status(404).json({success: false, error: 'Sorry, error'})
      } else {
        res.json(result);
      }
    }
  })
});

//Update
router.put('/:no', verifyToken, function(req, res, next) {
  var no = req.params.no;
  var info = req.body;
  var name = info.name;
  var gisu = info.gisu; 
  var area = info.area;
  var part = info.part;
  var stu_class = info.stu_class;
  var serial = info.serial;
  var queryString = `UPDATE student SET name = "${name}", gisu = "${gisu}", area = "${area}", part = "${part}", stu_class = "${stu_class}", serial = "${serial}" WHERE no = ${no}`
  client.query(queryString, function(err, result) {
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      console.log("1 record successfully inserted into db");
      res.json({message : "성공적으로 수정 되었습니다."});
    }
  })
});

//Delete
router.delete('/:no', verifyToken, function(req, res, next) {
  var no = req.params.no;
  var queryString = `DELETE FROM student WHERE no = ${no}`
  console.log('ㅇㅇㅇ')
  client.query(queryString, function(err, result) {
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.json({message : "성공적으로 삭제 되었습니다."});
      console.log('삭제 완료');
    }
  })
});

//중복확인 
router.get('/check/serial', function(req, res, next) {
  let serialText = req.query.serial
  console.log(serialText);
  let queryString = `SELECT * FROM student WHERE serial = "${serialText}";`
  console.log(queryString);
  client.query(queryString, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      if (result.length === 0) {
        res.json({message: "중복 아님"})
      } else {
        res.status(401).json({message: "중복"})
      }
    }
  })
})

module.exports = router;
