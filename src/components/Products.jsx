"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import ProductCard from "./ProductCard";

export default function Products({ endpoint }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Subscribe to Pusher channel
    const channel = pusherClient.subscribe("votes");
    channel.bind("vote-updated", ({ productId, votes, voters }) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, votes, voters } : product
        )
      );
      setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => b.votes - a.votes)
      );
    });

    axios.get(`/api/products/${endpoint}`).then((res) => {
      setProducts(() => res.data.sort((a, b) => b.votes - a.votes));
      console.log("db", res.data);
    });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("votes");
    };
  }, []);

  return (
    <>
      <div className="max-w-4xl mt-8 grid">
        {products.map((product, idx) => (
          <ProductCard product={product} idx={idx} key={product._id} />
        ))}
      </div>
    </>
  );
}
