"use client";

import { useAuth } from "@/components/AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import Textarea from "./Textarea";
import Comment from "./Comment";

export default function Discussions({ product }) {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    axios.get(`/api/discussions?id=${product._id}`).then((res) => {
      const commentMap = {};
      const rootComments = [];

      res.data.forEach((comment) => {
        comment.replies = [];
        commentMap[comment._id] = comment;
      });

      res.data.forEach((comment) => {
        console.log(comment.parentId);
        if (comment.parentId) {
          const parent = commentMap[comment.parentId];
          if (parent) {
            parent.replies.push(comment);
          }
        } else {
          rootComments.push(comment);
        }
      });
      setDiscussions(() => rootComments);
    });
  }, [product._id]);

  return (
    <>
      <Textarea product={product} />

      <div>
        {discussions.map((discussion) => (
          <div key={discussion._id}>
            <Comment discussion={discussion} product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
