const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const uploader = require('../configs/cloudinary.js')
const { isLoggedIn } = require('../middlewares')

router.get('/my-recipes', isLoggedIn, (req, res, next) => {
  let id = req.user.id
  let name = req.user
  Recipe.find({ _owner: id })
    .then(recipe => {
      res.json(recipe)
    })
    .catch(err => next(err))
})

router.get('/my-recipes/:recipeId', isLoggedIn, (req, res, next) => {
  let id = req.user.id
  let name = req.user.name
  Recipe.findById(req.params.id)
    .then(recipe => {
      res.json(recipe)
    })
    .catch(next)
})

router.get('/explore', (req, res, next) => {
  Recipe.find()
    .populate('_owner')
    .then(recipe => {
      res.json(recipe)
    })
    .catch(err => next(err))
})

router.post(
  '/create-recipe',
  isLoggedIn,
  uploader.single('picture'),
  (req, res, next) => {
    // let _owner = req.user.id
    // for the _originalRecipe, I would make a new route that just updates this.ß
    let {
      _owner,
      _originalRecipe,
      name,
      description,
      ingredients,
      picture,
      personcount,
      duration,
      category,
    } = req.body
    Recipe.create({
      _owner,
      _originalRecipe,
      name,
      description,
      ingredients,
      picture,
      personcount,
      duration,
      category,
    })
      .then(recipe => {
        res.json({
          success: true,
          recipe,
        })
      })
      .catch(err => next(err))
  }
)

router.post('/editRecipe/:recipeId', (req, res, next) => {
  let recipeId = req.params.recipeId
  let {
    name,
    description,
    qty,
    unit,
    item,
    // picture,
    // personcount,
    // duration,
  } = req.body

  // let ingredients = []
  // for (let i = 0; i < item.length; i++) {
  //   ingredients.push({
  //     qty: qty[i],
  //     unit: unit[i],
  //     item: item[i],
  //   })
  // }

  let ingredients = [
    {
      qty: qty,
      unit: unit,
      item: item,
    },
  ]

  Recipe.findById(recipeId).then(recipe => {
    console.log('recipe._owner', recipe._owner)
    console.log('req.user.id', req.user.id)
    if (String(recipe._owner) === String(req.user.id)) {
      console.log('you are here')
      console.log('recipe.name', recipe.name)
      console.log('name', name)
      recipe.name = name
      recipe.description = description
      recipe.ingredients = ingredients
      //recipe.picture = picture
      //recipe.personcount = personcount
      //recipe.duration = duration
      res.json(recipe)
    } else {
      res.json({ message: 'You are the wrong user' })
    }
  })
})

router.delete('/my-recipes/:recipeId', isLoggedIn, (req, res, next) => {
  let recipeId = req.params.recipeId
  Recipe.findById(recipeId).then(recipe => {
    if (!recipe) {
      next({
        status: 400,
        message: 'There is no recipe with the _id = ' + recipeId,
      })
    } else if (recipe._user.toString() !== req.user._id.toString()) {
      next({
        status: 403,
        message: 'You are have not created this recipe',
      })
    } else {
      Recipe.findByIdAndDelete(recipeId).then(() => {
        res.json({ message: 'The recipe was successfully deleted' })
      })
    }
  })
})

router.delete('/my-recipes/:recipeId', isLoggedIn, (req, res, next) => {
  let recipeId = req.params.recipeId
  Recipe.findById(recipeId).then(recipe => {
    if (!recipe) {
      next({
        status: 400,
        message: 'There is no recipe with the _id = ' + recipeId,
      })
    } else if (recipe._user.toString() !== req.user._id.toString()) {
      next({
        status: 403,
        message: 'You are have not created this recipe',
      })
    } else {
      Recipe.findByIdAndDelete(recipeId).then(() => {
        res.json({ message: 'The recipe was successfully deleted' })
      })
    }
  })
})

module.exports = router
