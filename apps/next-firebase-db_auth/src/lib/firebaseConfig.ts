// Import the functions you need from the SDKs you need
import { FirebaseOptions, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  // setPersistence,
  // browserLocalPersistence,
  // browserSessionPersistence,
  // GithubAuthProvider,
  // linkWithRedirect,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

// https://firebase.google.com/docs/auth/web/account-linking
// const githubProvider = new GithubAuthProvider();
// const auth = getAuth();
// linkWithRedirect(auth.currentUser, githubProvider)
//   .then(/* ... */)
//   .catch(/* ... */);

// Initialize Firebase
// export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseApp = createFirebaseApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
// export const analytics = getAnalytics(app);
export const firebaseDB = getFirestore(firebaseApp);

// setPersistence(firebaseAuth, browserSessionPersistence)
//   .then(() => {
//     console.log("Session persistence enabled");
//   })
//   .catch((error) => {
//     console.error("Error enabling session persistence:", error);
//   });

// https://dev.to/gthinh/how-to-initialize-a-firebase-app-in-the-new-modular-web-sdk-in-nextjs-187i
