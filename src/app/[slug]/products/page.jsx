"use client";

import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pusherClient } from "@/lib/pusher";
import NoData from "@/components/NoData";

export default function Products() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const channel = pusherClient.subscribe("votes");
    channel.bind("vote-updated", ({ productId, votes, voters }) => {
      setFilter((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, votes, voters } : product
        )
      );
    });

    axios.get(`/api/profile/products?username=${slug}`).then((res) => {
      setProducts(() => res.data);
      setFilter(() => res.data);
    });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("votes");
    };
  }, []);

  const valueChangeHandler = (e) => {
    if (e === "made") {
      setFilter(() =>
        products.filter(
          (product) =>
            product.makers.some((maker) => maker === product.hunter) && product
        )
      );
    } else if (e === "hunted") {
      setFilter(() =>
        products.filter(
          (product) =>
            !product.makers.some((maker) => maker === product.hunter) && product
        )
      );
    } else {
      setFilter(() => products);
    }
    console.log(filter);
  };

  return (
    <>
      {!products.length && <NoData />}
      {products.length < 0 && (
        <div className="flex justify-between items-center mt-8">
          <h3 className="text-lg md:text-xl font-bold text-base-content">
            {products.length} Submitted
          </h3>
          <Select defaultValue="all" onValueChange={valueChangeHandler}>
            <SelectTrigger className="w-[100px] cursor-pointer">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all" className="cursor-pointer">
                  All
                </SelectItem>
                <SelectItem value="made" className="cursor-pointer">
                  Made
                </SelectItem>
                <SelectItem value="hunted" className="cursor-pointer">
                  Hunted
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="max-w-4xl mt-8 grid">
        {filter.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
