import { Dot, ExternalLinkIcon, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Vote from "./Vote";

export default function ProductCard({ product }) {
  return (
    <>
      <Link href={`/posts/${product.title}`}>
        <div className="flex gap-4 items-start p-4 bg-transparent rounded-lg w-full hover:bg-base-200 cursor-pointer transition-all duration-200 ease-in-out group">
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
              <div className="flex items-center gap-2 group-hover:text-primary">
                <h3 className="text-lg font-medium text-base-content group-hover:text-primary">
                  {product.product_name}
                </h3>
                <ExternalLinkIcon
                  className="w-4 h-4 hidden group-hover:flex"
                  onClick={() => window.open(product.web_app_link, "_blank")}
                />
              </div>
              <p className="text-base font-normal text-base-content-secondary">
                {product.tagline}
              </p>
              {/* categories */}
              <p className="text-sm font-normal text-base-content-secondary items-center gap-2 mt-2 hidden md:flex">
                <Tags className="w-4 h-4 stroke-base-content-secondary" />{" "}
                <span className="flex items-center">
                  {product.category}{" "}
                  <Dot className="w-4 h-4 stroke-base-content-secondary" />{" "}
                  {product.subcategory}
                </span>
              </p>
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
