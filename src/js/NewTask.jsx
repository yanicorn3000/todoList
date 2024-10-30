import styles from "./NewTask.module.scss";
import { useState } from "react";

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

  const onSubmit = (e) => {
    e.preventDefault();
    onNewTask({ ...task, status: "open" });
    setTask({
      title: "",
      description: "",
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
          </div>
          <button className={styles.formButton} type="submit">
            Add task<span></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
