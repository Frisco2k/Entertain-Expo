import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { 
  getAuth, 
  signOut, 
  signInAnonymously, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import firebaseConfig from "./firebaseConfig.js";


const app = initializeApp(firebaseConfig);

const auth = getAuth();

function setAuthListeners(onLogin){
  onAuthStateChanged(auth, user => {
    if (user) {
      onLogin();
    } 
  });
}

async function signIn(){
  try{
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInAnonymously(auth);
    return userCredential.user; 
  } catch(e) {
    console.error(e);
    return null; 
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
  }
}


export {auth, setAuthListeners, signIn, logout};