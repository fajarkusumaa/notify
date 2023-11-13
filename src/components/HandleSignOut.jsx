import { getAuth, signOut } from "firebase/auth";

// eslint-disable-next-line react/prop-types
const HandleSignOut = () => {
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log("Log out success");
                localStorage.clear();
                window.location.reload();
            })
            .catch((error) => {
                console.err(error);
                window.location.reload();
            });
    };

    return (
        <button onClick={handleSignOut} className="text-white">
            Log Out
        </button>
    );
};

export default HandleSignOut;
