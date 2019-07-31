import axios from 'axios'

console.log(process.env.NODE_ENV)

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : `http://${window.location.hostname}:5000/api`,

  withCredentials: true,
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service.get('/logout')
  },

  getProfile() {
    return service
      .get('/profile')
      .then(res => res.data)
      .catch(errHandler)
  },

  editProfile(uploadData) {
    return service
      .post('/profile', uploadData)
      .then(res => res.data)
      .catch(errHandler)
  },

  getMyRecipes() {
    return service
      .get('/recipes/my-recipes')
      .then(res => res.data)
      .catch(errHandler)
  },

  addRecipe(body) {
    return service
      .post('/recipes', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  addIngredients(recipeId) {
    return service
      .post(`recipes/${recipeId}/add-ingredients-to-my-list`)
      .then(res => res.data)
      .catch(errHandler)
  },

  getRecipe(recipeId) {
    return service
      .get(`/recipes/${recipeId}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  exploreRecipes() {
    return service
      .get('recipes/explore')
      .then(res => res.data)
      .catch(errHandler)
  },

  // NEW GIULIA
  editRecipe(recipeId, body) {
    return service
      .put(`recipes/my-recipes/${recipeId}`, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteRecipe(recipeId) {
    return service
      .delete(`recipes/my-recipes/${recipeId}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  forkRecipe(recipeId) {
    return service
      .post(`recipes/fork/${recipeId}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  getMyList() {
    return service
      .get('/my-list')
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteIngredient(ingredientKey) {
    return service
      .put(`/my-list/${ingredientKey}`)
      .then(res => res.data)
      .catch(errHandler)
  },

  // new new new new new new
  // listIngredients(recipeId) {
  //   return service
  //     .post(`recipes/list/${recipeId}`)
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

  uploadPicture(pictureFile) {
    const formData = new FormData()
    formData.append('picture', pictureFile)
    return service
      .post('/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}
