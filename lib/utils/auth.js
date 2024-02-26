// useAuth.js
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { auth, database } from "../../lib/firebase/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { setUser } from "../../lib/redux/slices/userSlice/userSlice";
import { setAuth } from "../../lib/redux/slices/userSlice/authSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();
  const [userGoogleInfo] = useAuthState(auth);
  const dbInstance = collection(database, "users");
  const [docs] = useCollectionData(dbInstance);

  const login = useCallback(async () => {
    await signInWithPopup(auth, googleAuth).then(async (result) => {
      const user = result.user;
      const { isNewUser } = getAdditionalUserInfo(result);
      if (isNewUser) {
        await addUser(user.uid, user.displayName, user.email, user.photoURL);
        dispatch(setUser(user));
        dispatch(setAuth(true));
      } else {
        const currentUser = docs?.find((doc) => doc.email === user.email);
        dispatch(setUser(currentUser));
        dispatch(setAuth(true));
      }
    });
  }, [dispatch, googleAuth, docs]);

  const addUser = useCallback(async (userId, displayName, email, photoURL) => {
    const userRef = doc(database, "users", userId);
    await setDoc(userRef, {
      createdAt: serverTimestamp(),
      id: userId,
      name: displayName,
      email: email,
      photo: photoURL,
      // Additional fields
    });
  }, []);

  const handleSignOut = useCallback(() => {
    auth.signOut();
    dispatch(setUser(null));
    dispatch(setAuth(false));
    router.push("/");
  }, [dispatch, router]);

  return { login, handleSignOut, userGoogleInfo, docs };
};
