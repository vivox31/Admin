import firebase from 'firebase/compat/app';
import {getStorage} from'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCM6-_jTvxok0pYrCYgB5xL-aFZtq2xzKw",
    authDomain: "netflix-473d0.firebaseapp.com",
    projectId: "netflix-473d0",
    storageBucket: "netflix-473d0.appspot.com",
    messagingSenderId: "372075151348",
    appId: "1:372075151348:web:772a75c8d9375f400a43a1",
    measurementId: "G-TWGP4CP36G"
  };

// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;