import axios from "axios";
import { Triangle } from "lucide-react";
import React from "react";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import SignInModal from "./sign-in-modal";

export default function Vote({ product }) {
  const { user } = useAuth();
  const path = window.location.pathname.split("/")[1];

  const handleVote = async (e, productId) => {
    // Prevent default action and stop propagation
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      document.getElementById("sign_in_modal").showModal();
      return;
    }
    try {
      const response = await axios.post(`/api/products/vote`, {
        productId,
        userId: user.uid,
      });
      if (!response.data.success) {
        toast.error(response.data.error || "Failed to vote");
      }
    } catch (error) {
      console.error("Vote error:", error);
      toast.error(error.response?.data?.error || "Failed to vote");
    }
  };

  return (
    <>
      {path === "posts" ? (
        <Button
          onClick={(e) => handleVote(e, product._id)}
          className="flex items-center gap-2 font-medium text-primary-content hover:border-primary hover:text-primary-content"
        >
          <Triangle
            className={`w-20 h-20 stroke-primary-content ${
              product.voters &&
              product?.voters.some((voter) => voter === user?.uid) &&
              "stroke-primary-content fill-primary-content"
            }`}
          />{" "}
          <span>
            {product.voters &&
            product?.voters.some((voter) => voter === user?.uid)
              ? "Upvoted"
              : "Upvote"}
          </span>
          <span>{product.votes || 0}</span>
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={(e) => handleVote(e, product._id)}
          className="grid w-14 h-14 text-base-content-secondary hover:border-primary hover:text-base-content"
        >
          <Triangle
            className={`w-20 h-20 stroke-base-content ${
              product.voters &&
              product?.voters.some((voter) => voter === user?.uid) &&
              "stroke-primary fill-primary"
            }`}
          />
          {product.votes || 0}
        </Button>
      )}

      <SignInModal />
    </>
  );
}
