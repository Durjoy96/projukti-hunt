import axios from "axios";
import { Triangle } from "lucide-react";
import React from "react";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import SignInModal from "./sign-in-modal";

export default function Vote({ product }) {
  const { user } = useAuth();

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
      <SignInModal />
    </>
  );
}
