let express = require('express')
let path= require('path')
let route = express.Router()

   //dashbord    
    route.get('^/$|index(.html)?',(req,res)=>{

        res.sendFile(path.join(__dirname,'..','views','index.html'))
    })

    // add operation page
    route.get('/operation(.html)?',(req,res)=>{

        res.sendFile(path.join(__dirname,'..','views','operation.html'))
    })
    // add rate card page
    route.get('/ratecard(.html)?',(req,res)=>{

        res.sendFile(path.join(__dirname,'..','views','ratecard.html'))
    })

    // show the ratecard table
    route.get('/ratecardlistdis(.html)?',(req,res)=>{
        res.sendFile(path.join(__dirname,'..','views','ratecardlist.html'))
     })

    //show the operation table
    route.get('/operationlistdis(.html)?',(req,res)=>{
        res.sendFile(path.join(__dirname,'..','views','operationlist.html'))
    }) 
module.exports = route