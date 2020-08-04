const express = require('express')
const bookRouter = express.Router()

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
        res.render('books', {books})
    })

bookRouter.route('/:id')
    .get((req, res) => {
        const { id } = req.params
        res.send(`Book id: ${id}`)
    })

module.exports = bookRouter