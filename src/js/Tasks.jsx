import Task from "./Task";
import styles from "./Tasks.module.scss";

const Tasks = ({ tasks, onRemoveTask, onFinish }) => {
  console.log(tasks);

  return (
    <div className={styles.tasks}>
      <ul>
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              taskTitle={task.title}
              taskDescription={task.description}
              taskStatus={task.status}
              task={task}
              onRemoveTask={onRemoveTask}
              onFinish={onFinish}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Tasks;
