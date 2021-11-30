import firebase from "firebase/compat/app";
import { getFirestore, collection } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import Constants from "expo-constants";

interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: Config = {
  apiKey: Constants.manifest!.extra!.apiKey,
  authDomain: Constants.manifest!.extra!.authDomain,
  projectId: Constants.manifest!.extra!.projectId,
  storageBucket: Constants.manifest!.extra!.storageBucket,
  messagingSenderId: Constants.manifest!.extra!.messagingSenderId,
  appId: Constants.manifest!.extra!.appId,
  measurementId: Constants.manifest!.extra!.measurementId,
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// const analytics = getAnalytics(app); // export?
// expo-firebase-analytics
const db = getFirestore(app);
// console.log(firebase.auth);

// Retrieve the collection of users
export const userRef = collection(db, 'users');

export const auth = firebase.auth();
export default db;


// let prompt: string;

// async function wrapper() {
//   prompt = await testDB();
//   console.log(prompt);
// }

// wrapper();

// async function testDB(): Promise<string> {
//   const promptsRef = collection(db, "prompts");
//   //const prompts = await getDocs(promptsRef);
//   const q = query(
//     promptsRef
//     //where("prompt", "==", "Which is better, Harry Potter or Lord of the Rings?")
//   );
//   const querySnapshot = await getDocs(q);
//   const prompts: string[] = [];
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     prompts.push(doc.data().prompt);
//   });
//   const randomNum = Math.floor(Math.random() * prompts.length);
//   return prompts[randomNum];
// }


// export const auth = app.auth();
// export const auth = firebase.auth(app);
// export const auth = firebase.auth();

// export auth;

// let app;
// try {
//   app = firebase.getApp();
// } catch (err) {
//   app = firebase.initializeApp(firebaseConfig);
// }
// const app = firebase.initializeApp(firebaseConfig);