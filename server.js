let express = require('express')
let mysql = require('mysql')
let app=express()
let port = 3600
let path=require('path')
let cors=require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use('/',require('./routes/root'))
let connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"targetob"
})
connection.connect((err)=>{
    if(err) throw err
    console.log("Database Connected")
})



app.get('/operation(.html)?',(req,res)=>{

    res.sendFile(path.join(__dirname,'views','operation.html'))
})

app.get('/ratecard(.html)?',(req,res)=>{

    res.sendFile(path.join(__dirname,'views','ratecard.html'))
})

app.get('^/$|index(.html)?',(req,res)=>{

    res.sendFile(path.join(__dirname,'views','index.html'))
})


app.get('/operationlist(.html)?',(req,res)=>{
    let query='select * from tbloperation'
    connection.query(query,(err,result)=>{
        if(err) throw err
        res.json(result);
    })
})
app.get('/ratecardlist',(req,res)=>{
    let query='select operationname,rate_per_hour from tbloperation left join tblratecard on tbloperation.opid = tblratecard.opid'
    connection.query(query,(err,result)=>{
        if(err) throw err
        res.json(result)
    })
})
//show the  ratelist
app.get('/ratecardlistdis(.html)?',(req,res)=>{
   res.sendFile(path.join(__dirname,'views','ratecardlist.html'))
})
//show the operation table
app.get('/operationlistdis(.html)?',(req,res)=>{
res.sendFile(path.join(__dirname,'views','operationlist.html'))
}) 

// add new operation to the tbloperation
app.post('/operation',(req,res)=>{
let {operationname}=req.body
connection.query(`insert into tbloperation (operationname) values ("${operationname}") `,(err,result)=>{
    if(err) throw err
    res.status(200).send(req.body)
})

})

//post the values into tblratecard
app.post('/ratecard',(req,res)=>{
let {rateperhr,opname,id}=req.body
connection.query(`insert into tblratecard (rate_per_hour,opid) values (${rateperhr},${id})`,(err,result)=>{
    // insert into tblratecard (rate_per_hour,opid) values (200,2);
    if(err) throw err
    res.status(200).send(req.body)
})
    
})

app.listen(port,()=>{
    console.log("server is running at the port",port)
})