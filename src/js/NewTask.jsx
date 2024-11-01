import styles from "./NewTask.module.scss";
import { useState, useEffect } from "react";

const NewTask = ({ onNewTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [task]);

  const onSubmit = (e) => {
    e.preventDefault();
    onNewTask({ ...task, status: "open" })
      .then(() => {
        setTask({
          title: "",
          description: "",
        });
      })
      .catch((err) => {
        if (Array.isArray(err) && err.length > 0) {
          setError(err[0]);
        }
      });
  };

  return (
    <div className={styles.card}>
      <div>
        <h2>New Task</h2>
        <form onSubmit={onSubmit}>
          <div className={styles.formBody}>
            <input
              onChange={onChange}
              name="title"
              placeholder="Title"
              value={task.title}
            />
            <input
              onChange={onChange}
              name="description"
              placeholder="Description"
              value={task.description}
            />
            <p className={styles.taskError}>{error}</p>
          </div>
          <button className={styles.formButton} type="submit">
            Add task<span className={styles.icon}></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
