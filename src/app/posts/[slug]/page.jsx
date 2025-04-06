"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function ProductDetails() {
  const { slug } = useParams();
  console.log(slug);
  return (
    <>
      <div>
        <h1>product details</h1>
      </div>
    </>
  );
}
