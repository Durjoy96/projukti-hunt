import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { Check, CircleX, Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Textarea({
  product,
  parentId,
  username,
  setIsReplying,
}) {
  const { user } = useAuth();
  const textareaRef = useRef(null);
  const [comment, setComment] = useState("");
  const [mentioning, setMentioning] = useState(parentId && true);
  const [loading, setLoading] = useState(false);

  const onComment = () => {
    setLoading(true); //start loading
    if (!user) {
      document.getElementById("sign_in_modal").showModal();
      setLoading(false); //stop loading
      return;
    } // no comment is allowed without signin

    if (!comment) {
      setLoading(false); //stop loading
      toast.error("Oops! No text entered");
      return;
    } // no content alert

    const commentInfo = {
      postId: product._id,
      parentId: parentId || null,
      content: comment,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      mentions: null,
    };

    if (mentioning) {
      commentInfo.mentions = [username]; //store the mentions
    } else {
      delete commentInfo.mentions;
    }

    axiosInstance
      .post("/discussions", commentInfo)
      .then(() => {
        setComment(""); //clear textarea
        setLoading("done"); //display done icon

        setTimeout(() => {
          parentId && setIsReplying((prev) => !prev); //close the reply textarea
          setLoading(false);
        }, 2000); //stop loading after 1 second
      })
      .catch((error) => {
        toast.error(error.message || "Failed to comment");
        setLoading(false); //stop loading
      });
  };

  const handleChange = (e) => {
    const textarea = textareaRef.current;
    setComment(() => e.target.value);

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div
      className={`relative border-2 border-base-300 pb-14 rounded-lg bg-transparent ${
        parentId && "mt-3"
      }`}
    >
      {/* auto reply mentioning */}
      {username && mentioning && (
        <div className="inline-flex items-center gap-1 pt-3 px-3 group">
          <p className="whitespace-pre-wrap break-words text-primary font-medium pointer-events-none">
            {"@" + username}
          </p>
          <span
            className="md:hidden group-hover:inline cursor-pointer"
            onClick={() => setMentioning(() => false)}
          >
            <CircleX className="w-4 h-4 hover:stroke-primary" />
          </span>
        </div>
      )}
      <textarea
        ref={textareaRef}
        value={comment}
        onChange={handleChange}
        rows={4}
        placeholder="What do you think?..."
        className="w-full resize-none overflow-hidden p-3 text-base leading-relaxed focus:outline-none"
      />
      <div className="absolute bottom-6 right-6 flex items-center gap-6">
        {parentId && (
          <button
            onClick={() => setIsReplying((prev) => !prev)}
            className="text-base font-semibold text-base-content hover:text-primary transition-all delay-200 cursor-pointer"
          >
            Cancel
          </button>
        )}

        <Button onClick={onComment} variant="outline" disabled={loading}>
          {/* default button text */}
          {loading === false && "Comment"}
          {/* loading button text */}
          {loading === true && (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" /> Comment
            </div>
          )}
          {/* done button text */}
          {loading === "done" && (
            <div className="flex items-center gap-2">
              <Check className="animate-pulse" />
              Commented!
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
