
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBP-EBWh8ijevD-sf_vGQcVNKnYZ9695_4",
  authDomain: "netflix-clone-d815d.firebaseapp.com",
  projectId: "netflix-clone-d815d",
  storageBucket: "netflix-clone-d815d.appspot.com",
  messagingSenderId: "446370969004",
  appId: "1:446370969004:web:1cff4b69cce937c5daf609"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        //creates the user in firebase
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       //store user in firestore db
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    
}

const login = async  (email, password)=>{
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