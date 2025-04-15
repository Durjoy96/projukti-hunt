"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import ProductCard from "./ProductCard";

export default function TodayProducts() {
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
    });

    axios.get("/api/products/today").then((res) => {
      setProducts(() => res.data);
      console.log("db", res.data);
    });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("votes");
    };
  }, []);

  return (
    <>
      <h1 className="text-xl md:text-2xl font-medium text-base-content">
        Top Bangladeshi Products Launching Today
      </h1>
      <div className="max-w-4xl mt-8 grid">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
