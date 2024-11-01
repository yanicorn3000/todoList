import { createRoot } from "react-dom/client";
import { addNewTask, useTasks, deleteTask, changeStatus } from "./api";
import NewTask from "./NewTask";
import Tasks from "./Tasks";
import "../main.scss";

const App = () => {
  const [tasks, { refetch }] = useTasks();
  const onNewTask = (task) => {
    return addNewTask(task).then(refetch);
  };

  const onFinish = (task) => {
    changeStatus(task).then(refetch);
  };

  const onRemoveTask = (task) => {
    deleteTask(task).then(refetch);
  };

  if (!tasks) {
    return <p>No tasks found</p>;
  }
  return (
    <>
      <NewTask onNewTask={onNewTask} />
      <Tasks tasks={tasks} onRemoveTask={onRemoveTask} onFinish={onFinish} />
    </>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
