"use client";

import Hunter from "@/components/Hunter";
import Maker from "@/components/Maker";
import { Button } from "@/components/ui/button";
import Vote from "@/components/Vote";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import {
  Dot,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Users,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [hunter, setHunter] = useState(null);
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

  //hunter details
  useEffect(() => {
    axios
      .get(`/api/auth/users?uid=${product?.hunter}`)
      .then((res) => {
        setHunter(() => res.data);
      })
      .catch((error) => {
        console.log("Error fetching product details:", error.message);
        toast.error("Hunter not found");
      });
  }, [product]);

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
                  height={300}
                  className="w-full h-72 object-cover object-top rounded-tr-lg rounded-tl-lg"
                />
              ) : (
                <div className="w-full h-72 bg-base-200 rounded-lg"></div>
              )}
              {/* product details */}
              <div className="absolute bottom-0 bg-base-100/50 backdrop-blur-md w-full p-5 rounded-tr-lg rounded-tl-lg">
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
            {/* description */}
            <div className="mt-8">
              <p className="text-base font-normal text-base-content-secondary mt-4">
                {product.description}
              </p>
            </div>
            {/* pricing */}
            <span className="text-base text-base-content-secondary font-normal inline-block mt-8">
              {product.pricing}
            </span>
            <div className="flex justify-center md:justify-between md:items-center mt-2">
              {/* categories */}
              <div className="md:flex items-center gap-2 hidden">
                <span className="text-base text-base-content">
                  Categories:{" "}
                </span>
                <p className="text-base font-normal text-base-content-secondary items-center gap-2">
                  <span className="flex items-center">
                    <span>{product.category}</span>
                    <Dot className="w-4 h-4 stroke-base-content-secondary" />{" "}
                    <span>{product.subcategory}</span>
                  </span>
                </p>
              </div>
              {/* product social accounts */}
              <div className="flex items-center gap-4">
                {product.fb_page && (
                  <Link href={product.fb_page} target="_blank">
                    <Facebook className="w-6 h-6 stroke-[1.5] hover:stroke-primary" />
                  </Link>
                )}
                {product.fb_group && (
                  <Link href={product.fb_group} target="_blank">
                    <UsersRound className="w-6 h-6 stroke-[1.5] hover:stroke-primary" />
                  </Link>
                )}
                {product.instagram && (
                  <Link href={product.instagram} target="_blank">
                    <Instagram className="w-6 h-6 stroke-[1.5] hover:stroke-primary" />
                  </Link>
                )}
                {product.linkedin && (
                  <Link href={product.linkedin} target="_blank">
                    <Linkedin className="w-6 h-6 stroke-[1.5] hover:stroke-primary" />
                  </Link>
                )}
              </div>
            </div>
            <div className="p-6 bg-base-200 rounded-lg mt-8 flex justify-between items-center">
              <span className="flex items-center gap-2 text-base font-semibold text-base-content">
                <Users /> Meet the team
              </span>
              {/* hunter details */}
              {hunter && (
                <div className="flex items-center gap-2">
                  <Image
                    src={hunter?.photo_url}
                    alt={hunter?.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="grid gap-2">
                    <span className="text-base font-semibold text-base-content">
                      {hunter?.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Hunter />
                      {product.makers.length > 0 && <Maker />}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
