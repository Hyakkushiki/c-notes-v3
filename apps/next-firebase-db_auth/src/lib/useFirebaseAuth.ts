import { useState, useEffect } from "react";
import { firebaseAuth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // signInWithPopup,
  // SignInMethod,
  // signOut,
  // UserCredential,
} from "firebase/auth";
// import Firebase from "firebase/auth";

type User = { uid: any; email: any };

const formatAuthUser = (user: User) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const authStateChanged = async (authState: any) => { // UserCredential
    // alert('inside authStateChanged, in useFirebaseAuth '+ ' authState: ' + authState)
    // console.log('inside authStateChanged, in useFirebaseAuth', 'authState:',authState.email,authState.uid, !authState, !!authState)
    // console.log(authState)
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser({email:authState.email, uid:authState.uid});
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const SignInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const CreateUserWithEmailAndPassword = (email: string, password: string) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signOut = () => firebaseAuth.signOut().then(clear);

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);
// console.log('og auth:', authUser)
  return {
    authUser,
    loading,
    SignInWithEmailAndPassword,
    CreateUserWithEmailAndPassword,
    signOut,
  };
}
