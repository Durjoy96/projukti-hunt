"use client";

import { timeAgo } from "@/lib/timeago";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Discussions() {
  const { slug } = useParams();
  const [discussions, setDiscussions] = useState([]);
  console.log(window.location.href);
  useEffect(() => {
    axios.get(`/api/profile/discussions?username=${slug}`).then((res) => {
      setDiscussions(() => res.data);
    });
  }, [slug]);

  return (
    <div className="grid gap-6 mt-8">
      {[...discussions].reverse().map((discussion) => (
        <div key={discussion._id} className="bg-base-200 p-6 rounded-lg w-full">
          <div>
            {discussion.mentions ? (
              <span className="font-medium text-base-content">
                Replied to{" "}
                <Link
                  className="text-primary hover:text-primary/80"
                  href={`/@${discussion.mentions[0]}`}
                >
                  @{discussion?.mentions[0]}
                </Link>{" "}
                on{" "}
                <Link
                  className="text-primary hover:text-primary/80"
                  href={`/posts/${discussion?.product?.title}`}
                >
                  {discussion?.product?.product_name}
                </Link>{" "}
                <span className="text-sm font-normal text-base-content-secondary">
                  {timeAgo(discussion.createdAt)}
                </span>
              </span>
            ) : (
              <span className="font-medium text-base-content">
                Commented on{" "}
                <Link
                  className="text-primary hover:text-primary/80"
                  href={`/posts/${discussion?.product?.title}`}
                >
                  {discussion?.product?.product_name}
                </Link>{" "}
                <span className="text-sm font-normal text-base-content-secondary">
                  {timeAgo(discussion.createdAt)}
                </span>
              </span>
            )}
            <p className="whitespace-pre-wrap text-base font-normal text-base-content-secondary italic mt-2">
              "{discussion.content}"
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
