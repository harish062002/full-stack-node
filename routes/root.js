let express = require('express')
let route = express().router

route.get('/',(req,res)=>{
    app.get('/operation(.html)?',(req,res)=>{

        res.sendFile(path.join(__dirname,'views','operation.html'))
    })
})
