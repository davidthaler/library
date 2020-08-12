const express = require('express')
const {MongoClient, ObjectID} = require('mongodb')
const debug = require('debug')('app:bookRoutes')
const bookRouter = express.Router()

function router(nav){
    bookRouter.use((req, res, next) => {
        if(req.user){
            next()
        }else{
            res.redirect('/')
        }
    })
    bookRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017'
            // This semicolon is *required*.
            // Automatic semicolon insertion fails here.
            const dbName = 'libraryApp';
            (async function gomongo(){
                let client
                try {
                    client = await MongoClient.connect(url)
                    debug('Connected in book list...')
                    const db = client.db(dbName)
                    const coll = await db.collection('books')
                    const books = await coll.find().toArray()
                    debug(books)
                    res.render('bookListView', {nav, books})
                } catch (err) {
                    debug(err.stack)
                }
                client.close()
            }())
        })
    
    bookRouter.route('/:id')
        .get(async (req, res) => {
            const { id } = req.params
            const url = 'mongodb://localhost:27017'
            const dbName = 'libraryApp'
            let client
            try {
                client = await MongoClient.connect(url)
                debug('Connected in book view...')
                const db = client.db(dbName)
                const coll = await db.collection('books')
                const book = await coll.findOne({_id: ObjectID(id)})
                debug(book)
                res.render('bookView', {nav, book})
            }catch (err){
                debug(err)
            }
            client.close()
        })
    return bookRouter
}

module.exports = router