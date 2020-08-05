const express = require('express')
const bookRouter = express.Router()
const debug = require('debug')('app:bookroute')
const sql = require('mssql')

function router(nav){
    const books = [
        {
            id: 1,
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false,
        },
        {
            id: 2,
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
    
    bookRouter.route('/')
        .get(async (req, res) => {
            const request = new sql.Request()
            const {recordset} = await request.query('SELECT * FROM books')
            res.render('bookListView', {nav, books: recordset})
        })
    
    bookRouter.route('/:id')
        .get(async (req, res) => {
            const { id } = req.params
            const request = new sql.Request()
            const {recordset} = await request
                                    .input('id', sql.Int, id)
                                    .query('SELECT * FROM books WHERE id=@id')
            let book = books.find(e => e.id == id)
            res.render('bookView', {nav, book: recordset[0]})
        })
    return bookRouter
}

module.exports = router