import Modal from '@/components/modal';
import Index from './index';

const LendModal = (props: any) => {
  const { visible, onClose, ...restProps } = props;

  return (
    <Modal
      open={visible}
      onClose={onClose}
    >
      <Index {...restProps} onClose={onClose} />
    </Modal>
  );
};

export default LendModal;
