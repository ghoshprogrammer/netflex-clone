
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyA30odn5yiPHgYHxjx9aQHx1OSxwQQzfqc",
    authDomain: "netflix-clone-78801.firebaseapp.com",
    projectId: "netflix-clone-78801",
    storageBucket: "netflix-clone-78801.appspot.com",
    messagingSenderId: "239533015822",
    appId: "1:239533015822:web:d218c91577c73fac7b0d5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            username,
            authProvider: 'local',
            email,

        })
        toast.success("User Created Successfully")
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const signin = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("User  Successfully Login")
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth)
    toast.success("User  has been Logout")
}

export { signin, signup, logout,db,auth }