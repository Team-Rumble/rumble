import firebase from "firebase/app";
import "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import Constants from 'expo-constants';

interface Config {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string,
}

const firebaseConfig: Config = {
    apiKey: Constants.manifest!.extra!.apiKey,
    authDomain: Constants.manifest!.extra!.authDomain,
    projectId: Constants.manifest!.extra!.projectId,
    storageBucket: Constants.manifest!.extra!.storageBucket,
    messagingSenderId: Constants.manifest!.extra!.messagingSenderId,
    appId: Constants.manifest!.extra!.appId,
    measurementId: Constants.manifest!.extra!.measurementId
  }; 
  
let Firebase;
try {
    Firebase = firebase.getApp();
}catch(err){
    Firebase = firebase.initializeApp(firebaseConfig);
}

const analytics = getAnalytics(Firebase);
// if (firebase.apps.length === 0) {
//   Firebase = firebase.initializeApp(firebaseConfig);
//   
// }

//const db = firebase.getFirestore(Firebase, {}) might need this?

export default Firebase;
