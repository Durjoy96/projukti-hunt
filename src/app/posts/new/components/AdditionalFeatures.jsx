export default function AdditionalFeatures({
  setSubmissionInfo,
  submissionInfo,
}) {
  return (
    <>
      <div className="max-w-lg">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Pricing</h2>
          <p className="text-sm font-normal text-base-content-secondary mt-2">
            Optional, but the community really appreciates knowing.
          </p>
        </div>
        <div className="mt-8">
          <form>
            {/* maker or hunter */}
            <div className="grid gap-3">
              <div className="flex gap-2 mt-2">
                <input
                  type="radio"
                  name="pricing"
                  className="radio radio-primary bg-base-100"
                  id="free"
                  onClick={() =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      pricing: "Free",
                    })
                  }
                />
                <label
                  htmlFor="free"
                  className="text-base font-medium text-base-content cursor-pointer"
                >
                  Free
                  <span className="text-sm text-base-content-secondary font-normal block">
                    This product is free to use
                  </span>
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="pricing"
                  className="radio radio-primary bg-base-100"
                  id="freemium"
                  onClick={() =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      pricing: "Freemium",
                    })
                  }
                />
                <label
                  htmlFor="freemium"
                  className="text-base font-medium text-base-content cursor-pointer"
                >
                  Freemium
                  <span className="text-sm text-base-content-secondary font-normal block">
                    This product requires payment but also offers a free trial
                    or version
                  </span>
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="pricing"
                  className="radio radio-primary bg-base-100"
                  id="paid"
                  onClick={() =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      pricing: "Paid",
                    })
                  }
                />
                <label
                  htmlFor="paid"
                  className="text-base font-medium text-base-content cursor-pointer"
                >
                  Paid
                  <span className="text-sm text-base-content-secondary font-normal block">
                    This product requires payment and there is no free option
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
