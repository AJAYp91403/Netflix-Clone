import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCtiNFQJH81Vi18C9P3P8UCyrvRzf29RSc",
  authDomain: "netflix-clone-d24cf.firebaseapp.com",
  projectId: "netflix-clone-d24cf",
  storageBucket: "netflix-clone-d24cf.appspot.com",
  messagingSenderId: "426165479025",
  appId: "1:426165479025:web:7430594259c62ef4421dd0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
const login = async (email, password)=>{
  try {
      await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout};