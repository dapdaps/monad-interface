import Modal from '@/components/modal';
import Index from './index';
import MonadBaseCard from '@/components/card/monad-base-card';

const BorrowModal = (props: any) => {
  const { visible, onClose, ...restProps } = props;

  return (
    <Modal
      open={visible}
      onClose={onClose}
    >
      <MonadBaseCard className="w-[432px]">
        <Index {...restProps} onClose={onClose} />
      </MonadBaseCard>
    </Modal>
  );
};

export default BorrowModal;
