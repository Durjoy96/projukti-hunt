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
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function NavbarEnd() {
  const { user, logout } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/auth/users?uid=${user && user?.uid}`)
      .then((res) => {
        setDbUser(res.data);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Failed to fetch user data");
      });
  }, [user]);
  return (
    <>
      {" "}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-6">
            <Link href="/posts/new">
              <Button variant="outline" className="text-base-content">
                {" "}
                <CirclePlus /> Submit
              </Button>
            </Link>
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
                <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/@${dbUser?.username}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
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
