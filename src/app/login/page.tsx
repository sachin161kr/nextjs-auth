"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      const response = await axios.post("api/users/login", user);
      console.log(response);
      toast.success("Login Successful");
      router.push("/profile");
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="border-2 border-gray-500 rounded-md px-2 py-1 w-64 m-2  text-black"
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
        disabled={buttonDisabled}
        onClick={onLogin}
        className="border p-2 rounded-lg mb-4"
      >
        Login
      </button>
      <Link href="/register">Visit Signup Page</Link>
    </div>
  );
}
