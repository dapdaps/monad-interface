import MonadBaseCard from "@/components/card/monad-base-card";
import Modal from "@/components/modal";
import Index from "./index";
import { useSpaceInvadersContext } from "../../context";

const RulesModal = (props: any) => {
  const { } = props;

  const {
    rulesVisible,
    setRulesVisible,
  } = useSpaceInvadersContext();

  return (
    <Modal
      open={rulesVisible}
      onClose={() => {
        setRulesVisible?.(false);
      }}
      closeIconClassName="!right-[25px]"
    >
      <MonadBaseCard
        className="w-[676px]"
        contentClassName=""
      >
        <Index {...props} />
      </MonadBaseCard>
    </Modal>
  );
};

export default RulesModal;
