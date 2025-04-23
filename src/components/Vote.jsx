import axios from "axios";
import { Loader2, Triangle } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import SignInModal from "./sign-in-modal";

export default function Vote({ product }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const path = window.location.pathname.split("/")[1];

  const handleVote = async (e, productId) => {
    // Prevent default action and stop propagation
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);

    // Check if user is logged in
    if (!user) {
      document.getElementById("sign_in_modal").showModal();
      return;
    }
    try {
      const response = await axios.post(`/api/products/vote`, {
        productId,
        userId: user.uid,
      });
      if (response.data.success) {
        setLoading(false);
      }
      if (!response.data.success) {
        toast.error(response.data.error || "Failed to vote");
        setLoading(false);
      }
    } catch (error) {
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
          disabled={loading}
          onClick={(e) => handleVote(e, product._id)}
          className="grid w-14 h-14 text-base-content-secondary hover:border-primary hover:text-base-content"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Triangle
              className={`w-20 h-20 stroke-base-content ${
                product.voters &&
                product?.voters.some((voter) => voter === user?.uid) &&
                "stroke-primary fill-primary"
              }`}
            />
          )}

          {product.votes || 0}
        </Button>
      )}

      <SignInModal />
    </>
  );
}
