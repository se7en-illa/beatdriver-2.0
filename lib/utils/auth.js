"use client";
// react/next
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, setAuth } from "../redux/slices/userSlice";
// firebase
import { auth } from "../../lib/firebase/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../../lib/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const router = useRouter();
const dispatch = useDispatch();
// authentication
const googleAuth = new GoogleAuthProvider();
const [userGoogleInfo] = useAuthState(auth);
// database
const dbInstance = collection(database, "users");
const [docs] = useCollectionData(dbInstance);

const user = useSelector((state) => state.user.userInfo);
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

let currentUser;
if (userGoogleInfo) {
  currentUser = docs?.find((doc) => doc.email === userGoogleInfo.email);
  dispatch(setUser(currentUser));
  dispatch(setAuth(true));
}

export const login = async () => {
  await signInWithPopup(auth, googleAuth).then(async (result) => {
    const user = result.user;
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
      await addUser(user.uid, user.displayName, user.email, user.photoURL);
      dispatch(setUser(user));
      dispatch(setAuth(true));
    } else {
      console.log("User already exists");
    }
  });
};

export const addUser = async (userId, displayName, email, photoURL) => {
  const userRef = doc(database, "users", userId);
  return await setDoc(userRef, {
    createdAt: serverTimestamp(),
    id: userId,
    name: displayName,
    email: email,
    photo: photoURL,
    location: "UPDATE YOUR LOCATION",
    bio: "UPDATE YOUR BIO",
    twitter: "ADD YOUR TWITTER",
    instagram: "ADD YOUR INSTAGRAM",
    soundcloud: "ADD YOUR SOUNDCLOUD",
  });
};

export const handleSignOut = () => {
  auth.signOut();
  dispatch(setUser(null));
  dispatch(setAuth(false));
  router.push("/");
};
