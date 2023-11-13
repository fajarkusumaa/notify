import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useEffect } from "react";

import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";

const HandleGoogle = ({ setUser, setCurrentUser }) => {
    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const data = await signInWithPopup(auth, provider);

            localStorage.setItem("name", data.user.displayName);
            localStorage.setItem("photoURL", data.user.photoURL);
            localStorage.setItem("email", data.user.email);

            localStorage.setItem("currentUser", data.user.uid);

            console.log(data.user.uid);
            // if (!data.exist)
            await setDoc(doc(db, "users", data.user.uid), {
                name: data.user.displayName,
                email: data.user.email
            });

            window.location.reload();
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };

    useEffect(() => {
        setUser({
            name: localStorage.getItem("name"),
            photoURL: localStorage.getItem("photoURL"),
            email: localStorage.getItem("email")
        }),
            setCurrentUser(localStorage.getItem("currentUser"));
    }, []);

    console.log();

    return (
        <button
            className="p-4 bg-slate-50 text-slate-400"
            onClick={handleGoogle}
        >
            Sign In with Google
        </button>
    );
};

export default HandleGoogle;
