let express = require('express')
let mysql = require('mysql')
let app=express()
let port = 3600
let path=require('path')
let cors=require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))


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

app.use('/',require('./routes/root'))
app.use('/api',require('./routes/api/data'))



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
    if(err) throw err
    res.status(200).send(req.body)
})
    
})

app.all('/*',(req,res)=>{
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }
    else if(req.accepts('json')){
        res.json({"error":"404 Not Found"});
    
    }
    else{
        res.type('txt').send("404 Not Found");
    }
})

app.listen(port,()=>{
    console.log("server is running at the port",port)
})