import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CommunityAndSocialLinks({
  setSubmissionInfo,
  submissionInfo,
}) {
  return (
    <>
      <div className="max-w-lg">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            Grow Your Community
          </h2>
          <p className="text-sm font-normal text-base-content-secondary mt-2">
            Share your social media links so users can explore, engage, and
            connect with your community
          </p>
        </div>
        <div className="mt-12">
          <form>
            <div className="grid gap-6">
              {/* maker or hunter */}
              <div className="grid gap-3">
                <h4 className="text-lg font-bold text-base-content">
                  Did you work on this product?
                </h4>
                <div className="flex gap-2 mt-2">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio radio-primary bg-base-100"
                    id="radio-1"
                    defaultChecked={submissionInfo.makers === true}
                    onClick={() =>
                      setSubmissionInfo({
                        ...submissionInfo,
                        makers: true,
                      })
                    }
                  />
                  <label
                    htmlFor="radio-1"
                    className="text-base font-medium text-base-content cursor-pointer"
                  >
                    I worked on this product
                    <span className="text-sm text-base-content-secondary font-normal block">
                      I'll be listed as both Hunter and Maker of this product
                    </span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio radio-primary bg-base-100"
                    id="radio-2"
                    defaultChecked={submissionInfo.makers === false}
                    onClick={() =>
                      setSubmissionInfo({
                        ...submissionInfo,
                        makers: false,
                      })
                    }
                  />
                  <label
                    htmlFor="radio-2"
                    className="text-base font-medium text-base-content cursor-pointer"
                  >
                    I didn't work on this product
                    <span className="text-sm text-base-content-secondary font-normal block">
                      I'll be listed as Hunter of this product
                    </span>
                  </label>
                </div>
              </div>
              {/* facebook page */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="fb_page">Facebook Page</Label>
                <Input
                  id="fb_page"
                  type="Link"
                  placeholder="Product facebook page link"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.fb_page}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      fb_page: e.target.value,
                    })
                  }
                />
              </div>
              {/* facebook Group */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="fb_group">Facebook group</Label>
                <Input
                  id="fb_group"
                  type="Link"
                  placeholder="Product facebook group link"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.fb_group}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      fb_group: e.target.value,
                    })
                  }
                />
              </div>
              {/* Instagram */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="Link"
                  placeholder="Instagram link"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.instagram}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      instagram: e.target.value,
                    })
                  }
                />
              </div>
              {/* LinkedIn Page */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="linkedin">Linkedin Page</Label>
                <Input
                  id="linkedin"
                  type="Link"
                  placeholder="Linkedin page link"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.linkedin}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      linkedin: e.target.value,
                    })
                  }
                />
              </div>
              {/* LinkedIn Page */}
              <div className="grid gap-2 max-w-lg">
                <Label htmlFor="youtube_video_link">YouTube Video Link</Label>
                <Input
                  id="youtube_video_link"
                  type="Link"
                  placeholder="If the product has a video demo"
                  className="bg-base-100"
                  required
                  defaultValue={submissionInfo.youtube_video_link}
                  onChange={(e) =>
                    setSubmissionInfo({
                      ...submissionInfo,
                      youtube_video_link: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
