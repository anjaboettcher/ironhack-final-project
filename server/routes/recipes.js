const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const uploader = require('../configs/cloudinary.js')

router.get('/explore', (req, res, next) => {
  Recipe.find()
    .then(recipe => {
      res.json(recipe)
    })
    .catch(err => next(err))
})

router.get('/', (req, res, next) => {
  let id = req.user.id
  Recipe.find({ _owner: id })
    .then(recipe => {
      res.json(recipe)
    })
    .catch(err => next(err))
})

// // Route: GET /api/street-arts
// router.get('/', (req, res, next) => {
//   StreetArt.find()
//     .then(streetArts =>
//       res.json(streetArts)
//     })
//     .catch(err => next(err))
// })

// // Route: GET /api/street-arts/:id
// router.get('/:id', (req, res, next) => {
//   StreetArt.findById(req.params.id)
//     .then(streetArt => {
//       res.json(streetArt)
//     })
//     .catch(next)
// })

module.exports = router
