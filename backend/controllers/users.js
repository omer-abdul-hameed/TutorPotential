const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.User.find({})
    .then(users => res.json(users))
})

router.get('/:id', (req, res) => {
    db.User.findById(req.params.id)
    .then(user => res.json(user))
})

router.post('/', (req, res) => {
    db.User.create(req.body)
    .then(user => {
        res.json(user)
    })
})

router.put('/:id', (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.id,
        req.body
    ).then(user => res.redirect(`/api/users/${user._id}`))
})

router.delete('/:id', (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
    .then(() => res.send('deleted id: ' + req.params.id))
})

module.exports = router