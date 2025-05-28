import Aboarding from "@/components/nft/Aboarding";
import useCustomAccount from "@/hooks/use-account";
import { useGuideStore } from "@/stores/guide";

const GuideView = () => {
  const { account } = useCustomAccount();
  const { setVisited, visible, setVisible } = useGuideStore();

  return (
    <Aboarding
      isOpen={visible}
      closeModal={() => {
        setVisible(false);
        setVisited(account, true);
      }}
    />
  );
};

export default GuideView;
