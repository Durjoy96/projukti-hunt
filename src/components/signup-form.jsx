"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ContinueWithGoogle from "./continue-with-google";
import { useState } from "react";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

export function SignUpForm({ className, ...props }) {
  const [showPass, setShowPass] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassVerification, setShowPassVerification] = useState(false);
  const [changeHasUppercase, setChangeHasUppercase] = useState(false);
  const [changeHasLowercase, setChangeHasLowercase] = useState(false);
  const [changeHasMinimumLength, setChangeHasMinimumLength] = useState(false);

  const passVerificationHandler = (e) => {
    const password = e.target.value;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasMinimumLength = /^.{8,15}$/;

    setChangeHasUppercase(hasUppercase.test(password));
    setChangeHasLowercase(hasLowercase.test(password));
    setChangeHasMinimumLength(hasMinimumLength.test(password));

    if (
      hasUppercase.test(password) &&
      hasLowercase.test(password) &&
      hasMinimumLength.test(password)
    ) {
      return setIsDisabled(false);
    }

    return setIsDisabled(true);
  };

  const formHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    /*     createUserWithEmailAndPass(email, password)
      .then(() => {
        toast.success("Registration Successful!");
        updateUserProfile(name, photoUrl);
      })
      .catch((error) => {
        if (
          error.message.includes("Firebase: Error (auth/email-already-in-use).")
        ) {
          toast.error("Email already in use");
        }
      }); */
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>sign up with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formHandler}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <ContinueWithGoogle />
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      onFocus={() => setShowPassVerification(true)}
                      onBlur={() => setShowPassVerification(false)}
                      onChange={passVerificationHandler}
                      type={showPass ? "text" : "password"}
                      id="password"
                      required
                    />
                    <button
                      className="absolute right-0 top-0 p-2 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                      type="button"
                    >
                      {showPass ? (
                        <Eye className="w-5 h-5 stroke-base-content-secondary" />
                      ) : (
                        <EyeOff className="w-5 h-5 stroke-base-content-secondary" />
                      )}
                    </button>
                  </div>
                  {showPassVerification ? (
                    <ul className="text-sm">
                      <li
                        className={`${
                          changeHasUppercase
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }`}
                      >
                        Must have an Uppercase letter
                      </li>
                      <li
                        className={`${
                          changeHasLowercase
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }`}
                      >
                        Must have a Lowercase letter
                      </li>
                      <li
                        className={`${
                          changeHasMinimumLength
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }`}
                      >
                        Length must be between 8 and 15 characters
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
                <Button disabled={isDisabled} type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
