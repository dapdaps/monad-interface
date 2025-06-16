import useIsMobile from "@/hooks/use-isMobile";
import InvitationViewMobile from "./mobile";
import InvitationViewLaptop from "./laptop";

const InvitationView = (props: any) => {
  const isMobile = useIsMobile();

  return isMobile ? <InvitationViewMobile {...props} /> : <InvitationViewLaptop {...props} />;
};

export default InvitationView;
