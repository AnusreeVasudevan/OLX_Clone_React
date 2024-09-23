import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { getStorage } from "firebase/storage"; // Add this line if it's missing


const firebaseConfig = {
  apiKey: "AIzaSyAqtWSP7RCZkhut4-FfOBIXETYtR6Jymu4",
  authDomain: "olx-clone-428f2.firebaseapp.com",
  projectId: "olx-clone-428f2",
  storageBucket: "olx-clone-428f2.appspot.com",
  messagingSenderId: "469661256069",
  appId: "1:469661256069:web:69218066eeaa9e67f01cec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage


const signup = async (name, email, phone, password) => {
  
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      phone
    });
    
  } catch (error) {
    console.log(error.message);
   
    toast.error(error.code.split('/')[1].split('-').join(''));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(''));
  }
};
const Logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
        toast.error(error.code.split('/')[1].split('-').join(''));
      console.error("Error signing out: ", error);
    });
};

export { auth,storage, db, signup, Logout,login };
