"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Button } from "./ui/button";
import CardSkeleton from "./CardSkeleton";

export default function Products({ endpoint }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("votes");
    };
  }, []);

  return (
    <>
      <div className="max-w-4xl mt-8 grid">
        {/* no products */}
        {products.length === 0 && (
          <div>
            {endpoint === "today" && loading === false && (
              <div>
                <p className="text-base-content-secondary text-base -mt-6">
                  No products launched today.
                </p>
                <Link href="/posts/new" className="mt-6 inline-block">
                  <Button>Launch a Product</Button>
                </Link>
              </div>
            )}
            {endpoint === "yesterday" && loading === false && (
              <p className="text-base-content-secondary text-base -mt-6">
                No products launched yesterday.
              </p>
            )}
            {endpoint === "last-weeks" && loading === false && (
              <p className="text-base-content-secondary text-base -mt-6">
                No products launched last week.
              </p>
            )}
            {endpoint === "last-months" && loading === false && (
              <p className="text-base-content-secondary text-base -mt-6">
                No products launched last month.
              </p>
            )}
          </div>
        )}

        {/* loading skeleton */}
        {loading && <CardSkeleton />}

        {/* products */}
        {products.map((product, idx) => (
          <ProductCard product={product} idx={idx} key={product._id} />
        ))}
      </div>
    </>
  );
}
