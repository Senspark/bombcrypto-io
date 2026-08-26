// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
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

/**
 * Analytics só existe no navegador — getAnalytics() acessa window e quebraria
 * o pré-render das páginas. Por isso é criado sob demanda, no primeiro uso.
 */
let analyticsInstance: Analytics | null = null;

export const getAnalyticsClient = (): Analytics | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!analyticsInstance) {
    analyticsInstance = getAnalytics(app);
  }
  return analyticsInstance;
};
