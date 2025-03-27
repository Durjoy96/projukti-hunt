"use client";

import { useState } from "react";
import BasicInformation from "./components/BasicInformation";
import CommunityAndSocialLinks from "./components/CommunityAndSocialLinks";
import AdditionalFeatures from "./components/AdditionalFeatures";
import { Button } from "@/components/ui/button";

export default function SubmitProduct() {
  const [activeTab, setActiveTab] = useState("basic-information");
  const [submissionInfo, setSubmissionInfo] = useState({
    product_name: "",
    tagline: "",
    description: "",
    logo: "",
    preview_logo: null,
    preview_banner_1: null,
    preview_banner_2: null,
    preview_banner_3: null,
    web_app_link: "https://",
    category: null,
    subcategory: null,
  });
  console.log(submissionInfo);
  return (
    <>
      <section className="max-w-7xl mx-auto px-5 mt-12 md:mt-20 grid grid-cols-[0.3fr_1fr] gap-12">
        <div className="flex flex-col gap-2">
          <button
            className={`text-left hover:bg-base-300 pl-4 py-3 rounded-lg text-base-content font-medium cursor-pointer ${
              activeTab === "basic-information" &&
              "bg-primary/20 hover:bg-primary/20"
            }`}
            onClick={() => setActiveTab("basic-information")}
          >
            Basic Information
          </button>
          <button
            className={`text-left hover:bg-base-300 pl-4 py-3 rounded-lg text-base-content font-medium cursor-pointer ${
              activeTab === "community-social-links" &&
              "bg-primary/20 hover:bg-primary/20"
            }`}
            onClick={() => setActiveTab("community-social-links")}
          >
            Community & Social Links
          </button>
          <button
            className={`text-left hover:bg-base-300 pl-4 py-3 rounded-lg text-base-content font-medium cursor-pointer ${
              activeTab === "additional-features" &&
              "bg-primary/20 hover:bg-primary/20"
            }`}
            onClick={() => setActiveTab("additional-features")}
          >
            Additional Features
          </button>
        </div>
        <div>
          {activeTab === "basic-information" && (
            <BasicInformation
              setSubmissionInfo={setSubmissionInfo}
              submissionInfo={submissionInfo}
            />
          )}
          {activeTab === "community-social-links" && (
            <CommunityAndSocialLinks />
          )}
          {activeTab === "additional-features" && <AdditionalFeatures />}
          <div className="mt-12 flex justify-end">
            <Button
              variant="outline"
              onClick={() => setActiveTab("community-social-links")}
            >
              Next:{" "}
              {activeTab === "basic-information" && "Community & Social Links"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
