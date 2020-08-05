const express = require('express')
const bookRouter = express.Router()

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
        .get((req, res) => {
            res.render('bookListView', {nav, books})
        })
    
    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params
            let book = books.find(e => e.id == id)
            res.render('bookView', {nav, book})
        })
    return bookRouter
}

module.exports = router