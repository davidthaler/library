const express = require('express')
const {MongoClient} = require('mongodb')
const passport = require('passport')
const debug = require('debug')('app:authRoutes')

const dbName = 'libraryApp';
const url = 'mongodb://localhost:27017'

const authRouter = express.Router()
function router(nav){

    authRouter.route('/signup')
        .post(async (req, res) => {
            const {username, password} = req.body
            let client
            try {
                client = await MongoClient.connect(url)
                debug('Connected to server')
                const db = client.db(dbName)
                const coll = db.collection('users')
                const user = {username, password}
                const results = await coll.insertOne(user)
                debug(results)
                req.login(results.ops[0], () => {
                    res.redirect('/auth/profile')
                })
            } catch (error) {
                debug(err)
            }
        })
    authRouter.route('/signin')
        .get( (req, res) => {
            res.render('signin', {
                nav,
                title: 'Sign In'
            })
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }))

    authRouter.route('/profile')
        .all((req, res, next) => {
            if(req.user){
                next()
            }else{
                res.redirect('/')
            }
        })
        .get((req, res) => {
            res.json(req.user)
        })
    return authRouter
}

module.exports = router