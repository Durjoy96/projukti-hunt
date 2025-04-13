"use client";

import { useAuth } from "@/components/AuthProvider";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const { slug } = useParams();
  const [upvotes, setUpvotes] = useState([]);
  const [dbUser, setDbUser] = useState([]);
  const [activeBtn, setActiveBtn] = useState("Upvotes");

  useEffect(() => {
    axios.get(`/api/auth/users?username=${slug}`).then((res) => {
      console.log(res.data);
      setDbUser(() => res.data);
    });

    axios.get(`/api/profile?username=${slug}`).then((res) => {
      console.log(res);
      setUpvotes(() => res.data);
    });
  }, [slug]);

  return (
    <>
      {" "}
      <div className="max-w-4xl mt-8 grid">
        {upvotes.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
