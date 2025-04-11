import Image from "next/image";
import React, { useState } from "react";
import Textarea from "./Textarea";
import { MessageCircle } from "lucide-react";

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
          <Image
            src={discussion?.author?.photo_url}
            width={32}
            height={32}
            alt={discussion?.author?.name}
            className="rounded-full"
          />
          <div className="w-full pb-4">
            <span className="text-base font-semibold text-base-content">
              {discussion?.author?.name}
            </span>
            <p className="mt-2 text-base-content-secondary text-base font-normal">
              {discussion.content}
            </p>
            <div className="mt-3">
              <button
                onClick={() => setIsReplying((prev) => !prev)}
                className="cursor-pointer text-sm font-semibold text-base-content-secondary flex items-center gap-1 hover:text-primary transition-all delay-200"
              >
                <MessageCircle className="w-4.5 h-4.5 stroke-[1.5]" /> Reply
              </button>
              {isReplying && (
                <Textarea
                  product={product}
                  parentId={discussion._id}
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
