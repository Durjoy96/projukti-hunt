"use client";

import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { slug } = useParams();
  const [upvotes, setUpvotes] = useState([]);

  useEffect(() => {
    axios.get(`/api/profile/upvotes?username=${slug}`).then((res) => {
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
