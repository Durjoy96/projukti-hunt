"use client";

import CardSkeleton from "@/components/CardSkeleton";
import NoData from "@/components/NoData";
import ProductCard from "@/components/ProductCard";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const channel = pusherClient.subscribe("votes");
    channel.bind("vote-updated", ({ productId, votes, voters }) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, votes, voters } : product
        )
      );
    });

    axios.get(`/api/profile/upvotes?username=${slug}`).then((res) => {
      setProducts(() => res.data);
      setLoading(false);
    });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("votes");
    };
  }, [slug]);

  return (
    <>
      {!products.length && !loading && <NoData />}
      {products.length > 0 && (
        <h3 className="text-lg md:text-xl font-bold text-base-content mt-8">
          {products.length} Upvotes
        </h3>
      )}
      <div className="max-w-4xl mt-8 grid">
        {loading && <CardSkeleton />}
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
