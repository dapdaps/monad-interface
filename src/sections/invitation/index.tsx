import { useInvitation } from "@/hooks/use-invitation";
import Link from "next/link";

const InvitationView = (props: any) => {
  const { } = props;

  const {
    invitationCode,
    handleInvitationCodeChange,
    submitInvitationCode,
    submitInvitationCodeLoading,
  } = useInvitation();

  return (
    <div className="p-4">
      <h1>Invitation Page</h1>
      <ul>
        <li>
          <div>Your NFT: None</div>
        </li>
        <li>
          <input
            type="text"
            placeholder="Enter your invitation code"
            value={invitationCode}
            onChange={(e) => handleInvitationCodeChange(e.target.value)}
          />
        </li>
        <li>
          <button
            type="button"
            onClick={submitInvitationCode}
            disabled={submitInvitationCodeLoading}
          >
            {submitInvitationCodeLoading ? "Submitting..." : "Submit"}
          </button>
        </li>
        <li>
          <Link prefetch href="/terminal">Terminal</Link>
        </li>
      </ul>
    </div>
  );
};

export default InvitationView;
