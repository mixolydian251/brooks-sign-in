import * as firebase from 'firebase';


const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// const config = {
//   apiKey: 'AIzaSyACxFq1f30icL0_1M-52pSPG_FSijCEWAE',
//   authDomain: 'brook-sign-in.firebaseapp.com',
//   databaseURL: 'https://brook-sign-in.firebaseio.com',
//   projectId: 'brook-sign-in',
//   storageBucket: 'brook-sign-in.appspot.com',
//   messagingSenderId: '561944561300'
// };

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
