import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

export default function Discussions() {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const textarea = textareaRef.current;
    setValue(e.target.value);

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  return (
    <>
      <div className="relative border-2 border-base-300 pb-14 rounded-lg bg-transparent">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          rows={6}
          placeholder="Type here..."
          className="w-full resize-none overflow-hidden p-3 text-base leading-relaxed focus:outline-none"
        />
        <Button className="absolute bottom-6 right-6" variant="outline">
          Comment
        </Button>
      </div>
    </>
  );
}
