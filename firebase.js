import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

let app;
let analytics;
let auth;
let storage;

if (!getApps().length) {
  const firebaseConfig = {
    apiKey: "AIzaSyB5OUUOdhiNlMC87S6GjSOb976GfLkCjgY",
    authDomain: "fir-d51bd.firebaseapp.com",
    projectId: "fir-d51bd",
    storageBucket: "fir-d51bd.appspot.com",
    messagingSenderId: "503432138541",
    appId: "1:503432138541:web:ab6d932d188e3724978da4",
    measurementId: "G-MMWZ5TG3PR",
  };

  app = initializeApp(firebaseConfig);

  auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Session persistence enabled");
    })
    .catch((error) => {
      console.error("Error enabling session persistence:", error.message);
    });

  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }

  storage = getStorage(app);
}

export { app, auth };
