let express = require('express');
let router = express.Router();
let mysql = require('mysql');
const { all } = require('.');

let client = mysql.createConnection({
    user: 'root',
    host: '3.34.131.194',
    port: 3306,
    password: 'Rnehdduq6650!',
    database: 'ssafypjt1',
    timezone: '+09:00',
    dateStrings: 'date'
  })

router.get('/:selectDate',function(req, res, next) {
    let selectDate = req.params.selectDate;
    let area = req.query.area
    let gisu = req.query.gisu
    let stu_class = req.query.class
    if (area === undefined || area === "전체") {
        area = "%"
    }
    if (gisu === undefined || gisu === "전체") {
        gisu = "%"
    }
    if (stu_class === undefined || stu_class === "전체") {
        stu_class = "%"
    }
    console.log(gisu);

    let morningMeasuredStudentsQuery = `select count(distinct(s.no)) as measuredStudent
                        from student as s 
                        join (select * from temperature where datetime like "${selectDate} 08%")
                        as t on s.no = t.stu_no and s.area like "${area}" and s.stu_class like "${stu_class}" and s.gisu like "${gisu}";`
    let lunchMeasuredStudentsQuery = `select count(distinct(s.no)) as measuredStudent
                        from student as s 
                        join (select * from temperature where datetime like "${selectDate} 11%" or datetime like "${selectDate} 12%" )
                        as t on s.no = t.stu_no and s.area like "${area}" and s.stu_class like "${stu_class}" and s.gisu like "${gisu}";`
    let allStudentsQuery = `select count(no) as count from student as s where s.area like "${area}" and s.stu_class like "${stu_class}" and s.gisu like "${gisu}";`               
    let allStudents = 0
    let morningMeasuredStudents = 0
    let lunchMeasuredStudents = 0
    let morningCal = 0
    let lunchCal = 0

    console.log(morningMeasuredStudentsQuery);
    client.query(allStudentsQuery, function(err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            allStudents = result[0].count
        }
    })
    client.query(lunchMeasuredStudentsQuery, function(err, result, fields) {
        if (err) {
            console.log(err)
        } else {
            lunchMeasuredStudents = result[0].measuredStudent
            lunchCal = allStudents - lunchMeasuredStudents
        }
    })
    client.query(morningMeasuredStudentsQuery, function(err, result, fields) {
        if (err) {
            console.log(err)
        } else {
            morningMeasuredStudents = result[0].measuredStudent
            morningCal = allStudents - morningMeasuredStudents
            if (area === "%") {
                area = "전체"
            }
            if (gisu === "%") {
                gisu = "전체"
            }
            if (stu_class === "%") {
                stu_class = "전체"
            }            
	    res.json({
                "구분": {
                        "지역":area, "기수": gisu, "반": stu_class
                        },
                "오전미측정": morningCal, 
                "오전측정": morningMeasuredStudents, 
                "오후미측정": lunchCal, 
                "오후측정": lunchMeasuredStudents
            })
        }
    })
})
module.exports = router;
