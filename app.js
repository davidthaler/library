const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('app')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({secret: 'Psszzzt!'}))
require('./src/config/passport.js')(app)
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

// set up the routers
const bookRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')(nav)
const authRouter = require('./src/routes/authRoutes')(nav)
app.use('/books', bookRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.render('index', {title: 'Library App', nav})
})

app.listen(port, () => {
    debug(`listening on localhost port ${chalk.green(port)}`)
})
