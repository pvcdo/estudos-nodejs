const fs = require('fs')
//está importando fs de algum lugar

fs.readFile('./texto.txt','utf8',(err,data) =>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})