import { useState } from 'react';
import Add from '../../assets/icons/add.svg?react';
import { AddEditTaskModal, DeleteModal, TaskCard } from '../../components';
import { Button } from '../../ui';
import { taskList } from '../../serverData/taskList';
import { Task } from '../../types';
import styles from './style.module.scss'; 

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>(taskList);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowAddEditModal(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setShowAddEditModal(true);
  };

  const handleSaveTask = (newTask: Task) => {
    if (currentTask?.id) {
      setTasks(prev => prev.map(t => (t.id === newTask.id ? newTask : t)));
    } else {
      const taskWithId = { ...newTask, id: Date.now().toString() };
      setTasks(prev => [taskWithId, ...prev]);
    }
    handleCloseModal();
  };

  const handleDeleteTask = () => {
    if (currentTask?.id) {
      setTasks(prev => prev.filter(t => t.id !== currentTask.id));
    }
    setShowDeleteModal(false);
    setCurrentTask(null);
  };

  const handleCloseModal = () => {
    setShowAddEditModal(false);
    setCurrentTask(null);
  };

  const handleOpenDeleteModal = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) setCurrentTask(task);
    setShowDeleteModal(true);
  };

  const handleBackFromDelete = () => {
    setShowDeleteModal(false);
    setShowAddEditModal(true);
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.topTitle}>
          <h2>Список задач</h2>
          <Button title="Добавить задачу" icon={<Add />} onClick={handleAddTask} />
        </div>
        <div className={styles.taskContainer}>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleOpenDeleteModal} 
            />
          ))}
        </div>
      </div>

      {showAddEditModal && (
        <AddEditTaskModal
          initialTask={currentTask || undefined}
          onSubmit={handleSaveTask}
          onCancel={handleCloseModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal onDelete={handleDeleteTask} onBack={handleBackFromDelete} />
      )}
    </>
  );
};