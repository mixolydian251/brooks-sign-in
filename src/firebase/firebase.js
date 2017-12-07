import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyACxFq1f30icL0_1M-52pSPG_FSijCEWAE',
  authDomain: 'brook-sign-in.firebaseapp.com',
  databaseURL: 'https://brook-sign-in.firebaseio.com',
  projectId: 'brook-sign-in',
  storageBucket: 'brook-sign-in.appspot.com',
  messagingSenderId: '561944561300'
};

firebase.initializeApp(config);

const database = firebase.database();
const emailAuthProvider = new firebase.auth.EmailAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, emailAuthProvider, database as default };
