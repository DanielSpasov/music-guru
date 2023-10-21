import { Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import CreateAlbum from './Create';

export default function Modals({ openCreate, setOpenCreate }: ModalsProps) {
  return (
    <div>
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <CreateAlbum onClose={() => setOpenCreate(false)} />
      </Modal>
    </div>
  );
}
