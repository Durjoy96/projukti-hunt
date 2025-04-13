"use client";

import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { slug } = useParams();
  const [upvotes, setUpvotes] = useState([]);
  const [dbUser, setDbUser] = useState([]);

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
      <section className="max-w-5xl mx-auto px-5 mt-12">
        {dbUser && <p>{dbUser.username}</p>}
        <div className="max-w-4xl mt-8 grid">
          {upvotes.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </section>
    </>
  );
}
