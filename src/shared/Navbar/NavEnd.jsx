"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function NavEnd() {
  return (
    <>
      <div className="navbar-end">
        <Button
          onClick={() => document.getElementById("sign_in_modal").showModal()}
        >
          <LogIn /> Sign in
        </Button>
      </div>
    </>
  );
}
