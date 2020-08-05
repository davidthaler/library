const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('app')
const morgan = require('morgan')
const path = require('path')
const sql = require('mssql')

const app = express()
const port = process.env.PORT || 3000
const config = {
    user: 'pluralsightuser',
    password: 'zaEYiNK9H38T4Dg',
    server: 'pluralsightsqlserver.database.windows.net', 
    database: 'PluralsightDB',
}
sql.connect(config).catch(err => debug(err))

app.use(morgan('tiny'))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
))
app.use('/js', express.static(
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')
))
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')))
app.set('views', './src/views')
app.set('view engine', 'ejs')

const nav= [
    {title: 'Home', link:'/'},
    {title: 'Books', link: '/books'},
    {title: 'Authors', link: '/authors'}
]

const bookRouter = require('./src/routes/bookRoutes')(nav)
app.use('/books', bookRouter)

app.get('/', (req, res) => {
    res.render('index', {title: 'Library App', nav})
})

app.listen(port, () => {
    debug(`listening on localhost port ${chalk.green(port)}`)
})
