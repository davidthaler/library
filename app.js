let express = require('express')

let app = express()

app.get('/', function(req, res){
    res.send('Hello from the library app!')
})

app.listen(3000, function(){
    console.log('listening on port 3000')
})
