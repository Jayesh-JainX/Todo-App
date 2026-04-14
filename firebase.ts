import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  type Auth,
} from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

let app: FirebaseApp;
let analytics: Analytics;
let auth: Auth;
let storage: FirebaseStorage;

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
} else {
  app = getApps()[0];
  auth = getAuth(app);
  storage = getStorage(app);
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
}

export { app, auth };
