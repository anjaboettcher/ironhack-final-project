export default {
  // Return an array of ingredients from localStorage
  getListIngredients() {
    let result = JSON.parse(localStorage.getItem('listIngredients'))
    if (!result) return []
    else return result
  },
  // Save an array of ingredients in localStorage
  setListIngredients(listIngredients) {
    localStorage.setItem('listIngredients', JSON.stringify(listIngredients))
  },
}
