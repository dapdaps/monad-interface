import Modal from "@/components/modal";
import Index from "./index";
import MonadBaseCard from "@/components/card/monad-base-card";

const CalendarModal = (props: any) => {
  const { open, onClose } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIconClassName="!right-[25px]"
    >
      <MonadBaseCard
        className="w-[800px]"
        contentClassName=""
      >
        <Index {...props} />
      </MonadBaseCard>
    </Modal>
  );
};

export default CalendarModal;
