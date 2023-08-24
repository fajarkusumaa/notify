import { auth, googleProvider } from "./firebase";

function GoogleSignInButton() {
    const handleGoogleSignIn = async () => {
        try {
            await auth.signInWithPopup(googleProvider);
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    return <button onClick={handleGoogleSignIn}>Sign In with Google</button>;
}

export default GoogleSignInButton;
