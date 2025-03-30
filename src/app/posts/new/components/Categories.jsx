"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories({ submissionInfo, setSubmissionInfo }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("/categories.json").then((res) => {
      setCategories(() => res.data);
      console.log(res.data);
    });
  }, []);

  const ValueChangeHandler = (e) => {
    const category = categories.find((category) =>
      category.subcategories.find((sub) => sub === e)
    );

    if (category) {
      setSubmissionInfo({
        ...submissionInfo,
        category: category.category,
        subcategory: e,
      });
    }
  };
  return (
    <>
      <Label htmlFor="web_app_link">Category</Label>
      <Select onValueChange={ValueChangeHandler}>
        <SelectTrigger className="w-full bg-base-100 cursor-pointer">
          <SelectValue
            placeholder={submissionInfo.subcategory || "Select a category"}
          />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category, idx) => (
            <SelectGroup key={idx}>
              <SelectLabel>{category.category}</SelectLabel>
              {category.subcategories.map((subcategory, idx) => (
                <SelectItem
                  value={subcategory}
                  key={idx}
                  className="cursor-pointer"
                >
                  {subcategory}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
