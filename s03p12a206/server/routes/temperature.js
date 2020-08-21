var express = require('express');
const { verifyToken } = require('./middlewares');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();

let client = mysql.createConnection({
  host: '3.34.131.194',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  port: 3306,
  database: 'ssafypjt1',
  timezone: '+09:00',
  dateStrings: 'date'
})



router.get('/:selectDate',verifyToken, function(req, res, next) {
  var selectDate = req.params.selectDate;
  var queryString = `select s.no, s.name, s.gisu, s.area, s.part, s.channel_id ,s.stu_class, t.temp, t.datetime 
                    from student as s 
                    left join (select * from temperature where datetime like "${selectDate}%") 
                    as t on s.no = t.stu_no;`
  // console.log(queryString)
  let alignStudent = []
  client.query(queryString, function(err, result, fields) {
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    } else {
      // console.log(result)
      result.forEach(e => {
        let studentInfo = Object
        if (e.temp === null) {
          studentInfo = {
            "student_number": e.no,
            "student_info": {
              "name": e.name, 
              "gisu": e.gisu,
              "area": e.area,
              "part": e.part,
              "channel_id": e.channel_id,
              "stu_class": e.stu_class,
            }, 
            "temp_info" : 
              {
                "temperature": "",
                "datetime": "",
              }
          }
        } else {
          studentInfo = {
            "student_number": e.no,
            "student_info": {
              "name": e.name, 
              "gisu": e.gisu,
              "area": e.area,
              "part": e.part,
              "channel_id": e.channel_id,
              "stu_class": e.stu_class,
            }, 
            "temp_info" : 
              {
                "temperature": e.temp,
                "datetime": e.datetime,
              }
          }
        }
        alignStudent.push(studentInfo)
      });
      let grouped = []
      alignStudent.forEach(e => {
        if (!this[e.student_number]) {
          this[e.student_number] = {
            "student_number": e.student_number,
            "student_info": {
              "name": e.student_info.name, 
              "gisu": e.student_info.gisu,
              "area": e.student_info.area,
              "part": e.student_info.part,
              "channel_id": e.student_info.channel_id,
              "stu_class": e.student_info.stu_class,
            }, 
            "temp_info" : [{
              "temperature": e.temp_info.temperature,
              "datetime": e.temp_info.datetime,
            }]
          }
          // console.log(e.temp_info)
          grouped.push(this[e.student_number])
          return
        }
        this[e.student_number].temp_info.push(e.temp_info)
      }) // 같은학생경우 온도 다 합쳐서
      let reGrouped = []
      grouped.forEach(e => {
        let tem = {
          "student_number": e.student_number,
          "student_name": e.student_info.name,
          "student_gisu": e.student_info.gisu,
          "student_area": e.student_info.area,
          "student_part": e.student_info.part,
          "student_channel_id": e.student_info.channel_id,
          "student_class": e.student_info.stu_class,
        }
        e.temp_info.forEach(el => {
          // console.log(el.datetime);
          let measuringHour =  el.datetime.substr(11,2)
          measuringHour *= 1
          // console.log(measuringHour)
          // console.log(dateChange.length)
          if (8<= measuringHour && measuringHour <= 10) {
            tem["morning_temp"] = el.temperature
            tem["morning_time"]= el.datetime
          } else if (11 <= measuringHour && measuringHour <= 14) {
            tem["lunch_temp"] = el.temperature
            tem["lunch_time"]= el.datetime
          }

        })
        reGrouped.push(tem)
      })
      res.json(reGrouped);
      // res.json(result)
    }
  })
});
router.post('/measure', verifyToken, function(req, res, next) {
  let info = req.body
  let temp = info.temp
  let datetime = info.datetime
  let serial = info.serial
  let studentNumber = null
  client.query(`SELECT no FROM student WHERE serial = "${serial}";`, function(err, result, fields) {
    if (err) {
      console.log(err)
      console.log(`SELECT no FROM student WHERE serial = "${serial}";`)
    } else {
      console.log(result)
      studentNumber = result[0].no
      client.query(`INSERT INTO temperature (temp, datetime, stu_no) VALUE ("${temp}", "${datetime}", "${studentNumber}");`, function(err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log("success")
          res.json("완료")
        }
      })
    }
  })
})
// 학생별 체온 측정 목록
router.get('/students/:studentNum', verifyToken, function(req, res, next) {
  let studentNum = req.params.studentNum
  client.query(`SELECT * FROM temperature WHERE stu_no=${studentNum} ORDER BY datetime DESC;`, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      // console.log(result)
      res.json(result)
    }
  })
})

router.get('/:selectDate/search/student', function(req, res, next) {
  let selectDate = req.params.selectDate;
  let area = req.query.area
  let gisu = req.query.gisu
  let stu_class = req.query.class
  let name = req.query.name
  let queryString = `SELECT * FROM student WHERE area="${area}" and gisu=${gisu} and stu_class="${stu_class}" and name="${name}";`
  console.log(queryString)
  client.query(queryString, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      // console.log(result)
      if (result.length === 0) {
        res.json({"message":"찾는 사용자 없음"})
      } else {
        let studentNumber = result[0].no
        // console.log(studentNumber)
        let secondQueryString = `SELECT temp, datetime FROM temperature WHERE datetime LIKE "${selectDate}%" and stu_no=${studentNumber} ORDER BY datetime DESC`
        // console.log(secondQueryString)
        client.query(secondQueryString, function(err, secondResult) {
          if (err) {
            console.log(err)
          } else {
            // console.log(secondResult.length)
            if (secondResult.length!=0) {
              res.json({"student": result,"temperature": secondResult})
            } else {
              res.json({"message": "측정 온도 정보가 없습니다."})
            }
            
          }
        })
      } 
    }
  })
})

module.exports = router;
