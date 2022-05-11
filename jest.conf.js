module.exports = {  
  "verbose": true,
  "testURL": "http://localhost/",
  "moduleFileExtensions": [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  "transform": {
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
    // process `*.js` files with `babel-jest`
    ".*\\.(js)$": "babel-jest"
  }
  // support the same @ -> src alias mapping in source code
  ,"moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
}