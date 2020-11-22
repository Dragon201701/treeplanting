import firebase from 'firebase'
//require('firebase/auth')
//require('firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyDF5QxBeM9PgfeGWvW1duLtSXbYXni9akE",
    authDomain: "treeplanting-4254e.firebaseapp.com",
    databaseURL: "https://treeplanting-4254e.firebaseio.com",
    projectId: "treeplanting-4254e",
    storageBucket: "treeplanting-4254e.appspot.com",
    messagingSenderId: "239391991596",
    appId: "1:239391991596:web:d51b2fe546181f4c5e6e89",
    measurementId: "G-2CLNNFB61E"
};
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
export default firebaseConfig;