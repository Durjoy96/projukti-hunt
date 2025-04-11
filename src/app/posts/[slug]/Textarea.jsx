import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useRef, useState } from "react";

export default function Textarea({ product, parentId }) {
  const { user } = useAuth();
  const textareaRef = useRef(null);
  const [comment, setComment] = useState("");

  const onComment = () => {
    const commentInfo = {
      postId: product._id,
      parentId: parentId || null,
      content: comment,
      userId: user.uid,
    };
    axios.post("/api/discussions", commentInfo).then((res) => {
      console.log(res);
    });
  };

  const handleChange = (e) => {
    const textarea = textareaRef.current;
    setComment(() => e.target.value);

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="relative border-2 border-base-300 pb-14 rounded-lg bg-transparent">
      <textarea
        ref={textareaRef}
        value={comment}
        onChange={handleChange}
        rows={4}
        placeholder="What do you think?..."
        className="w-full resize-none overflow-hidden p-3 text-base leading-relaxed focus:outline-none"
      />
      <Button
        onClick={onComment}
        className="absolute bottom-6 right-6"
        variant="outline"
      >
        Comment
      </Button>
    </div>
  );
}
