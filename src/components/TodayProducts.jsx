"use client";

import axios from "axios";
import { Dot, Tags, Triangle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export default function TodayProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const socket = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    );

    // Listen for vote updates
    socket.on("voteUpdate", ({ productId, votes }) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, votes } : product
        )
      );
    });

    axios.get("/api/products/today").then((res) => {
      setProducts(() => res.data);
      console.log("db", res.data);
    });

    return () => socket.disconnect();
  }, []);

  const handleVote = async (productId) => {
    try {
      const response = await axios.post(`/api/products/vote`, { productId });
      if (response.data.success) {
        toast.success("Voted!");
      } else {
        toast.error(response.data.error || "Failed to vote");
      }
    } catch (error) {
      console.error("Vote error:", error);
      toast.error(error.response?.data?.error || "Failed to vote");
    }
  };

  return (
    <>
      <div className="max-w-4xl mt-8 grid gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex gap-4 items-start p-6 bg-base-100 rounded-lg w-full hover:bg-base-100/80 hover:shadow-sm cursor-pointer transition-all duration-200 ease-in-out"
          >
            <div>
              <Image
                src={product.logo_url}
                width={48}
                height={48}
                alt={product.product_name}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-between items-start w-full">
              <div>
                <h3 className="text-lg font-medium text-base-content">
                  {product.product_name}
                </h3>
                <p className="text-base font-normal text-base-content-secondary">
                  {product.tagline}
                </p>
                <p className="text-sm font-normal text-base-content-secondary flex items-center gap-2 mt-2">
                  <Tags className="w-4 h-4 stroke-base-content-secondary" />{" "}
                  <span className="flex items-center">
                    {product.category}{" "}
                    <Dot className="w-4 h-4 stroke-base-content-secondary" />{" "}
                    {product.subcategory}
                  </span>
                </p>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => handleVote(product._id)}
                  className="grid w-14 h-14"
                >
                  <Triangle className="w-20 h-20" />
                  {product.votes}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
