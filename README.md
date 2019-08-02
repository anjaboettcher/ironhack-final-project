<!-- ![logo_feed_your_plant](https://i.postimg.cc/MTnPBYQN/plantreminder.png) -->

# Forkify!

[Link to Heroku](https://foodifyproject.herokuapp.com)

## Our project: recipe book

Foodify is for food lovers.
It is a social recipe book.
Follow your friends and explore the recipe database to see what your friends have been cooking lately.
Create and save new recipe and add ingredients to your shopping list.
All in one place.

## Possible improvements

1. A way to avoid food wasting.
2. A potential connection with supermarkets and the possibility to buy online the ingredients.
3. Have a personal inventory of the food in your fridge.
4. Improve the social aspects, with the possibility of visiting other people's profile.
5. Text-scanning of recipes written on books.

## Technologies and tools

1. JavaScript (ES6), Node.js, React
2. HTML, CSS (Bootstrap and Reactstrap)
3. Passport
4. MongoDB, Mongoose
5. Postman
6. Multer, Cloudinary

Thanks for reading
:fork_and_knife:
_Anja, Giulia and Seb_

## Useful info

### To run the project

To execute the seeds file, run from the root of the project:

```
$ node bin/seeds.js
```

And then, in two different consoles, from the root of the project:

```
$ npm run dev:server
$ npm run dev:client
```

### Deploy Heroku

```
$ git push heroku master
```

In the console of Heroku:

```
$ node bin/seeds.js
```
