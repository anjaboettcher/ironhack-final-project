const express = require('express')
const { isLoggedIn } = require('../middlewares')
const User = require('../models/User')
const Recipe = require('../models/Recipe')
const uploader = require('../configs/cloudinary.js')
const router = express.Router()

router.get('/profile', isLoggedIn, (req, res, next) => {
  let id = req.user.id
  console.log('request profile', id)
  User.findById(id)
    .then(user => {
      console.log('response profile', user)
      res.json(user)
    })
    .catch(err => next(err))
})

router.post(
  '/profile',
  isLoggedIn,
  uploader.single('image'),
  (req, res, next) => {
    console.log(req.user.id, req.body)

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

router.get('/my-list', isLoggedIn, (req, res, next) => {
  res.json(req.user.ingredients)
})

router.put('/my-list/:ingredientKey', isLoggedIn, (req, res, next) => {
  let key = req.params.ingredientKey
  req.user.ingredients.splice(key, 1)
  req.user.save().then(() => {
    res.json(req.user.ingredients)
  })

  //   res.json({
  //     message: 'The ingredient was successfully deleted',
  //     ingredients: req.user.ingredients,
  //   })
  // })
  // let userId = req.user.id
  // let ing = []
  // console.log('USER-ID', userId)
  // User.findById(userId).then(user => {
  //   console.log('ING1', ing)
  //   console.log('user.ingredients', user.ingredients)
  //   ing = [...user.ingredients]
  //   console.log('ING', ing)
  //   ing.splice(0, 1)
  //   console.log('ING2', ing)
  //   user
  //     .save()
  //     .then(() => {
  //       res.json(user, { message: 'The ingredient was successfully deleted' })
  //     })
  //     .catch(err => next(err))
  // })

  // console.log('TEST', ing)

  // User.findById(userId).then(user => {
  //   if (!recipe) {
  //     next({
  //       status: 400,
  //       message: 'There is no recipe with the _id = ' + recipeId,
  //     })
  //   } else if (recipe._owner.toString() !== req.user._id.toString()) {
  //     next({
  //       status: 403,
  //       message: 'You are have not the creator of this recipe',
  //     })
  //   } else {
  //     Recipe.findByIdAndDelete(ing).then(() => {
  //       res.json({ message: 'The recipe was successfully deleted' })
  //     })
  //   }
  // })
})

module.exports = router
