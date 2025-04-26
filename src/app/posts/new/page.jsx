"use client";

import { useState } from "react";
import BasicInformation from "./components/BasicInformation";
import CommunityAndSocialLinks from "./components/CommunityAndSocialLinks";
import AdditionalFeatures from "./components/AdditionalFeatures";
import { Button } from "@/components/ui/button";
import LaunchChecklist from "./components/LaunchChecklist";
import { CircleCheck, Info, Loader2, MessageCircle, Plus } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/components/AuthProvider";
import toast from "react-hot-toast";
import SuccessModal from "@/components/SuccessModal";

export default function SubmitProduct() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("basic-information");
  const [loading, setLoading] = useState(false);
  const [submissionInfo, setSubmissionInfo] = useState({
    product_name: "",
    tagline: "",
    description: "",
    logo: null,
    preview_logo: null,
    preview_banner_1: null,
    preview_banner_2: null,
    preview_banner_3: null,
    banners: [],
    banners_url: [],
    web_app_link: "https://",
    category: null,
    subcategory: null,
    makers: true,
    hunter: true,
    title: null,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  console.log(submissionInfo);
  const submitBtnHandler = async () => {
    setLoading(true);
    //remove the unnecessary keys
    delete submissionInfo.preview_logo;
    delete submissionInfo.preview_banner_1;
    delete submissionInfo.preview_banner_2;
    delete submissionInfo.preview_banner_3;

    submissionInfo.title = submissionInfo?.product_name
      .replaceAll(" ", "-")
      .toLowerCase(); //add the title

    submissionInfo.hunter = user && user?.uid; //add the hunter id
    submissionInfo.makers = user && submissionInfo.makers ? [user.uid] : []; //add the maker id

    //get logo url
    submissionInfo.logo &&
      (await axios
        .post("/api/upload-image", { img: submissionInfo.logo })
        .then((res) => {
          console.log(res.data.data.display_url);
          delete submissionInfo.logo;
          submissionInfo.logo_url = res.data.data.display_url;
        })
        .catch((error) => {
          console.log(error.message);
        }));

    //banners url
    if (submissionInfo.banners && submissionInfo.banners.length > 0) {
      for (let [index, banner] of submissionInfo.banners.entries()) {
        await axios
          .post("/api/upload-image", { img: banner })
          .then((res) => {
            console.log(res.data);
            if (submissionInfo.banners.length - 1 === index) {
              delete submissionInfo.banners;
            }
            submissionInfo.banners_url = [
              ...submissionInfo.banners_url,
              res.data.data.display_url,
            ];
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } else {
      delete submissionInfo.banners;
      delete submissionInfo.banners_url;
    }

    // store on the db
    await axios
      .post("/api/submissions", submissionInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          setLoading(false);
          document.getElementById("success_modal").showModal();
          setSubmissionInfo({
            product_name: "",
            tagline: "",
            description: "",
            logo: null,
            preview_logo: null,
            preview_banner_1: null,
            preview_banner_2: null,
            preview_banner_3: null,
            banners: [],
            banners_url: [],
            web_app_link: "https://",
            category: null,
            subcategory: null,
            makers: true,
            hunter: true,
            title: null,
            status: "pending",
            createdAt: new Date().toISOString(),
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <>
      <section className="max-w-7xl mx-auto px-5 mt-12 md:mt-20 grid lg:grid-cols-[0.3fr_1fr] gap-12 pb-12 md:pb-20 lg:pb-32">
        {/* sidebar */}
        <div className="flex flex-col gap-2">
          <button
            className={`text-left hover:bg-base-300 pl-4 py-3 rounded-lg text-base-content font-medium cursor-pointer flex items-center gap-2 ${
              activeTab === "basic-information" &&
              "bg-primary/20 hover:bg-primary/20 text-primary"
            }`}
            onClick={() => setActiveTab("basic-information")}
          >
            <Info
              className={`w-6 h-6 stroke-base-content-secondary ${
                activeTab === "basic-information" && "stroke-primary"
              }`}
            />{" "}
            Basic Information
          </button>
          <button
            className={`text-left hover:bg-base-300 pl-4 py-3 rounded-lg text-base-content font-medium cursor-pointer flex items-center gap-2 ${
              activeTab === "community-social-links" &&
              "bg-primary/20 hover:bg-primary/20 text-primary"
            }`}
            onClick={() => setActiveTab("community-social-links")}
          >
            <MessageCircle
              className={`w-6 h-6 stroke-base-content-secondary ${
                activeTab === "community-social-links" && "stroke-primary"
              }`}
            />{" "}
            Community & Social Links
          </button>
          <button
            className={`text-left hover:bg-base-300 pl-4 py-3 rounded-lg text-base-content font-medium cursor-pointer flex items-center gap-2 ${
              activeTab === "additional-features" &&
              "bg-primary/20 hover:bg-primary/20 text-primary"
            }`}
            onClick={() => setActiveTab("additional-features")}
          >
            <Plus
              className={`w-6 h-6 stroke-base-content-secondary ${
                activeTab === "additional-features" && "stroke-primary"
              }`}
            />{" "}
            Additional
          </button>
          <button
            className={`text-left hover:bg-base-300 pl-4 py-3 rounded-lg text-base-content font-medium cursor-pointer flex items-center gap-2 ${
              activeTab === "launch-checklist" &&
              "bg-primary/20 hover:bg-primary/20 text-primary"
            }`}
            onClick={() => setActiveTab("launch-checklist")}
          >
            <CircleCheck
              className={`w-6 h-6 stroke-base-content-secondary ${
                activeTab === "launch-checklist" && "stroke-primary"
              }`}
            />
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
                  !submissionInfo.logo ||
                  loading
                }
                onClick={submitBtnHandler}
              >
                {loading && <Loader2 className="animate-spin" />} Submit
              </Button>
            )}
          </div>
        </div>
        <SuccessModal />
      </section>
    </>
  );
}
