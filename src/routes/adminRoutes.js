const express = require('express')
const {mongoClient, MongoClient} = require('mongodb')
const debug = require('debug')('app:adminRoutes')

const adminRouter = express.Router()
const books = [
    {
        bookId: 656,
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false,
    },
    {
        bookId: 24280,
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        id: 3,
        title: 'A Journey to the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        read: false
    }
]

function router(nav){
    const url = 'mongodb://localhost:27017'
    const dbName = 'libraryApp'
    adminRouter.route('/')
        .get(async (req, res) => {
            let client
            try {
                client = await MongoClient.connect(url)
                debug('Connected in admin routes...')
                const db = client.db(dbName)
                const response = await db.collection('books')
                                            .insertMany(books)
                res.json(response)
            } catch (err) {
                debug(err.stack)
            }
            client.close()
        })
    return adminRouter
}

module.exports = router
