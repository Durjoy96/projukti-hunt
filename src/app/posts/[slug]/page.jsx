"use client";

import { Button } from "@/components/ui/button";
import Vote from "@/components/Vote";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const channel = pusherClient.subscribe("votes");
    channel.bind("vote-updated", ({ productId, votes, voters }) => {
      setProduct((prevProducts) =>
        prevProducts._id === productId
          ? { ...prevProducts, votes, voters }
          : prevProducts
      );
    });

    axios
      .get(`/api/products/details?title=${slug}`)
      .then((res) => {
        if (res.data) {
          setProduct(() => res.data);
        } else {
          toast.error("Product not found");
        }
      })
      .catch((error) => {
        console.log("Error fetching product details:", error.message);
        toast.error("Failed to fetch product details. Please try again later.");
      });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("votes");
    };
  }, [slug]);
  return (
    <>
      <section className="max-w-5xl mx-auto px-5 mt-12">
        {product && (
          <>
            {/* breadcrumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                <li className="text-base-content-secondary">
                  <Link href="/">Home</Link>
                </li>
                <li>{product.product_name}</li>
              </ul>
            </div>
            <div className="mt-8 relative">
              {/* banner */}
              {product.banners_url ? (
                <Image
                  src={product.banners_url[0]}
                  alt={product.product_name}
                  width={1000}
                  height={500}
                  className="w-full h-auto object-cover object-center"
                />
              ) : (
                <div className="w-full h-72 bg-base-200 rounded-lg"></div>
              )}
              {/* product details */}
              <div className="absolute bottom-0 bg-base-100/50 backdrop-blur-md w-full p-5 rounded-lg">
                <div className="md:flex md:justify-between md:items-center">
                  <div className="flex items-start gap-6">
                    <Image
                      src={product.logo_url}
                      width={72}
                      height={72}
                      className="rounded-lg"
                      alt={product.product_name}
                    />
                    <div>
                      <h1 className="text-xl font-medium text-base-content">
                        {product.product_name}
                      </h1>
                      <p className="text-base font-normal text-base-content-secondary mt-1">
                        {product.tagline}
                      </p>
                    </div>
                  </div>
                  {/* buttons */}
                  <div className="flex items-center gap-4 mt-8 md:mt-0">
                    <Link href={product.web_app_link} target="_blank">
                      <Button variant="outline">
                        {" "}
                        <ExternalLink /> Visit
                      </Button>
                    </Link>
                    <Vote product={product} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
