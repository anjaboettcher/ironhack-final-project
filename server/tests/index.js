process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = 'mongodb://localhost/project3-test'

//Require the dev-dependencies
const bcrypt = require('bcrypt')
const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../bin/www')
const Recipe = require('../models/Recipe')
const User = require('../models/User')

const bcryptSalt = 10
chai.should()

let userDocs = [
  new User({
    email: 'alice@gmail.com',
    username: 'alice',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
    role: 'admin',
  }),
  new User({
    email: 'bob@gmail.com',
    username: 'bob',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
    isValidated: true,
  }),
]

chai.use(chaiHttp)

//Our parent block
describe('MVP Tests', () => {
  beforeEach(done => {
    Promise.all([Recipe.deleteMany(), User.deleteMany()]).then(() => {
      done()
    })
  })
  afterEach(() => {})

  describe('Simple test', () => {
    it('should succeed', done => {
      done()
    })
  })

  describe('POST /api/signup', () => {
    it('should be able to signup', done => {
      chai
        .request(server)
        .post('/api/signup')
        .send({
          email: 'maxence@ironhack.com',
          username: 'maxence',
          password: 'maxence',
        })
        .end((err, res) => {
          res.should.have.status(200)
          User.find().then(users => {
            users.length.should.be.eql(1)
            users[0].email.should.be.eql('maxence@ironhack.com')
            users[0].username.should.be.eql('maxence')
            done()
          })
        })
    })
  })
})
