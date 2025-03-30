"use client";

import { useState } from "react";
import BasicInformation from "./components/BasicInformation";
import CommunityAndSocialLinks from "./components/CommunityAndSocialLinks";
import AdditionalFeatures from "./components/AdditionalFeatures";
import { Button } from "@/components/ui/button";
import LaunchChecklist from "./components/LaunchChecklist";

export default function SubmitProduct() {
  const [activeTab, setActiveTab] = useState("basic-information");
  const [disabled, setDisabled] = useState(true);
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
    maker: true,
    hunter: false,
  });
  console.log(submissionInfo);
  return (
    <>
      <section className="max-w-7xl mx-auto px-5 mt-12 md:mt-20 grid grid-cols-[0.3fr_1fr] gap-12">
        {/* sidebar */}
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
          <button
            className={`text-left hover:bg-base-300 pl-4 py-3 rounded-lg text-base-content font-medium cursor-pointer ${
              activeTab === "launch-checklist" &&
              "bg-primary/20 hover:bg-primary/20"
            }`}
            onClick={() => setActiveTab("launch-checklist")}
          >
            Launch Checklist
          </button>
        </div>
        {/* show the selected component */}
        <div>
          {activeTab === "basic-information" && (
            <BasicInformation
              setSubmissionInfo={setSubmissionInfo}
              submissionInfo={submissionInfo}
            />
          )}
          {activeTab === "community-social-links" && (
            <CommunityAndSocialLinks
              setSubmissionInfo={setSubmissionInfo}
              submissionInfo={submissionInfo}
            />
          )}
          {activeTab === "additional-features" && (
            <AdditionalFeatures
              setSubmissionInfo={setSubmissionInfo}
              submissionInfo={submissionInfo}
            />
          )}
          {activeTab === "launch-checklist" && (
            <LaunchChecklist
              setSubmissionInfo={setSubmissionInfo}
              submissionInfo={submissionInfo}
            />
          )}
          {/* Next Component Button */}
          <div className="mt-12 flex justify-start">
            {activeTab === "basic-information" && (
              <Button
                variant="outline"
                onClick={() => setActiveTab("community-social-links")}
              >
                Next: Community & Social Links
              </Button>
            )}
            {activeTab === "community-social-links" && (
              <Button
                variant="outline"
                onClick={() => setActiveTab("additional-features")}
              >
                Next: Additional Features
              </Button>
            )}
            {activeTab === "additional-features" && (
              <Button
                variant="outline"
                onClick={() => setActiveTab("launch-checklist")}
              >
                Next: Launch Checklist
              </Button>
            )}
            {activeTab === "launch-checklist" && (
              <Button
                disabled={
                  !submissionInfo.product_name ||
                  !submissionInfo.tagline ||
                  !submissionInfo.description ||
                  !submissionInfo.web_app_link.includes(".") ||
                  !submissionInfo.category ||
                  !submissionInfo.logo
                }
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
