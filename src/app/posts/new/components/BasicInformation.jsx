import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import Categories from "./Categories";

export default function BasicInformation({
  setSubmissionInfo,
  submissionInfo,
}) {
  const handleImgChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];

        // Update submission info with file
        if (name === "logo") {
          setSubmissionInfo({
            ...submissionInfo,
            logo: base64String,
            preview_logo: objectUrl,
          });
        } else if (name === "banner_1") {
          setSubmissionInfo({
            ...submissionInfo,
            banners: [...submissionInfo.banners, base64String],
            preview_banner_1: objectUrl,
          });
        } else if (name === "banner_2") {
          setSubmissionInfo({
            ...submissionInfo,
            banners: [...submissionInfo.banners, base64String],
            preview_banner_2: objectUrl,
          });
        } else if (name === "banner_3") {
          setSubmissionInfo({
            ...submissionInfo,
            banners: [...submissionInfo.banners, base64String],
            preview_banner_3: objectUrl,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div>
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            Tell us about your product
          </h2>
          <p className="text-sm font-normal text-base-content-secondary mt-2">
            Every Bangladeshi people's are exited to hear from you
          </p>
        </div>
        <div className="mt-12">
          <form>
            <div className="grid gap-6">
              {/* product name */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="product_name">Name of the product</Label>
                <Input
                  id="product_name"
                  type="text"
                  placeholder="Name of the product"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.product_name}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      product_name: e.target.value,
                    })
                  }
                />
              </div>
              {/* tagline */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  type="text"
                  placeholder="A catchy one-liner about the product"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.tagline}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      tagline: e.target.value,
                    })
                  }
                />
              </div>
              {/* description */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  type="text"
                  placeholder="A detailed explanation of what the product does"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.description}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              {/* Website or App Link */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="web_app_link">Website or App Link</Label>
                <Input
                  id="web_app_link"
                  type="Link"
                  placeholder="https://"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.web_app_link}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      web_app_link: e.target.value,
                    })
                  }
                />
              </div>
              {/* category */}
              <div className="grid gap-2 max-w-lg">
                <Categories
                  submissionInfo={submissionInfo}
                  setSubmissionInfo={setSubmissionInfo}
                />
              </div>
              {/* logo */}
              <div>
                <Label htmlFor="logo">Product Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="bg-base-100 hidden"
                  required
                  onChange={(e) => handleImgChange(e, "logo")}
                />
                <label htmlFor="logo">
                  <div className="border-2 rounded-lg border-dashed border-primary w-32 h-32 mt-2 p-2 bg-base-100 inline-flex items-center justify-center cursor-pointer">
                    {submissionInfo.preview_logo ? (
                      <div className="mt-2">
                        <img
                          src={submissionInfo.preview_logo}
                          alt="Logo preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <PlusIcon className="w-8 h-8 stroke-base-content-secondary" />
                    )}
                  </div>
                </label>
              </div>
              {/* Screenshots/Banners */}
              <div>
                <Label>Screenshots/Banners</Label>
                <div className="flex flex-wrap gap-6">
                  {/* banner 1 */}
                  <div>
                    <Input
                      id="banner_1"
                      type="file"
                      accept="image/*"
                      className="bg-base-100 hidden"
                      required
                      onChange={(e) => handleImgChange(e, "banner_1")}
                    />
                    <label htmlFor="banner_1">
                      <div className="border-2 rounded-lg border-dashed border-primary w-32 h-32 mt-2 p-2 bg-base-100 inline-flex items-center justify-center cursor-pointer">
                        {submissionInfo.preview_banner_1 ? (
                          <div className="mt-2">
                            <img
                              src={submissionInfo.preview_banner_1}
                              alt="Logo preview"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        ) : (
                          <PlusIcon className="w-8 h-8 stroke-base-content-secondary" />
                        )}
                      </div>
                    </label>
                  </div>
                  {/* banner 2 */}
                  <div>
                    <Input
                      id="banner_2"
                      type="file"
                      accept="image/*"
                      className="bg-base-100 hidden"
                      required
                      onChange={(e) => handleImgChange(e, "banner_2")}
                    />
                    <label htmlFor="banner_2">
                      <div className="border-2 rounded-lg border-dashed border-primary w-32 h-32 mt-2 p-2 bg-base-100 inline-flex items-center justify-center cursor-pointer">
                        {submissionInfo.preview_banner_2 ? (
                          <div className="mt-2">
                            <img
                              src={submissionInfo.preview_banner_2}
                              alt="Logo preview"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        ) : (
                          <PlusIcon className="w-8 h-8 stroke-base-content-secondary" />
                        )}
                      </div>
                    </label>
                  </div>
                  {/* banner 3 */}
                  <div>
                    <Input
                      id="banner_3"
                      type="file"
                      accept="image/*"
                      className="bg-base-100 hidden"
                      required
                      onChange={(e) => handleImgChange(e, "banner_3")}
                    />
                    <label htmlFor="banner_3">
                      <div className="border-2 rounded-lg border-dashed border-primary w-32 h-32 mt-2 p-2 bg-base-100 inline-flex items-center justify-center cursor-pointer">
                        {submissionInfo.preview_banner_3 ? (
                          <div className="mt-2">
                            <img
                              src={submissionInfo.preview_banner_3}
                              alt="Logo preview"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        ) : (
                          <PlusIcon className="w-8 h-8 stroke-base-content-secondary" />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
