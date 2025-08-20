import { useState } from 'react';
import classNames from 'classnames';
import Close from '../../assets/icons/close.svg?react';
import { Button, Input, Modal } from '../../ui';
import { Priority, Status } from '../../types';
import { PRIORITY_LABELS } from '../../utils/label';
import styles from './style.module.scss';

interface AddEditTaskModalProps {
  initialTask?: {
    id?: string;
    title: string;
    priority: Priority;
    status: Status;
    progress: number;
  };
  onSubmit: (task: {
    id?: string;
    title: string;
    priority: Priority;
    status: Status;
    progress: number;
  }) => void;
  onCancel: () => void;
}

export const AddEditTaskModal = ({ initialTask, onSubmit, onCancel }: AddEditTaskModalProps) => {
  const isEditing = !!initialTask;

  const [task, setTask] = useState({
    id: initialTask?.id,
    title: initialTask?.title || '',
    priority: (initialTask?.priority || Priority.MEDIUM) as Priority,
    status: (initialTask?.status || Status.TODO) as Status,
    progress: initialTask?.progress || 0,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({ ...prev, title: e.target.value }));
  };

  const handlePriorityChange = (priority: Priority) => {
    setTask((prev) => ({ ...prev, priority }));
  };

  const handleSubmit = () => {
    if (!task.title.trim()) return;
    onSubmit(task);
  };

  return (
  <Modal>
    <form onSubmit={handleSubmit} className={styles.addEditModal}>
      <div className="flx-between"> 
        <span className={styles.modalTitle}>
          {isEditing ? 'Редактировать задачу' : 'Добавить задачу'}
        </span>
        <Close className="cp" onClick={onCancel} />
      </div>

      <Input
        label="Задача"
        placeholder="Введите текст..."
        onChange={handleTitleChange}
        name="title"
        id="title"
        value={task.title}
      />

      <div className={styles.modalPriority}>
        <span>Приоритет</span>
        <ul className={styles.priorityButtons}>
          {(Object.keys(Priority) as Array<keyof typeof Priority>).map((key) => {
            const priority = Priority[key];
            return (
              <li
                key={priority}
                className={classNames(
                  styles.priorityBtn,
                  styles[priority],
                  task.priority === priority && styles[`${priority}-selected`]
                )}
                onClick={() => handlePriorityChange(priority)}
              >
                {PRIORITY_LABELS[priority]}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flx-right mt-50">
        <Button
          title={isEditing ? 'Редактировать' : 'Добавить'}
          onClick={handleSubmit}
        />
      </div>
    </form>
  </Modal>
);
};