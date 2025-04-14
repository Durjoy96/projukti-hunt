"use client";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile({ children }) {
  const { user } = useAuth();
  const { slug } = useParams();
  const path = window.location.href;
  const [dbUser, setDbUser] = useState([]);
  const [activeBtn, setActiveBtn] = useState(
    path.includes("products")
      ? "Products"
      : path.includes("discussions")
      ? "Discussions"
      : "Upvotes"
  );

  useEffect(() => {
    axios.get(`/api/auth/users?username=${slug}`).then((res) => {
      console.log(res.data);
      setDbUser(() => res.data);
    });
  }, [slug]);

  return (
    <>
      <section className="max-w-4xl mx-auto px-5 mt-12">
        {dbUser && (
          <div className="flex items-center flex-col gap-6 bg-base-200 p-6 rounded-lg">
            <Image
              src={dbUser.photo_url}
              width={100}
              height={100}
              className="rounded-full ring-primary"
              alt="profile"
            />
            <div>
              <h3 className="text-2xl font-semibold text-base-content">
                {dbUser.name}{" "}
                <span className="text-base-content-secondary">
                  {user && user.uid === dbUser._id && "(You)"}
                </span>
              </h3>
              <span className="text-base-content-secondary text-sm font-medium mt-2">
                @{dbUser.username}
              </span>
            </div>
          </div>
        )}
        <div className="mt-12 md:mt-20 flex gap-6">
          <Link href={`/${slug.replace("%40", "@")}`}>
            <Button
              variant="outline"
              onClick={() => setActiveBtn("Upvotes")}
              className={`rounded-full hover:text-primary hover:bg-primary/10 hover:border-transparent ${
                activeBtn === "Upvotes" &&
                "text-primary bg-primary/10 border-transparent"
              }`}
            >
              Upvotes
            </Button>
          </Link>
          <Link href={`/${slug.replace("%40", "@")}/products`}>
            <Button
              variant="outline"
              onClick={() => setActiveBtn("Products")}
              className={`rounded-full hover:text-primary hover:bg-primary/10 hover:border-transparent ${
                activeBtn === "Products" &&
                "text-primary bg-primary/10 border-transparent"
              }`}
            >
              Products
            </Button>
          </Link>
          <Link href={`/${slug.replace("%40", "@")}/discussions`}>
            <Button
              variant="outline"
              onClick={() => setActiveBtn("Discussions")}
              className={`rounded-full hover:text-primary hover:bg-primary/10 hover:border-transparent ${
                activeBtn === "Discussions" &&
                "text-primary bg-primary/10 border-transparent"
              }`}
            >
              Discussions
            </Button>
          </Link>
        </div>
        {children}
      </section>
    </>
  );
}
