const express = require('express')
const bookRouter = express.Router()
const debug = require('debug')('app:bookroute')
const sql = require('mssql')

function router(nav){
    
    bookRouter.route('/')
        .get(async (req, res) => {
            const request = new sql.Request()
            const {recordset} = await request.query('SELECT * FROM books')
            res.render('bookListView', {nav, books: recordset})
        })
    
    bookRouter.route('/:id')
        .all(async (req, res, next) => {
            const { id } = req.params
            const request = new sql.Request()
            const {recordset} = await request
                                    .input('id', sql.Int, id)
                                    .query('SELECT * FROM books WHERE id=@id')
            req.book = recordset[0]
            next()
        })
        .get((req, res) => {
            res.render('bookView', {nav, book: req.book})
        })
    return bookRouter
}

module.exports = router