const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
    password: String,
    image: { type: String, default: '/images/default-image-cook.png' },
    ingredients: [
      {
        qty: { type: Number },
        unit: {
          type: String,
          //   enum: ['gr', 'ml', 'l', 'kg', 'tbs', 'tsp', 'cup', 'pinch', 'units'],
        },
        item: { type: String, required: true },
        checked: { type: Boolean, default: false },
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

const User = mongoose.model('User', userSchema)
module.exports = User
