const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema(
  {
    _owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    _originalRecipe: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        qtyPerPerson: { type: Number },
        qty: { type: Number },
        unit: {
          type: String,
          enum: [
            'gr',
            'kg',
            'ml',
            'l',
            'tbs',
            'tsp',
            'cup',
            'pinch',
            'cloves',
            'bunch',
            'cm',
            'units',
            'n/a',
          ],
        },
        item: {
          type: String,
          // required: true
        },
      },
    ],
    // ingredientsPerPerson: [
    //   {
    //     qty: { type: Number },
    //     unit: {
    //       type: String,
    //       enum: ['gr', 'ml', 'l', 'kg', 'tbs', 'tsp', 'cup', 'pinch', 'units'],
    //     },
    //     item: { type: String, required: true },
    //   },
    // ],
    picture: {
      type: String,
      default: '/images/default-recipe-image.jpg',
    },
    personcount: { type: Number },
    duration: { type: String },
    categories: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)
const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
