// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD7zTyLK0Iw2OGnvZtAsQIj-KdQWFkX72w',
  authDomain: 'jasonandyuting.firebaseapp.com',
  databaseURL:
    'https://jasonandyuting-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'jasonandyuting',
  storageBucket: 'jasonandyuting.appspot.com',
  messagingSenderId: '769842713750',
  appId: '1:769842713750:web:3abf996dec001b6fe9deb7',
  measurementId: 'G-GMKBFGFNPE',
};

export const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
};
