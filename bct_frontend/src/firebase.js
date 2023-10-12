import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIX9Z5eLeb6gCh7HPNj5kc0XPqq_m7UiA",
  authDomain: "enlightenedpages-53b05.firebaseapp.com",
  projectId: "enlightenedpages-53b05",
  storageBucket: "enlightenedpages-53b05.appspot.com",
  messagingSenderId: "482500854982",
  appId: "1:482500854982:web:fd1e79da2c7bd7040b43c7",
  measurementId: "G-82PBJB4MHD",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const firebaseExp = firebase;
export const firebaseUI = firebaseui;
