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
    username: 'bob',
    email: 'bob@gmail.com',
    password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
    image: '/images/user_stan_bob.jpg',
  }),
  new User({
    username: 'alice',
    email: 'alice@gmail.com',
    password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
    image: '/images/user_alice_career.jpg',
  }),
  new User({
    username: 'Jamie Oliver',
    email: 'jamie@gmail.com',
    password: bcrypt.hashSync('jamie', bcrypt.genSaltSync(bcryptSalt)),
    image: '/images/user_jamie_oliver.jpg',
  }),
  new User({
    username: 'mum',
    email: 'mum@gmail.com',
    password: bcrypt.hashSync('mum', bcrypt.genSaltSync(bcryptSalt)),
    image: '/images/user_mum.jpg',
  }),
  new User({
    username: 'seb',
    email: 'smorelle14@gmail.com',
    password: bcrypt.hashSync('seb', bcrypt.genSaltSync(bcryptSalt)),
    image: '/images/seb2.jpg',
  }),
]

let recipes = [
  new Recipe({
    _owner: users[0]._id, // Alice
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
    picture: '/images/carbonara.jpg',
    personcount: 2,
    duration: '30 minutes',
    categories: ['Pasta', 'Pork'],
  }),
  new Recipe({
    _owner: users[0]._id, // Alice
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
    picture: '/images/alvgarve-mint-salad.jpg',
    personcount: 4,
    duration: '20 minutes',
    categories: ['Salads'],
  }),
  new Recipe({
    _owner: users[1]._id, // Bob
    name: 'Spaghetti Carbonara Vegetarian',
    description:
      "Put a large pot of salted water on to boil. While the water is coming to a boil, heat the olive oil in a large sauté pan over medium heat. Add the tofu and cook slowly until crispy. In a small bowl, beat the eggs and mix in about half of the cheese. Once the water has reached a rolling boil, add the dry pasta, and cook, uncovered, at a rolling boil. When the pasta is al dente (still a little firm, not mushy), use tongs to move it to the bowl with the bacon. Let it be dripping wet. Reserve some of the pasta water. Move the pasta from the pot to the bowl quickly, as you want the pasta to be hot. It's the heat of the pasta that will heat the eggs sufficiently to create a creamy sauce. Add the beaten eggs with cheese and toss quickly to combine once more. Add salt to taste. Add some pasta water back to the pasta to keep it from drying out. Serve at once with the rest of the parmesan and freshly ground black pepper. Enjoy!",
    ingredients: [
      { qtyPerPerson: 100, qty: 200, unit: 'gr', item: 'tofu' },
      { qtyPerPerson: 1, qty: 2, item: 'eggs' },
      { qtyPerPerson: 100, qty: 200, unit: 'gr', item: 'pasta' },
      { qtyPerPerson: 100, qty: 200, unit: 'gr', item: 'parmesan' },
      { qtyPerPerson: 250, qty: 500, unit: 'ml', item: 'water' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'pinch', item: 'black pepper' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'tbs', item: 'olive oil' },
    ],
    picture: '/images/vegan-spaghetti-carbonara.jpg',
    personcount: 2,
    duration: '30 minutes',
    categories: ['Vegetarian', 'Pasta'],
  }),
  new Recipe({
    _owner: users[2]._id, // Jamie Oliver
    name: 'Broccoli & anchovy orecchiette',
    description: `Using a small knife, trim round the broccoli to remove the dark green florets from the main stalks and put them to one side. Peel the stalks, trim off the dry end and throw this away. Peel and chop the garlic.
    Finely chop the broccoli stalk and put into a large pan with the garlic, anchovies and half the butter. Crumble in the chilli, cover with a lid and cook slowly for 8 to 10 minutes while you cook the pasta in boiling salted water according to the packet instructions.
    Something I like to do which is slightly different (but better, I’d like to think) is to cook the broccoli florets with the pasta for the last 4 minutes – this makes them soft enough to eat but leaves them with great colour and texture.
    Drain the pasta and broccoli, saving a little of the cooking water, then toss into the other pan. Remove the pan from the heat.
    Season to taste with sea salt, black pepper, the rest of the butter and finely grate in a large handful of Parmesan. Mix well, adding a little of the cooking water, to loosen, if needed, and make it shine.
    Serve immediately, sprinkling with another good handful of finely grated Parmesan.`,
    ingredients: [
      { qtyPerPerson: 0.3, qty: 2, unit: 'units', item: 'broccoli' },
      { qtyPerPerson: 1, qty: 2, item: 'garlic' },
      { qtyPerPerson: 8 / 6, qty: 8, unit: 'gr', item: 'anchovy fillets' },
      { qtyPerPerson: 4 / 6, qty: 4, unit: 'tsp', item: 'butter' },
      {
        qtyPerPerson: 4 / 6,
        qty: 4,
        unit: 'units',
        item: 'dried red chillies',
      },
      { qtyPerPerson: 450 / 6, qty: 450, unit: 'pinch', item: 'black pepper' },
      { qtyPerPerson: 1, qty: 1, unit: 'units', item: 'parmesan cheese' },
    ],
    picture: '/images/pastaBroccoli.webp',
    personcount: 6,
    duration: '20 minutes',
    categories: ['Vegetarian', 'Brunch', 'Pasta', 'Italian'],
  }),

  new Recipe({
    _owner: users[2]._id, // Jamie Oliver
    name: 'Chicken noodle stir-fry',
    description: `Pick the coriander leaves and finely slice the stalks, then keep aside for later. Peel and finely slice the garlic, then peel and matchstick the ginger.
    Trim and finely slice the spring onions, deseed and finely slice the chilli and cut the lime into wedges. Trim, peel and thinly slice the carrots at an angle.
    Cut the broccoli into small florets, then finely shred the stalk, discarding any gnarly bits. Cut the chicken into 1cm strips.
    Cook the noodles according to packet instructions, then drain and refresh under cold water. Drain again, toss in a little oil and put to one side. Lightly toast the cashew nuts in a non-stick frying pan until golden, then tip onto a plate to cool.
    Heat 1 tablespoon of vegetable oil in a large frying pan or wok. Season the chicken with a pinch of pepper, then add to the pan and stir-fry for 2 to 3 minutes, or until golden. Add the coriander stalks, garlic and ginger and cook for a further minute.
    Add the spring onions, carrots and broccoli and stir-fry for a further 2 minutes, then add the cooked noodles. Keep stir-frying until the noodles are warm and the chicken is cooked through. Stir through the soy and fish sauces, then remove from the heat.
    Divide between bowls, sprinkle over the nuts, sliced chilli and the reserved coriander leaves, then serve with the lime wedges for squeezing over.`,
    ingredients: [
      { qtyPerPerson: 0.125, qty: 0.5, unit: 'bunch', item: 'coriander' },
      { qtyPerPerson: 0.75, qty: 3, unit: 'units', item: 'garlic' },
      { qtyPerPerson: 1.25, qty: 5, unit: 'cm', item: 'ginger' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'bunch', item: 'spring onions' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'units', item: 'red chilli' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'units', item: 'lime' },
      { qtyPerPerson: 0.5, qty: 2, unit: 'units', item: 'carrots' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'units', item: 'broccoli' },
      { qtyPerPerson: 0.5, qty: 2, unit: 'units', item: 'chicken breasts' },
      { qtyPerPerson: 62.5, qty: 250, unit: 'gr', item: 'egg noodles' },
      { qtyPerPerson: 12.5, qty: 50, unit: 'gr', item: 'cashew nuts' },
      { qtyPerPerson: 1.5, qty: 6, unit: 'tsp', item: 'vegetable oil' },
      { qtyPerPerson: 1.5, qty: 6, unit: 'pinch', item: 'black pepper' },
      { qtyPerPerson: 0.5, qty: 2, unit: 'tsp', item: 'soy sauce' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'tsp', item: 'fish sauce' },
    ],
    picture: '/images/JamieNoodles.webp',
    personcount: 4,
    duration: '40 minutes',
    categories: ['Vegetarian', 'Noodles', 'Brunch'],
  }),
  new Recipe({
    _owner: users[2]._id, // Jamie Oliver
    name: 'Asian chicken rice balls & broth',
    description: `Cook the rice according to the packet instructions. Drain and leave to cool, then chill until needed.
    Pick half of the coriander leaves, pop them in a bowl of ice-cold water and set aside. Put the remaining leaves in a food processor along with the cooled rice.
    Thinly slice the spring onions. Roughly chop the chicken, bash and roughly chop the lemongrass, then peel and roughly chop the ginger. Peel the garlic.
    Place it all into the food processor with the kaffir lime leaves (remove the stems) and pulse until smooth.
    Tip the mixture onto a board. With wet hands, divide it into 16 pieces and roll each into a ball. Place them on a plate and chill, covered, until needed.
    Place a large casserole pan over a medium-high heat and add a splash of sunflower oil. Fry the rice balls for 5 minutes, or until golden brown all over.
    Peel the prawns, using a sharp knife to remove any black bits, then add to the pan and stir-fry for 1 minute. Stir in the miso paste and pour in 1.2 litres of boiling water. Simmer for 10 minutes.
    Cut each pak choi into 6 pieces, then halve the mangetout lengthways. Add them to the pan for the last 2 minutes. Stir in the beansprouts for the last 30 seconds and season with a splash of soy sauce.
    Thinly slice the remaining spring onions and finely slice the chilli. Divide the broth, balls, veg and prawns between four warmed bowls. Sprinkle over the spring onions, chilli and drained coriander and serve immediately with lime wedges.`,
    ingredients: [
      { qtyPerPerson: 32.5, qty: 130, unit: 'gr', item: 'brown rice' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'bunch', item: 'coriander' },
      { qtyPerPerson: 1.5, qty: 6, unit: 'units', item: 'spring onions' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'units', item: 'lemongrass stick' },
      { qtyPerPerson: 1.25, qty: 5, unit: 'cm', item: 'ginger' },
      { qtyPerPerson: 0.5, qty: 2, unit: 'units', item: 'garlic clove' },
      { qtyPerPerson: 1, qty: 4, unit: 'units', item: 'lime leaves' },
      { qtyPerPerson: 1, qty: 4, unit: 'tbs', item: 'sunflower oil' },
      { qtyPerPerson: 2, qty: 8, unit: 'units', item: 'king prawns' },
      { qtyPerPerson: 0.625, qty: 2.5, unit: 'tbs', item: 'miso paste' },
      { qtyPerPerson: 0.5, qty: 2, unit: 'units', item: 'pak choi' },
      { qtyPerPerson: 62.5, qty: 250, unit: 'gr', item: 'mangetout' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'bunch', item: 'beansprouts' },
      { qtyPerPerson: 1, qty: 4, unit: 'tbs', item: 'soy sauce' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'units', item: 'red chilli' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'units', item: 'lime' },
    ],
    picture: '/images/asianGreenSoap.webp',
    personcount: 4,
    duration: '45 minutes',
    categories: ['Vegetarian'],
  }),
  new Recipe({
    _owner: users[2]._id, // Jamie Oliver
    name: 'Chocolate & salted caramel cake',
    description: `Preheat the oven to 200C/180C Fan/Gas 6. Grease and line two 20cm/8in round cake tins with baking paper.
    Place the flour, cocoa, sugar, eggs, milk, butter, melted dark chocolate and vanilla in a large bowl and whisk until smooth.
    Evenly divide the mixture between the tins and bake for 35–40 minutes, or until cooked through and a skewer inserted into the middle of each cake comes out clean. Leave to cool slightly in the tins before turning out onto wire racks to cool completely.
    Place the soured cream and melted milk chocolate in a large bowl. Stir to combine and refrigerate for 10 minutes, or until the ganache is a firm, spreadable consistency.
    Place one of the cakes on a cake stand or plate and trim the top so it is flat. Spread the top of the cake with half of the ganache. Top with the remaining cake and cover the top of that cake with the rest of the ganache. Sprinkle the salt over the top of the cake.`,
    ingredients: [
      { qtyPerPerson: 37.5, qty: 375, unit: 'gr', item: 'self-raising flour' },
      { qtyPerPerson: 0.5, qty: 50, unit: 'gr', item: 'cocoa powder' },
      { qtyPerPerson: 32.5, qty: 325, unit: 'gr', item: 'castar sugar' },
      { qtyPerPerson: 0.4, qty: 4, unit: 'units', item: 'eggs' },
      { qtyPerPerson: 37.5, qty: 375, unit: 'ml', item: 'milk' },
      { qtyPerPerson: 25, qty: 250, unit: 'gr', item: 'butter' },
      { qtyPerPerson: 20, qty: 200, unit: 'gr', item: 'dark chocolate' },
      { qtyPerPerson: 0.2, qty: 2, unit: 'tsp', item: 'vanilla extract' },
      { qtyPerPerson: 25, qty: 250, unit: 'gr', item: 'soured cream' },
      { qtyPerPerson: 40, qty: 400, unit: 'gr', item: 'milk chocolate' },
      { qtyPerPerson: 0.2, qty: 2, unit: 'tsp', item: 'sea salt' },
    ],
    picture: '/images/JamieOlliverChocolateCake.jpg',
    personcount: 10,
    duration: '30 minutes',
    categories: ['Desserts'],
  }),
  new Recipe({
    _owner: users[0]._id, // Alice
    name: 'Chilean Sea Bass with Lemon Parmesan Cream Sauce',
    description: `Begin by seasoning the sea bass on both sides with sea salt, black pepper and Creole seasoning and set to the side.
    Pre-heat cooking pan to medium heat and add butter. Once the butter melts, add minced garlic and cook garlic for 1 minute. Add the spinach and pour 1/4 cup of heavy cream over the spinach. Cook spinach just until it begins to wilt but do not over cook. Remove from heat.
    Tear 2 large pieces of foil and add half of the slightly cooked spinach in the center of each sheet. Place the sea bass over the spinach and seal the foil together so the fish can steam.
    Pre-heat oven to 400 degrees and cook the fish for 12 minutes within the foil on a baking sheet to prevent leakage. Set to the side when done.
    While the fish is cooking, pre-heat separate cooking pan to medium heat and add butter. Once the butter melts, add flour, minced garlic and allow to cook for 1 to 2 minutes. Add wine and chicken broth and cook for 3 minutes. Add the heavy whipping cream, parmesan cheese, garlic powder, oregano, black pepper and sea salt.
    Zest the skin of the lemon into the sauce and slice the lemon in half and squeeze both halves of juice into the sauce. Cook on low/medium heat until it binds together.
    Remove the cooked fish and spinach from the foil. Pour on the sauce. Serve hot.`,
    ingredients: [
      { qtyPerPerson: 225, qty: 450, unit: 'gr', item: 'SeaBass' },
      { qtyPerPerson: 170, qty: 340, unit: `gr`, item: 'Fresh Spinach' },
      {
        qtyPerPerson: 1 / 8,
        qty: 1 / 4,
        unit: 'cup',
        item: 'Heavy Whipping Cream',
      },
      { qtyPerPerson: 1, qty: 2, unit: 'tsp', item: 'Minced Garlic' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'tsp', item: 'BlackPepper' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'tsp', item: 'CreoleSeasoning' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'tbs', item: 'Salt' },
      { qtyPerPerson: 1, qty: 2, unit: 'tbs', item: 'Butter' },
      { qtyPerPerson: 100, qty: 200, unit: 'ml', item: 'Lemon Parmesan Sauce' },
    ],
    picture: '/images/Sea_Bass.jpg',
    personcount: 2,
    duration: '15 minutes',
    categories: ['Fish', 'Seefood'],
  }),
  new Recipe({
    _owner: users[0]._id, // Jamie Oliver
    name: 'Smoked Salmon and Asparagus Linguine',
    description: `Cook pasta according to directions, Place asparagus in a dish with a small amount of water, cover and microwave on high for 2 minutes. Cut asparagus into pieces. Place cream and chives in frying pan and bring to a gentle simmer, stirring.
    Add salmon and asparagus, and warm. Fold sauce through pasta and serve with a salad.`,
    ingredients: [
      { qtyPerPerson: 75, qty: 300, unit: 'gr', item: 'linguine pasta' },
      { qtyPerPerson: 3, qty: 12, unit: 'units', item: 'asparagus' },
      { qtyPerPerson: 0.1875, qty: 3 / 4, unit: 'cup', item: 'light cream' },
      { qtyPerPerson: 1, qty: 4, unit: 'tbs', item: 'fresh chives' },
      { qtyPerPerson: 50, qty: 200, unit: 'gr', item: 'smoked salmon' },
    ],
    picture: '/images/spagetiSalmon.jpg',
    personcount: 4,
    duration: '25 minutes',
    categories: ['Pasta', 'Seefood'],
  }),
  new Recipe({
    _owner: users[0]._id, // Jamie Oliver
    name: 'Grilled salmon with avocado, feta and pumpkin seeds',
    description: `Preheat your grill to maximum. Drizzle a little olive oil over the skin side of the salmon, place on the grill pan or a baking tray and slide under the hot grill. Cook for 6 minutes on the skin side, before carefully flipping and grilling for a further 4 minutes. 
    Turn the grill off and leave the salmon to keep warm until you’re ready to eat. While the salmon is cooking, tip the pumpkin seeds into a dry frying pan and toast over a high heat for about 2 minutes, or until they start turning brown and popping. Season with a little salt and leave in the pan. 
    Using the back of a fork, break up the avocado in a bowl. Add the onion, sesame oil and coriander. Mix the whole lot together until the ingredients are well combined. 
    Slide your salmon on to a plate, removing the skin as you go. Pile up the guacamole, slice and scatter over the feta, and finish with the toasted pumpkin seeds, a pile of watercress and a squeeze of lime juice, if using.`,
    ingredients: [
      { qtyPerPerson: 2, qty: 2, unit: 'tbs', item: 'olive oil' },
      { qtyPerPerson: 2, qty: 2, unit: 'tbs', item: 'pumpkin seeds' },
      { qtyPerPerson: 1, qty: 1, unit: 'pinch', item: 'salt' },
      { qtyPerPerson: 1, qty: 1, unit: 'units', item: 'avacado' },
      { qtyPerPerson: 1 / 4, qty: 1 / 4, unit: 'units', item: 'red onion' },
      { qtyPerPerson: 2, qty: 2, unit: 'tsp', item: 'sesame oil' },
      { qtyPerPerson: 1, qty: 1, unit: 'tbs', item: 'chopped coriander' },
      { qtyPerPerson: 40, qty: 40, unit: 'gr', item: 'feta' },
      { qtyPerPerson: 1, qty: 1, unit: 'bunch', item: 'watercress' },
      { qtyPerPerson: 1, qty: 1, unit: 'units', item: 'lime' },
    ],
    picture: '/images/salmonSalad.jpg',
    personcount: 1,
    duration: '15 minutes',
    categories: ['Salads', 'Seefood'],
  }),
  new Recipe({
    _owner: users[3]._id, // Mum
    name: 'Summer Zucchini Bolognese',
    description: `Gently heat up the olive oil in a heavy-bottomed pan. Add the diced onion and sauté on a low heat until translucent, stirring frequently.
    Meanwhile, if using fresh tomatoes, remove the skins by making a shallow cris-cross incision at the top of each tomato and plunging them into a pot with boiling water for a few seconds. Chop the peeled tomatoes quite finely.
    Add chopped garlic to the onion and sauté for another 2-3 minutes. Finally add the diced red pepper. Sauté, stirring frequently, for another 5 minutes or so.
    Coat the onion / garlic / pepper mixture in nutmeg, smoked paprika, chilli flakes and dry thyme.
    Add the tomatoes and about a cup (240 ml) of liquid (water or stock + a splash of wine works well too).
    Simmer on a medium heat until the tomatoes fully break down and all of the excess moisture cooks out. If the sauce gets dry, but the tomatoes are still very chunky, add a bit more liquid and carry on simmering. Remember to give the sauce a good stir from time to time.
    Once the sauce has reduced, season and add grated zucchini. Simmer the sauce with the zucchini for another 5-10 minutes. Taste and adjust the seasoning – I like to under-season slightly and top my pasta with chopped capers at the end (which adds a bit more saltiness).
    Stir the cooked pasta into the sauce, top with chopped walnuts and capers.`,
    ingredients: [
      { qtyPerPerson: 1, qty: 2, unit: 'tsp', item: 'olive oil' },
      { qtyPerPerson: 0.25, qty: 1 / 2, unit: 'units', item: 'onion' },
      { qtyPerPerson: 200, qty: 400, unit: 'gr', item: 'chopped tomatoes' },
      { qtyPerPerson: 1, qty: 2, unit: 'cloves', item: 'garlic' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'units', item: 'grated nutmeg' },
      { qtyPerPerson: 0.125, qty: 0.25, unit: 'tsp', item: 'smoked paprika' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'pinch', item: 'chilli flakes' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'pinch', item: 'dry thyme' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'units', item: 'courgette' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'pinch', item: 'salt' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'pinch', item: 'black pepper' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'tbs', item: 'capers' },
      { qtyPerPerson: 1, qty: 2, unit: 'tbs', item: 'dry-roasted walnuts' },
      { qtyPerPerson: 125, qty: 250, unit: 'gr', item: 'dry pasta' },
    ],
    picture: '/images/zucchini-bolognese.jpg',
    personcount: 2,
    duration: '45 minutes',
    categories: ['Pasta', 'Healthy', 'Italian'],
  }),
  new Recipe({
    _owner: users[3]._id, // Mum
    name: 'Chorizo Pasta with Mushrooms and Sun-dried Tomatoes',
    description: `Boil a large pot of salted water for the pasta. You can make the sauce while the pasta cooks. Cook penne al dente according to package directions.
    Heat olive oil in skillet on medium heat.
    Chop onion and add it to skillet.
    Meanwhile, cut chorizo into desired size pieces. Add it to skillet. 
    While onions are chorizo are cooking, chop portobello mushrooms to desired size (I like mine roughly chopped). Add to skillet. Stir.
    Add sun-dried tomatoes, garlic, and Italian seasoning to skillet, followed by the cream. Let it cook for about 5 minutes.
    Once sauce and penne are cooked, drain penne and add to skillet, mixing it together. Drizzle olive oil, sprinkle chopped parsley, and add parmesan cheese and extra salt & pepper if desired. Serve immediately`,
    ingredients: [
      { qtyPerPerson: 85, qty: 340, unit: 'gr', item: 'penne' },
      { qtyPerPerson: 1, qty: 1, unit: 'tsp', item: 'olive oil' },
      { qtyPerPerson: 0.125, qty: 0.5, unit: 'units', item: 'onion' },
      { qtyPerPerson: 75, qty: 300, unit: 'gr', item: 'chorizo sausage' },
      {
        qtyPerPerson: 0.5,
        qty: 2,
        unit: 'units',
        item: 'portobello mushrooms',
      },
      { qtyPerPerson: 0.75, qty: 3, unit: 'tbs', item: 'sun-dried tomatoes' },
      { qtyPerPerson: 0.75, qty: 3, unit: 'cloves', item: 'garlic' },
      { qtyPerPerson: 0.75, qty: 3, unit: 'pinch', item: 'Italian seasoning' },
      { qtyPerPerson: 0.125, qty: 0.5, unit: 'cup', item: 'whipping cream' },
      { qtyPerPerson: 0.5, qty: 2, unit: 'pinch', item: 'Salt' },
      { qtyPerPerson: 0.5, qty: 2, unit: 'pinch', item: 'Pepper' },
      { qtyPerPerson: 2, qty: 8, unit: 'tbs', item: 'Parmesan' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'bunch', item: 'Parsley' },
    ],
    picture: '/images/chorizopenne.jpg',
    personcount: 4,
    duration: '30 minutes',
    categories: ['Pasta'],
  }),
  new Recipe({
    _owner: users[3]._id, // Mum
    name: 'Veggie paella',
    description: `Heat the oil in a large deep, lidded sauté pan or paella pan. Add the onion, cover and cook for 5 minutes until soft. Stir in the smoked paprika spice mix.
    Add a little stock to a bowl with the saffron; leave to infuse for a minute. Add the rice to the pan and stir well. Increase the heat, pour over the saffron water and the rest of the stock. Finely grate in the zest from half the lemon. Bring to the boil, reduce the heat and simmer, uncovered, for 10 minutes, stirring occasionally. Stir in the sliced peppers and mixed veg, cover and cook for 3-4 minutes until just tender.
    Remove from the heat, add a good squeeze of lemon (from the zested half) and most of the parsley, stir with a fork and season to taste. Cover and leave to stand for 2 minutes.
    Tip If you’d like this to be a gluten-free recipe, please ensure your stock is guaranteed gluten-free.
    Scatter with the remaining parsley and serve with the remaining lemon half, cut into wedges to squeeze over.`,
    ingredients: [
      { qtyPerPerson: 0.5, qty: 2, unit: 'tbs', item: 'olive oil' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'units', item: 'onion' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'tbs', item: 'paprika' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'tbs', item: 'thyme' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'tbs', item: 'garlic' },
      { qtyPerPerson: 200, qty: 800, unit: 'ml', item: 'vegetable stock' },
      { qtyPerPerson: 0.25, qty: 1, unit: 'pinch', item: 'saffron' },
      { qtyPerPerson: 62.5, qty: 250, unit: 'gr', item: 'paella rice' },
      { qtyPerPerson: 0.125, qty: 0.5, unit: 'units', item: 'lemon' },
      {
        qtyPerPerson: 70,
        qty: 280,
        unit: 'gr',
        item: 'chargrilled peppers antipasto',
      },
      {
        qtyPerPerson: 50,
        qty: 200,
        unit: 'gr',
        item: 'mixed asparagus, sugarsnaps, tenderstem',
      },
      { qtyPerPerson: 0.25, qty: 1, unit: 'bunch', item: 'parsley' },
    ],
    picture: '/images/Veggie-paella.jpg',
    personcount: 4,
    duration: '30 minutes',
    categories: ['Vegetarian', 'Spanish', 'Gluten-free', 'Main'],
  }),
  new Recipe({
    _owner: users[3]._id, // Mum
    name: 'Dover Sole a la Meunière',
    description: `Season the Dover soles with salt and white pepper. Dip on both sides into flour and then pat off the excess.

    Heat the oil in a large well-seasoned or non-stick frying pan. Add one of the soles, lower the heat slightly and add a small piece of the butter. Fry over a moderate heat for 4–5 minutes, without moving, until richly golden. Carefully turn the fish over and cook for a further 4–5 minutes until golden brown and cooked through. Lift on to a serving plate and keep warm. Repeat with the second fish.
    
    Remove the bones as described in my Rick Stein's Fish & Shellfish video skills guide.
    
    Discard the frying oil and wipe the pan clean. Add the remaining butter and allow it to melt over a moderate heat. When the butter starts to smell nutty and turn light brown, add the lemon juice, parsley and some seasoning. Pour some of this beurre noisette over each fish and serve with the lemon wedges.`,
    ingredients: [
      { qtyPerPerson: 1, qty: 2, unit: 'units', item: 'Dover soles' },
      { qtyPerPerson: 1, qty: 2, unit: 'pinch', item: 'sea salt' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'pinch', item: 'pepper' },
      { qtyPerPerson: 12.5, qty: 25, unit: 'gr', item: 'flour' },
      { qtyPerPerson: 2, qty: 4, unit: 'tbs', item: 'vegetable oil' },
      { qtyPerPerson: 1, qty: 2, unit: 'tbs', item: 'lemmon juice' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'tbs', item: 'chopped parsley' },
      { qtyPerPerson: 0.5, qty: 1, unit: 'units', item: 'lemmon' },
    ],
    picture: '/images/soleimage.jpg',
    personcount: 2,
    duration: '25 minutes',
    categories: ['Fish', 'Seefood'],
  }),
  new Recipe({
    _owner: users[2]._id, // Jamie Oliver
    name: 'Chocolate Bundt Cake',
    description:
      "Preheat the oven to 180ºC. Spray generously a bundt pan with cooking spray or grease with butter. Combine the water and the cocoa powder until it's completely dissolved. Let it cool. Whisk the sugar and flour together and make a hole in the center. Then add the egg yolks, cocoa mixture, oil, salt and the baking powder and beat for 8 minutes in a stand mixer at medium speed. Meanwhile, beat the egg whites to stiff peaks with the remaining sugar. Using a rubber spatula, fold the egg whites into the chocolate batter slowly, until completely combined. Pour into the bundt pan and bake for 40 minutes or until a toothpick comes out almost clean. Don't let it dry too much. For the ganache just microwave the heavy cream, in a heatproof bowl, until it's hot. Then add the chocolate in pieces and cover with a lid (I used a plate). After a minute or so, remove the lid and stir with a rubber spatula until all the chocolate bits have melted and are well mixed. When the cake is cold, pour over it and have fun with some sprinkles. Enjoy!",
    ingredients: [
      { qtyPerPerson: 0.6, qty: 6, unit: 'units', item: 'eggs' },
      { qtyPerPerson: 7.5, qty: 75, unit: 'gr', item: 'cocoa powder' },
      { qtyPerPerson: 20, qty: 200, unit: 'ml', item: 'warm water' },
      { qtyPerPerson: 25, qty: 250, unit: 'gr', item: 'all-purpose flour' },
      { qtyPerPerson: 30, qty: 300, unit: 'gr', item: 'white sugar' },
      { qtyPerPerson: 11, qty: 110, unit: 'ml', item: 'sunflower oil' },
      { qtyPerPerson: 0.1, qty: 1, unit: 'pinch', item: 'table salt' },
      { qtyPerPerson: 0.3, qty: 3, unit: 'tbs', item: 'white sugar' },
      {
        qtyPerPerson: 20,
        qty: 200,
        unit: 'gr',
        item: 'semisweet or 50% dark chocolate',
      },
      { qtyPerPerson: 20, qty: 200, unit: 'ml', item: 'heavy cream' },
    ],
    picture: '/images/chocolate-bundt-cake.jpg',
    personcount: 10,
    duration: '1 hour',
    categories: ['Desserts', 'Baking'],
  }),
]

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
