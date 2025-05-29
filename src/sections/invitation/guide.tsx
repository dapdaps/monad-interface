import Aboarding from "@/components/nft/Aboarding";
import useCustomAccount from "@/hooks/use-account";
import { useGuideStore } from "@/stores/guide";
import { useMemo } from "react";

const GuideView = () => {
  const { account } = useCustomAccount();
  const { setVisitedIndex, visible, setVisible, max, getVisitedIndex } =
    useGuideStore();

  const defaultIndex = useMemo(() => getVisitedIndex(account), [account]);

  return (
    <Aboarding
      isOpen={visible}
      setVisitedIndex={setVisitedIndex}
      getVisitedIndex={getVisitedIndex}
      closeModal={() => {
        setVisible(false);
        setVisitedIndex(account, max + 1);
      }}
    />
  );
};

export default GuideView;
