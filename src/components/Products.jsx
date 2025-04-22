"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Button } from "./ui/button";

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
    });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("votes");
    };
  }, []);

  return (
    <>
      <div className="max-w-4xl mt-8 grid">
        {products.length === 0 && (
          <div>
            {endpoint === "today" && (
              <div>
                <p className="text-base-content-secondary text-base -mt-6">
                  No products launched today.
                </p>
                <Link href="/posts/new" className="mt-6 inline-block">
                  <Button>Launch a Product</Button>
                </Link>
              </div>
            )}
            {endpoint === "yesterday" && (
              <p className="text-base-content-secondary text-base -mt-6">
                No products launched yesterday.
              </p>
            )}
            {endpoint === "last-weeks" && (
              <p className="text-base-content-secondary text-base -mt-6">
                No products launched last week.
              </p>
            )}
            {endpoint === "last-months" && (
              <p className="text-base-content-secondary text-base -mt-6">
                No products launched last month.
              </p>
            )}
          </div>
        )}
        {products.map((product, idx) => (
          <ProductCard product={product} idx={idx} key={product._id} />
        ))}
      </div>
    </>
  );
}
