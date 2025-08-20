import classNames from 'classnames';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import { CircularProgressBar } from '../../ui';
import { PRIORITY_LABELS, STATUS_LABELS } from '../../utils/label'; 
import { Task } from '../../types'; 
import styles from './style.module.scss';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void; 
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  return (
    <div className={styles.taskCard} id={task.id}>
      <div className="flex w-100"> 
        <span className={styles.taskTitle}>Задача</span>
        <span className={styles.task}>{task.title}</span>
      </div>

      <div className="flex">
        <span className={styles.priorityTitle}>Приоритет</span>
        <span
          className={classNames(
            styles.priority,
            styles[`priority--${task.priority}`]
          )}
        >
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      <div className={styles.taskStatusWrapper}>
        <button
          className={classNames(
            styles.status,
            styles[`status--${task.status}`]
          )}
        >
          {STATUS_LABELS[task.status]}
        </button>
      </div>

      <div className={styles.progress}>
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={task.progress}
        />
      </div>

      <div className={styles.actions}>
        <EditIcon className="mr-20 cp" onClick={() => onEdit(task)} />
        <DeleteIcon className="cp" onClick={() => onDelete(task.id!)} />
      </div>
    </div>
  );
};