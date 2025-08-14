import MonadBaseCard from "@/components/card/monad-base-card";
import Modal from "@/components/modal";
import Index from "./index";
import { useSpaceInvadersContext } from "../../context";
// import IconClose from "@public/images/arcade/space-invaders/icon-close.svg";

const RecordsModal = (props: any) => {
  const { } = props;

  const {
    recordsVisible,
    setRecordsVisible,
  } = useSpaceInvadersContext();

  return (
    <Modal
      open={recordsVisible}
      onClose={() => {
        setRecordsVisible?.(false);
      }}
      // closeIcon={<IconClose />}
      closeIconClassName="!right-[25px]"
    >
      <MonadBaseCard
        className="w-[752px] md:w-full"
        contentClassName=""
      >
        <Index {...props} />
      </MonadBaseCard>
    </Modal>
  );
};

export default RecordsModal;
