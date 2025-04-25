import { Dot, ExternalLinkIcon, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Vote from "./Vote";

export default function ProductCard({ product, idx }) {
  const path = window.location.href.includes("@");
  return (
    <>
      <Link href={`/posts/${product.title}`}>
        <div className="flex gap-4 items-start py-4 md:p-4 bg-transparent rounded-lg w-full hover:bg-base-200 cursor-pointer transition-all duration-200 ease-in-out group">
          {" "}
          <div className="w-20 h-16 md:w-16 md:h-14 rounded-lg overflow-hidden">
            <Image
              src={product.logo_url}
              width={96}
              height={96}
              alt={product.product_name}
              className="rounded-lg w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div className="flex justify-between items-start w-full md:gap-6">
            <div>
              <div className="flex items-center gap-2 group-hover:text-primary">
                <h3 className="text-base md:text-lg font-medium text-base-content group-hover:text-primary truncate max-w-[180px] md:max-w-2xl">
                  {!isNaN(idx) && idx + 1 + "."} {product.product_name}
                </h3>
                <ExternalLinkIcon
                  className="w-4 h-4 hidden group-hover:flex"
                  onClick={() => window.open(product.web_app_link, "_blank")}
                />
              </div>
              <p className="text-sm md:text-base font-normal text-base-content-secondary truncate max-w-[180px] md:max-w-2xl">
                {product.tagline}
              </p>
              {/* categories */}
              {!path && (
                <p className="text-sm font-normal text-base-content-secondary items-center gap-2 mt-2 hidden md:flex">
                  <Tags className="w-4 h-4 stroke-base-content-secondary" />{" "}
                  <span className="flex items-center">
                    {product.category}{" "}
                    <Dot className="w-4 h-4 stroke-base-content-secondary" />{" "}
                    {product.subcategory}
                  </span>
                </p>
              )}
            </div>
            <div>
              <Vote product={product} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
