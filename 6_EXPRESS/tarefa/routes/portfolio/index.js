const express = require('express');

const path = require('path');

const pagesPath = path.join(__dirname,'../../pages')

const route = express.Router()

route.get('/',(req,res)=>{
    res.sendFile(`${pagesPath}/portfolio.html`)
})

module.exports = route