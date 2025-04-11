"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Textarea from "./Textarea";
import Comment from "./Comment";
import { pusherClient } from "@/lib/pusher";

export default function Discussions({ product }) {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const channel = pusherClient.subscribe("comments");

    channel.bind("comments-updated", (newComment) => {
      newComment.replies = [];

      setDiscussions((prevDiscussions) => {
        // Prevent duplicates
        if (commentExists(prevDiscussions, newComment._id)) {
          return prevDiscussions;
        }

        const updated = JSON.parse(JSON.stringify(prevDiscussions));

        if (!newComment.parentId) {
          updated.push(newComment);
        } else {
          insertComment(updated, newComment);
        }

        return updated;
      });
    });

    axios.get(`/api/discussions?id=${product._id}`).then((res) => {
      organizeComments(res.data);
    });

    return () => {
      pusherClient.unsubscribe("comments");
    };
  }, [product._id]);

  // Turn flat comments into a nested tree
  const organizeComments = (data) => {
    const comments = data;
    const commentMap = {};
    const rootComments = [];

    comments.forEach((comment) => {
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    comments.forEach((comment) => {
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
  };

  // Recursively insert a reply into the tree
  const insertComment = (tree, newComment) => {
    for (let comment of tree) {
      if (comment._id === newComment.parentId) {
        comment.replies.push(newComment);
        return true;
      }

      if (insertComment(comment.replies, newComment)) {
        return true;
      }
    }

    return false;
  };

  const commentExists = (tree, id) => {
    for (let comment of tree) {
      if (comment._id === id) return true;
      if (commentExists(comment.replies, id)) return true;
    }
    return false;
  };

  return (
    <>
      <div className="mt-12">
        <Textarea product={product} />
      </div>

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
