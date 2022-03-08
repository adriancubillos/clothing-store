import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDJdn7BjXNC1-nRFaPmfTe2Cs5bypsIPEw',
  authDomain: 'crwn-db-5f674.firebaseapp.com',
  projectId: 'crwn-db-5f674',
  storageBucket: 'crwn-db-5f674.appspot.com',
  messagingSenderId: '818939666252',
  appId: '1:818939666252:web:db48a618320e396ac7b9e9',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;
