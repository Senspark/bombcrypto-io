// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAC-Ox-Hy3_y87SaAxRjGxw4KB4u84wkF4',
  authDomain: 'bombcrypto-homepage.firebaseapp.com',
  projectId: 'bombcrypto-homepage',
  storageBucket: 'bombcrypto-homepage.appspot.com',
  messagingSenderId: '1090567108782',
  appId: '1:1090567108782:web:d9258d1cf97254b0c0953f',
  measurementId: 'G-JN1ZLTVY43',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
