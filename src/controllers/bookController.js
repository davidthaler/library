const {MongoClient, ObjectID} = require('mongodb')
const debug = require('debug')('app:bookController')
const url = 'mongodb://localhost:27017'
const dbName = 'libraryApp'

function bookController(bookService, nav){

    function getIndex(req, res){
        // This semicolon is *required*.
        // Automatic semicolon insertion fails here.
        (async function gomongo(){
            let client
            try {
                client = await MongoClient.connect(url)
                debug('Connected in book controller...')
                const db = client.db(dbName)
                const coll = db.collection('books')
                const books = await coll.find().toArray()
                debug(books)
                res.render('bookListView', {nav, books})
            } catch (err) {
                debug(err.stack)
            }
            client.close()
        }())
    }

    async function getById(req, res) {
        const { id } = req.params
        let client
        try {
            client = await MongoClient.connect(url)
            debug('Connected in book controller...')
            const db = client.db(dbName)
            const coll = db.collection('books')
            const book = await coll.findOne({_id: ObjectID(id)})
            book.details = await bookService.getBookById(book.bookId)
            debug(book)
            res.render('bookView', {nav, book})
        }catch (err){
            debug(err)
        }
        client.close()
    }

    function middleware(req, res, next){
        if(req.user){
            next()
        }else{
            res.redirect('/')
        }
    }

    return {
        getIndex,
        getById,
        middleware
    }
}

module.exports = bookController
