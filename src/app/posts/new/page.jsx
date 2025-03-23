"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import BasicInformation from "./components/BasicInformation";
import CommunityAndSocialLinks from "./components/CommunityAndSocialLinks";
import AdditionalFeatures from "./components/AdditionalFeatures";

export default function SubmitProduct() {
  const [activeTab, setActiveTab] = useState("basic-information");
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
          {activeTab === "basic-information" && <BasicInformation />}
          {activeTab === "community-social-links" && (
            <CommunityAndSocialLinks />
          )}
          {activeTab === "additional-features" && <AdditionalFeatures />}
        </div>
      </section>
    </>
  );
}
