import Image from "next/image";
import React, { useState } from "react";
import Textarea from "./Textarea";

export default function Comment({ discussion, product }) {
  const [isReply, setIsReply] = useState(false);
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
                onClick={() => setIsReply((prev) => !prev)}
                className="cursor-pointer text-base-content"
              >
                Reply
              </button>
              {isReply && (
                <Textarea product={product} parentId={discussion._id} />
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
