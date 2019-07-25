const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    required:true,
    ref: "User"
  },
  _originalRecipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  },
  name: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required:true,
  },
  ingredients: {
    quantity: {type: Number},
    unit: {type: String, enum:[ "gr", "ml", "l", "kg", "tbl", "tsp", "cup", "pinch", "n/a"] },
    item: {type: String, required: true}
  },
  image: {
    image: { type: String, default: "../../images/default-recipe-image.jpg"},
  },
  personcount: {
    type: {type: Number, default: 4}
  },
  duration: {
    type: String
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    },
})
const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe


// EXAMPLE (MAXENCE)
// {
//   _id: "r1",
//   _owner: "u1",
//   name: "Salmon",
//   description: "Lorem"
// }
// {
//   _id: "r2",
//   _owner: "u2",
//   _originalRecipe: "r1",
//   name: "Salmon from my grandmother",
//   description: "Lorem"
// }
