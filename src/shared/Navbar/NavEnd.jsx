"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/AuthProvider";
import { CirclePlus, LogIn } from "lucide-react";

export default function NavbarEnd() {
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <>
      {" "}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-6">
            <Button variant="outline" className="text-base-content">
              {" "}
              <CirclePlus /> Submit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <Avatar className="w-10 h-10">
                  <Image
                    src={user.photoURL}
                    width={60}
                    height={60}
                    alt="profile"
                    className="cursor-pointer hover:outline-2 hover:outline-primary"
                  />
                  <AvatarFallback>
                    {user.displayName && user.displayName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            onClick={() => document.getElementById("sign_in_modal").showModal()}
          >
            <LogIn /> Sign in
          </Button>
        )}
      </div>
    </>
  );
}
