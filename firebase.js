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
    apiKey: "AIzaSyDW-wPv5rwZoK5zU6JS0oa5kb8WITDxPhw",
    authDomain: "my-blog-o.firebaseapp.com",
    projectId: "my-blog-o",
    storageBucket: "my-blog-o.appspot.com",
    messagingSenderId: "189317823985",
    appId: "1:189317823985:web:d5c7b759a73953fe239850",
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
