const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

router.put('/profile', isLoggedIn, (req, res, next) => {
  // TODO: continue
})

module.exports = router
