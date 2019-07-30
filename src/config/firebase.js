import firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyBfMXry1SsaodPsMA70779ARk2AT-zOSxo",
    authDomain: "todoapp-abe0a.firebaseapp.com",
    databaseURL: "https://todoapp-abe0a.firebaseio.com",
    projectId: "todoapp-abe0a",
    storageBucket: "todoapp-abe0a.appspot.com",
    messagingSenderId: "78864891604",
    appId: "1:78864891604:web:7c15919bad5ad815"
};

firebase.initializeApp(config)
const db = firebase.database()

export default db;