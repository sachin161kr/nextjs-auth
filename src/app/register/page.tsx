"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="border-2 border-gray-500 rounded-md px-2 py-1 w-64 m-2 text-black"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        value={user.username}
        type="text"
        name="username"
        id="username"
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="border-2 border-gray-500 rounded-md px-2 py-1 w-64 m-2 text-black"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        value={user.email}
        type="text"
        name="email"
        id="email"
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="border-2 border-gray-500 rounded-md px-2 py-1 w-64 m-2 text-black"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        value={user.password}
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button
        onClick={onSignUp}
        disabled={buttonDisabled}
        text-blackonClick={onSignUp}
        className="border p-2 rounded-lg mb-4"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
