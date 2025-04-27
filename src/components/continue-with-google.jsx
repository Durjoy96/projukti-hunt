"use client";

import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import axios from "axios";

export default function ContinueWithGoogle() {
  const { googleLogin } = useAuth();
  const btnHandler = () => {
    document.getElementById("sign_in_modal").close();
    googleLogin()
      .then((res) => {
        toast.success("Login Successfully!");
        const user = {
          _id: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          photo_url: res.user.photoURL,
          creation_time: res.user.metadata.creationTime,
        };
        axios.post("/api/auth/users", user).then((res) => {
          console.log(res);
          localStorage.setItem("authToken", res.data.token); //store token to the local storage
          
        }); //store user data to the database
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Button
          onClick={btnHandler}
          variant="outline"
          className="w-full cursor-pointer h-12 text-base-content max-w-xs"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="16"
            viewBox="0 0 18 18"
          >
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#4285F4"
                fill-rule="nonzero"
                d="M17.64 9.205q-.002-.958-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615"
              ></path>
              <path
                fill="#34A853"
                fill-rule="nonzero"
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A9 9 0 0 0 9 18"
              ></path>
              <path
                fill="#FBBC05"
                fill-rule="nonzero"
                d="M3.964 10.71A5.4 5.4 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A9 9 0 0 0 0 9c0 1.452.348 2.827.957 4.042z"
              ></path>
              <path
                fill="#EA4335"
                fill-rule="nonzero"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A9 9 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58"
              ></path>
              <path d="M0 0h18v18H0z"></path>
            </g>
          </svg>
          Continue with Google
        </Button>
      </div>
    </>
  );
}
