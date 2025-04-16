import { PartyPopper } from "lucide-react";

export default function SuccessModal() {
  return (
    <>
      <dialog id="success_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="w-20 h-20 bg-primary/30 rounded-full flex items-center justify-center p-4 mx-auto">
            <PartyPopper className="w-10 h-10 stroke-primary" />
          </div>
          <h3 className="font-bold text-lg lg:text-xl text-base-content mt-6 md:mt-8">
            Success! Your Product Has Been Submitted!
          </h3>
          <p className="pt-2 text-base-content-secondary text-sm md:text-base lg:text-base">
            Thank you for submitting your product! Your submission has been
            received, and we’re excited to feature it. Your product will be
            reviewed and published within 24 hours. We’ll notify you as soon as
            it goes live! Stay tuned! 🔔
          </p>
        </div>
      </dialog>
    </>
  );
}
