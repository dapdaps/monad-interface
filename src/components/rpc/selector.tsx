import { memo } from "react";
import Modal from "@/components/modal";
import RpcList, { type Props as RpcListProps } from "./list";

const RpcSelector = (props: Props) => {
  const { visible, onClose } = props;
  return (
    <Modal
      open={visible}
      onClose={onClose}
      isShowCloseIcon={false}
    >
      <RpcList />
    </Modal>
  );
};

export default memo(RpcSelector);

export interface Props extends RpcListProps {
  visible: boolean;
  onClose(): void;
}
