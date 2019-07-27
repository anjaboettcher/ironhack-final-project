const express = require('express')
const router = express.Router()
const Recipe = require('../models/Recipe')
const uploader = require('../configs/cloudinary.js')
const { isLoggedIn } = require('../middlewares')

router.get('/my-recipes', isLoggedIn, (req, res, next) => {
  let id = req.user.id
  Recipe.find({ _owner: id })
    .populate('_owner')
    .then(recipes => {
      res.json(recipes)
    })
    .catch(err => next(err))
})

router.get('/user-recipes/:userId', (req, res, next) => {
  let userId = req.params.userId
  Recipe.find({ _owner: userId })
    .populate('_owner')
    .then(recipe => {
      res.json(recipe)
    })
    .catch(err => next(err))
})

//we need to add a way to filter out your own recipes in the front-end!
router.get('/explore', (req, res, next) => {
  Recipe.find()
    .populate('_owner')
    .then(recipe => {
      res.json(recipe)
    })
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      if (!recipe) {
        next({ status: 400, message: "The recipe doesn't exist" })
        return // Stop the function
      } else res.json(recipe)
    })
    .catch(next)
})

router.post('/', isLoggedIn, uploader.single('picture'), (req, res, next) => {
  let _owner = req.user.id
  // for the _originalRecipe, I would make a new route that just updates this.ß
  let {
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
})

router.post('/:recipeId/fork', isLoggedIn, (req, res, next) => {
  Recipe.findById(req.params.recipeId).then(recipe => {
    if (!recipe) {
      next({ status: 400, message: "The recipe doesn't exist" })
      return // Stop the function
    }
    Recipe.create({
      _owner: req.user._id,
      _originalRecipe: recipe._id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      picture: recipe.picture,
      personcount: recipe.personcount,
      duration: recipe.duration,
      categories: recipe.categories,
    }).then(newRecipe => {
      res.json(newRecipe)
    })
  })
})

router.put('/:recipeId', isLoggedIn, (req, res, next) => {
  let recipeId = req.params.recipeId
  let {
    name,
    description,
    ingredients,
    // picture, // TODO later
    personcount,
    duration,
    categories,
  } = req.body
  Recipe.findById(recipeId).then(recipe => {
    if (String(recipe._owner) === String(req.user.id)) {
      recipe.name = name
      recipe.description = description
      recipe.ingredients = ingredients
      //recipe.picture = picture
      recipe.personcount = personcount
      recipe.duration = duration
      recipe.categories = categories
      recipe.save().then(() => {
        res.json(recipe)
      })
    } else {
      next({ status: 403, message: 'You are the wrong user' })
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
    } else if (recipe._owner.toString() !== req.user._id.toString()) {
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
