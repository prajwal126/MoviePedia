import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxnivYB6BafJ-UJVrca-0wkiOPR9T4ZuE",
    authDomain: "moviepedia-8b711.firebaseapp.com",
    projectId: "moviepedia-8b711",
    storageBucket: "moviepedia-8b711.appspot.com",
    messagingSenderId: "1052898366316",
    appId: "1:1052898366316:web:faa6167ad5f2aa78b6d949",
    measurementId: "G-Y2XGHFT3TJ"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }



export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;

