const passport = require('passport')
const {Strategy} = require('passport-local')
const { MongoClient } = require('mongodb')
const debug = require('debug')('app:local.strategy')

const dbName = 'libraryApp';
const url = 'mongodb://localhost:27017'

module.exports = function(){
    passport.use(new Strategy({
        usernameField: "username",
        passwordField: "password"
    }, async (username, password, done) => {
        let client
        try {
            client = await MongoClient.connect(url)
            debug('Connected to DB in local.strategy')
            const db = client.db(dbName)
            const coll = db.collection('users')
            const user = await coll.findOne({username})
            debug(user)
            if(user && user.password === password){
                done(null, user)
            }else{
                done(null, false)
            }
        } catch (error) {
            debug(error)
        }
        client.close()
    }))
}