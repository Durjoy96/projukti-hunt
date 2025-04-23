import Image from "next/image";
import React, { useState } from "react";
import Textarea from "./Textarea";
import { Clock, MessageCircle } from "lucide-react";
import Maker from "@/components/Maker";
import Hunter from "@/components/Hunter";
import Link from "next/link";
import { timeAgo } from "@/lib/timeago";

export default function Comment({ discussion, product }) {
  const [isReplying, setIsReplying] = useState(false);
  return (
    <>
      <div
        className={`${
          discussion.parentId
            ? ` ${
                discussion.replies.length > 0 ? "ml-10 pl-2 border-l " : "ml-12"
              }`
            : `${
                discussion.replies.length > 0
                  ? "ml-0 mt-10 pl-2 border-l"
                  : "ml-0 mt-12"
              }`
        }`}
      >
        <div className="flex items-start gap-2">
          <Link href={`/@${discussion?.author?.username}`}>
            <Image
              src={discussion?.author?.photo_url}
              width={32}
              height={32}
              alt={discussion?.author?.name}
              className="rounded-full"
            />
          </Link>
          <div className="w-full pb-4">
            <div className="flex items-center gap-2">
              <Link href={`/@${discussion?.author?.username}`}>
                <span className="text-base font-semibold text-base-content hover:text-base-content/80 transition-all delay-200">
                  {discussion?.author?.name}
                </span>
              </Link>
              {product.makers.some((id) => id === discussion.userId) ? (
                <Maker />
              ) : (
                product.hunter === discussion.userId && <Hunter />
              )}
            </div>

            <p className="mt-2 text-base-content-secondary text-base font-normal whitespace-pre-wrap">
              {/* display mentions */}
              {discussion.mentions && (
                <Link href={`/@${discussion.mentions}`}>
                  <span className="text-primary font-medium hover:text-primary/80 transition-all delay-200">
                    @{discussion.mentions}
                  </span>{" "}
                </Link>
              )}
              &nbsp;&nbsp;
              {discussion.content}
            </p>
            <div className="mt-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsReplying((prev) => !prev)}
                  className="cursor-pointer text-sm font-semibold text-base-content-secondary flex items-center gap-1 hover:text-primary transition-all delay-200"
                >
                  <MessageCircle className="w-4.5 h-4.5 stroke-[1.5]" /> Reply
                </button>
                <span className="flex items-center gap-1 text-sm font-normal text-base-content-secondary">
                  <Clock className="w-4.5 h-4.5 stroke-[1.5]" />
                  {timeAgo(discussion.createdAt)}
                </span>
              </div>
              {isReplying && (
                <Textarea
                  product={product}
                  parentId={discussion._id}
                  username={discussion?.author?.username}
                  setIsReplying={setIsReplying}
                />
              )}
            </div>
          </div>
        </div>
        {discussion.replies.map((reply) => (
          <Comment key={reply._id} discussion={reply} product={product} />
        ))}
      </div>
    </>
  );
}
