# :jigsaw: **fibonacci-grid-game**

The Fibonacci Grid Game is a single player puzzle game based on the [Fibonacci Sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

<p align="center">
</p>

# **Gameplay:**
- When the player clicks on one of the cells, all horizontal and vertical cells of the clicked cell will be incremented by 1 if the cell was empty then it will be 1.
- After each cell change, the cell will be highlighted for a split second.
- When 5 consecutive numbers from the [Fibonacci series](https://en.wikipedia.org/wiki/Fibonacci_number). are next to each other the cells will be briefly higlighted and cleared. An example : for 
example 1.1.2.3.5 or 3.5.8.13.21.

# **Overview**
1. Nuxt with Vue is used to create the frontend for the application
2. The data of the grid is computed at startup and is stored inside an array of row objects.
3. After every user interaction with the grid the checkGrid function is called which will scan the data of the grid for any fibonacci Sequence
4. It will map out arrays of five consecutive numbers and check if together they match any of the fibonacci sequences.
5. If a sequence is found the cells will be cleared and fibonacci the counter will be increased.

# **Running the app**

## **Prerequisites**
Node version >= 16.16.0

## **Technologies used:**
- [Nuxt](https://nuxtjs.org/)
- [Vue.js](https://vuejs.org/)
- [JavaScript](https://www.javascript.com/)
- [HTML](https://www.w3.org/html/)
- [CSS](https://www.w3.org/Style/)
- [Google-Fonts](https://fonts.google.com/)
- [SCSS](https://sass-lang.com/)
- [Howler.js](https://howlerjs.com/)
- [Webpack](https://webpack.js.org/)
- [vuetify](https://vuetifyjs.com/)
## **Build Setup**

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```



# **Todos and improvements**
- Create tests for prebuilding and production
- Point system for scoring (Maybe use a score counter and a score board with leaderboards)
- Refactor the grid business logic to be more efficient (maybe use a 2D array instead of an data object)
- Refactor CSS to be utilized more effectively for transitions and animations
- Improve user feedback when resetting the grid
- Add a timer to the game 