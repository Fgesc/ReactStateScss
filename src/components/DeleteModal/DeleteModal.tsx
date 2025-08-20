import { Button, Modal } from '../../ui';
import styles from './style.module.scss';

interface DeleteModalProps {
  onDelete: () => void;
  onBack: () => void;
}

export const DeleteModal = ({ onDelete, onBack }: DeleteModalProps) => {
  return (
    <Modal>
      <div className={styles.deleteModal}>
        <p>Точно удалить задачу?</p>
        <div className={styles.deleteModalActions}>
          <Button title="Удалить" onClick={onDelete} />
          <Button title="Выйти" outline onClick={onBack} />
        </div>
      </div>
    </Modal>
  );
};