// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJET_ID as string
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
