// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword as createNewUser,
  signInWithEmailAndPassword as signInUser,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
  collection,
  writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD0Va2t5jQbBFrndelM5DoZu98zlBKJJpk',
  authDomain: 'ld-clothing.firebaseapp.com',
  projectId: 'ld-clothing',
  storageBucket: 'ld-clothing.appspot.com',
  messagingSenderId: '598447906344',
  appId: '1:598447906344:web:8a869000603b7468db5f1d',
  measurementId: 'G-E0SB5S3V94',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const onSnap = onSnapshot;

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGooge = async () =>
  await signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserWithEmailAndPassword = createNewUser;
export const signInWithEmailAndPassword = async (email, password) =>
  await signInUser(auth, email, password);

export const signOutUser = async () => await signOut(auth);

export const getDocFromFirestore = async (docRef) => {
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const collectionRef = doc(collection(db, collectionKey));
    batch.set(collectionRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubcrible = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubcrible();
        resolve(userAuth);
      },
      reject
    );
  });
};
