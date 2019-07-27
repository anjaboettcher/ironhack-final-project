const express = require('express')
const { isLoggedIn } = require('../middlewares')
const User = require('../models/User')
const uploader = require('../configs/cloudinary.js')
const router = express.Router()

router.put(
  '/profile',
  isLoggedIn,
  uploader.single('image'),
  (req, res, next) => {
    let userId = req.user.id
    let { username, email, password, image } = req.body
    if (req.file) image = req.file.secure_url

    User.findByIdAndUpdate(userId)
      .then(user => {
        user.username = username
        user.email = email
        user.password = password
        user.image = image
        user.save().then(() => {
          res.json(user)
        })
      })
      .catch(err => next(err))
  }
)

module.exports = router
