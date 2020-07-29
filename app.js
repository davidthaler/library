let express = require('express')
let chalk = require('chalk')
let debug = require('debug')('app')
let morgan = require('morgan')
let path = require('path')

let app = express()
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.listen(3000, function(){
    debug(`listening on port ${chalk.green('3000')}`)
})
