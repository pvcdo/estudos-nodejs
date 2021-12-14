const express = require('express')

const app = express()

const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../../../views')

router.get('/xocopinho',(rec,res) => {
    res.render(`${basePath}/xocopinho.handlebars`)
})

router.get('/nescau',(rec,res) => {
    res.render(`${basePath}/nescau.handlebars`)
})

router.get('/aleatorio',(rec,res) => {
    res.render(`${basePath}/aleatorio.handlebars`)
})

module.exports = router