import { Circle, CircleCheck } from "lucide-react";

export default function LaunchChecklist({ setSubmissionInfo, submissionInfo }) {
  return (
    <>
      <div className="max-w-lg">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Required</h2>
          <p className="text-sm font-normal text-base-content-secondary mt-2">
            Check that you’ve completed all of the required information.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid grid-cols-2 space-y-2 text-base font-normal text-base-content">
            <li className="flex gap-1.5 items-center">
              {submissionInfo.product_name ? (
                <CircleCheck className="w-5 h-5 stroke-primary" />
              ) : (
                <Circle className="w-5 h-5 stroke-base-content-secondary" />
              )}
              Product Name
            </li>
            <li className="flex gap-1.5 items-center">
              {submissionInfo.tagline ? (
                <CircleCheck className="w-5 h-5 stroke-primary" />
              ) : (
                <Circle className="w-5 h-5 stroke-base-content-secondary" />
              )}
              Tagline
            </li>
            <li className="flex gap-1.5 items-center">
              {submissionInfo.description ? (
                <CircleCheck className="w-5 h-5 stroke-primary" />
              ) : (
                <Circle className="w-5 h-5 stroke-base-content-secondary" />
              )}
              Product Description
            </li>
            <li className="flex gap-1.5 items-center">
              {submissionInfo.web_app_link.includes(".") ? (
                <CircleCheck className="w-5 h-5 stroke-primary" />
              ) : (
                <Circle className="w-5 h-5 stroke-base-content-secondary" />
              )}
              Website or App Link
            </li>
            <li className="flex gap-1.5 items-center">
              {submissionInfo.category ? (
                <CircleCheck className="w-5 h-5 stroke-primary" />
              ) : (
                <Circle className="w-5 h-5 stroke-base-content-secondary" />
              )}
              Category
            </li>
            <li className="flex gap-1.5 items-center">
              {submissionInfo.logo ? (
                <CircleCheck className="w-5 h-5 stroke-primary" />
              ) : (
                <Circle className="w-5 h-5 stroke-base-content-secondary" />
              )}
              Logo
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
