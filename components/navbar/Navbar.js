"use client";
// react/next
import React from "react";
import Link from "next/link";
import Image from "next/image";
// redux
import { useSelector } from "react-redux";
// auth
import { useAuth } from "../../lib/utils/auth";

function Navbar() {
  const { login, handleSignOut, userGoogleInfo } = useAuth();
  const user = useSelector((state) => state.user.userInfo);

  return (
    <header>
      <div className="flex flex-grow cursor-pointer place-items-center space-x-3 p-2 pl-6 bg-indigo_dye text-ghost_white">
        {/* LEFT NAV */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 text-5xl">
          <Link href="/">
            <h3>BEATDRIVER</h3>
          </Link>
        </div>
        {/* RIGHT NAV */}
        <div className="text-ghost_white flex items-center space-x-6 mx-6 whitespace-nowrap pl-10 text-2xl">
          <Link href="/discover">
            <p className="link">Discover</p>
          </Link>
          <Link href="/board">
            <button className="link">New Project</button>
          </Link>
        </div>
        <div className="px-64 flex flex-grow md:px-48 sm:px-0" />
        <div className="text-ghost_white flex flex-grow items-center space-x-6 mx-6 whitespace-nowrap pl-10 text-2xl">
          {!userGoogleInfo && (
            <button onClick={login} className="link">
              <p>Sign In</p>
            </button>
          )}
          {userGoogleInfo && (
            <>
              <Link href="/user" className="flex p-2">
                <Image
                  src={user ? user.userInfo.photo : userGoogleInfo.photoURL}
                  alt=""
                  width={40}
                  height={40}
                  className="link rounded-full"
                />

                <p className="text-2xl ml-2 pl-1 mt-0.5">
                  {`Hello, ${
                    user ? user.userInfo.name : userGoogleInfo.displayName
                  }!`}
                </p>
              </Link>

              <div className="mt-0.5">
                <button className="link text-md" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
