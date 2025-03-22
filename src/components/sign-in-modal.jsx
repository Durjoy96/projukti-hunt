import ContinueWithGoogle from "./continue-with-google";

export default function SignInModal() {
  return (
    <>
      <dialog id="sign_in_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-center font-bold text-2xl text-base-content">
            Sign up on Projukti Hunt
          </h3>
          <p className="py-4 text-base-content-secondary text-base text-center">
            Join our community of friendly folks discovering and sharing the
            latest products in tech.
          </p>
          <ContinueWithGoogle />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
