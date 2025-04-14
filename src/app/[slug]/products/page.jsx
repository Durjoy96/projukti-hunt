"use client";

import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Products() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/profile/products?username=${slug}`)
      .then((res) => setProducts(() => res.data));
  }, []);
  return (
    <>
      <div className="max-w-4xl mt-8 grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
