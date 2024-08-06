let express = require('express')
let path = require('path')
let route = express.Router()
let mysql=require('mysql')


let connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"targetob"
})
route.get('/operationlist',(req,res)=>{
    let query='select * from tbloperation'
    connection.query(query,(err,result)=>{
        if(err)throw err
        res.json(result);
    })
})

route.get('/ratecardlist',(req,res)=>{
    let query='select operationname,rate_per_hour from tbloperation left join tblratecard on tbloperation.opid = tblratecard.opid'
    connection.query(query,(err,result)=>{
        if(err) throw err
        res.json(result)
    })
})

module.exports = route