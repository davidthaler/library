const passport = require('passport')
require('./strategies/local.strategy')()

module.exports = function(app){
    //Set-up
    app.use(passport.initialize())
    app.use(passport.session())

    //Store user in session; done() is a callback
    passport.serializeUser( (user, done) => {
        // Sig of done() is done(err, data). 
        // This stores full user in session.
        done(null, user)
    })

    //Get user from session
    passport.deserializeUser((user, done) => {
        // This works bc we stored the full user in session.
        // Normally, we would get an id and hit a DB here.
        done(null, user)
    })

}