const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Recipe = require('../models/Recipe')
const bcryptSalt = 10

require('../configs/database')

let users = [
  new User({
    username: 'alice',
    email: 'alice@gmail.com',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
  }),
  new User({
    username: 'bob',
    email: 'bob@gmail.com',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
  }),
]

let recipes = [
  new Recipe({
    _owner: users[0]._id,
    name: 'Spaghetti Carbonara',
    description:
      "Put a large pot of salted water on to boil. While the water is coming to a boil, heat the olive oil in a large sauté pan over medium heat. Add the bacon or pancetta and cook slowly until crispy. In a small bowl, beat the eggs and mix in about half of the cheese. Once the water has reached a rolling boil, add the dry pasta, and cook, uncovered, at a rolling boil. When the pasta is al dente (still a little firm, not mushy), use tongs to move it to the bowl with the bacon. Let it be dripping wet. Reserve some of the pasta water. Move the pasta from the pot to the bowl quickly, as you want the pasta to be hot. It's the heat of the pasta that will heat the eggs sufficiently to create a creamy sauce. Add the beaten eggs with cheese and toss quickly to combine once more. Add salt to taste. Add some pasta water back to the pasta to keep it from drying out. Serve at once with the rest of the parmesan and freshly ground black pepper. Enjoy!",
    ingredients: [
      { qtyPerPerson: 100, qty: 200, unit: 'gr', item: 'pancetta' },
      { qtyPerPerson: 1, qty: 2, item: 'eggs' },
      { qtyPerPerson: 100, qty: 200, unit: 'gr', item: 'pasta' },
      { qtyPerPerson: 100, qty: 200, unit: 'gr', item: 'parmesan' },
      { qtyPerPerson: 250, qty: 500, unit: 'ml', item: 'water' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'pinch', item: 'black pepper' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'tbs', item: 'olive oil' },
    ],
    // ingredientsPerPerson: [
    //   { qty: 100, unit: 'gr', item: 'pancetta' },
    //   { qty: 1, item: 'eggs' },
    //   { qty: 100, unit: 'gr', item: 'pasta' },
    //   { qty: 100, unit: 'gr', item: 'parmesan' },
    //   { qty: 250, unit: 'ml', item: 'water' },
    //   { qty: 0.5, unit: 'pinch', item: 'black pepper' },
    //   { qty: 0.5, unit: 'tbs', item: 'olive oil' },
    // ],
    picture: '/images/carbonara.jpg',
    personcount: 2,
    duration: '30 minutes',
    categories: ['Pasta', 'Pork'],
  }),
  new Recipe({
    _owner: users[0]._id,
    name: 'Algarve Tomato Mint Salad',
    description:
      'Dice the tomatoes (for this fresh salad, the cuts may be uneven). Halve the onions and cut into thin slices. Mix everything together and season generously with good olive oil, salt, dried oregano, fresh cilantro, and fresh mint.',
    ingredients: [
      { qtyPerPerson: 250, qty: 1000, unit: 'gr', item: 'tomatoes' },
      { qtyPerPerson: 0.5, qty: 2, item: 'onions' },
      { qtyPerPerson: 0.25, qty: 1, item: 'dried oregano' },
      { qtyPerPerson: 0.25, qty: 1, item: 'fresh mint' },
      { qtyPerPerson: 0.25, qty: 1, item: 'fresh cilandro' },
      { qtyPerPerson: 50, qty: 200, unit: 'gr', item: 'parmesan' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'pinch', item: 'Fleur de Sel' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'tbs', item: 'olive oil' },
    ],
    // ingredientsPerPerson: [
    //   { qty: 250, unit: 'g', item: 'tomatoes' },
    //   { qty: 0.5, item: 'onions' },
    //   { qty: 0.25, item: 'dried oregano' },
    //   { qty: 0.25, item: 'fresh mint' },
    //   { qty: 0.25, item: 'fresh cilandro' },
    //   { qty: 50, unit: 'gr', item: 'parmesan' },
    //   { qty: 0.25, unit: 'pinch', item: 'Fleur de Sel' },
    //   { qty: 0.25, unit: 'tbs', item: 'olive oil' },
    // ],
    picture: '/images/alvgarve-mint-salad.jpg',
    personcount: 4,
    duration: '20 minutes',
    categories: ['Salads'],
  }),
]

recipes.push(
  new Recipe({
    _owner: users[1]._id,
    name: 'Spaghetti Carbonara Vegetarian',
    description:
      "Put a large pot of salted water on to boil. While the water is coming to a boil, heat the olive oil in a large sauté pan over medium heat. Add the tofu and cook slowly until crispy. In a small bowl, beat the eggs and mix in about half of the cheese. Once the water has reached a rolling boil, add the dry pasta, and cook, uncovered, at a rolling boil. When the pasta is al dente (still a little firm, not mushy), use tongs to move it to the bowl with the bacon. Let it be dripping wet. Reserve some of the pasta water. Move the pasta from the pot to the bowl quickly, as you want the pasta to be hot. It's the heat of the pasta that will heat the eggs sufficiently to create a creamy sauce. Add the beaten eggs with cheese and toss quickly to combine once more. Add salt to taste. Add some pasta water back to the pasta to keep it from drying out. Serve at once with the rest of the parmesan and freshly ground black pepper. Enjoy!",
    ingredients: [
      { qty: 200, unit: 'gr', item: 'tofu' },
      { qty: 2, item: 'eggs' },
      { qty: 200, unit: 'gr', item: 'pasta' },
      { qty: 200, unit: 'gr', item: 'parmesan' },
      { qty: 500, unit: 'ml', item: 'water' },
      { qty: 1, unit: 'pinch', item: 'black pepper' },
      { qty: 1, unit: 'tbs', item: 'olive oil' },
    ],
    picture: '/images/vegan-spaghetti-carbonara.jpg',
    personcount: 2,
    duration: '30 minutes',
    categories: ['Vegetarian'],
  })
)

Promise.all([User.deleteMany(), Recipe.deleteMany()])
  .then(() => {
    console.log('All users and recipes have been deleted')
    return Promise.all([User.create(users), Recipe.create(recipes)])
  })
  .then(() => {
    console.log(`${users.length} users created`)
    console.log(`${recipes.length} recipes created`)

    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

// Recipe.deleteMany()
//   .then(() => {
//     return Recipe.create(recipes)
//   })
//   .then(recipesCreated => {
//     console.log(`${recipesCreated.length} users created with the following id:`)
//     console.log(recipesCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })

// User.deleteMany()
//   .then(() => {
//     return User.create(users)
//   })
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`)
//     console.log(usersCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })
