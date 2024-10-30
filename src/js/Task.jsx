import styles from "./Tasks.module.scss";
import { useState } from "react";
import Operations from "./Operations";
import { useOperations } from "./api";

const Task = ({ onRemoveTask, onFinish, task }) => {
  const [showAddNewOperation, setAddNewOperation] = useState(false);
  const [operations, { refetch }] = useOperations(task.id);

  const addOperation = (e) => {
    e.preventDefault();
    setAddNewOperation(!showAddNewOperation);
  };

  const onAddNewOperation = () => {
    setAddNewOperation(false);
  };
  const finishTask = (task) => (e) => {
    e.preventDefault();
    return onFinish({ ...task, status: "closed" });
  };

  const removeTask = (task) => {
    return (e) => {
      e.preventDefault();
      return onRemoveTask(task);
    };
  };

  return (
    <li>
      <div className={styles.taskCard}>
        <div className={styles.text}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>

        <div className={styles.buttonGroup}>
          {task.status === "open" ? (
            <>
              <button
                className={styles.finishButton}
                onClick={finishTask(task)}
              >
                Finish <span className={styles.icon}></span>
              </button>
              <button className={styles.addButton} onClick={addOperation}>
                Add operation<span className={styles.icon}></span>
              </button>
            </>
          ) : null}

          {operations && operations.length === 0 && !showAddNewOperation ? (
            <button className={styles.trashButton} onClick={removeTask(task)}>
              <span className={styles.icon}></span>
            </button>
          ) : null}
        </div>

        <Operations
          taskId={task.id}
          showNewOperation={showAddNewOperation}
          onAddNewOperation={onAddNewOperation}
          taskStatus={task.status}
          operations={operations}
          refetchOperation={refetch}
        />
      </div>
    </li>
  );
};

export default Task;
