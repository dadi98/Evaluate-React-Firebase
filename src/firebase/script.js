
var { getAuth, signInWithEmailAndPassword } = require("firebase/auth")
var { initializeApp } = require('firebase/app')
const admin = require('firebase/admin');
console.log(admin)
const config = {
    apiKey: "AIzaSyCYR4Tz5fgNXn6pKf33jUlfefwi9a-T-kg",
    authDomain: "evaluate-sever.firebaseapp.com",
    projectId: "evaluate-sever",
    storageBucket: "evaluate-sever.appspot.com",
    messagingSenderId: "569031512688",
    appId: "1:569031512688:web:5dc745197720114f899ab5"
  };

  initializeApp(config);
    console.log(getAuth);
  getAuth().setCustomUserClaims('UBkU4nTeWcTiAWNuteDABxcY0cF3', { admin: true })
    .then(() => {
        console.log('done');
    });