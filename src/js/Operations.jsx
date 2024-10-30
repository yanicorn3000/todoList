import Operation from "./Operation";
import styles from "./Operations.module.scss";
import { useState, useMemo } from "react";
import { addNewOperation, deleteOperation, addTimeSpent } from "./api";

const Operations = ({
  taskStatus,
  taskId,
  showNewOperation,
  onAddNewOperation,
  operations,
  refetchOperation,
}) => {
  const sortedOperations = useMemo(() => {
    if (!operations) return undefined;
    return operations.sort((a, b) => {
      return new Date(b.addedDate) - new Date(a.addedDate);
    });
  }, [operations]);

  const [newOperation, setNewOperation] = useState({
    description: "",
    timeSpent: 0,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewOperation((prevOperation) => ({
      ...prevOperation,
      [name]: value,
    }));
  };

  const onNewOperation = (newOperation) => {
    addNewOperation(taskId, newOperation).then(refetchOperation);
  };

  const onDeleteOperation = (operation) => {
    deleteOperation(operation).then(refetchOperation);
  };

  const onChangeTime = (operation) => {
    addTimeSpent(operation).then(refetchOperation);
    console.log(operation);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onNewOperation({ ...newOperation });
    setNewOperation({
      description: "",
      timeSpent: 0,
    });
    onAddNewOperation();
  };

  if (!operations) {
    return <p>No operations found</p>;
  }
  return (
    <section className={styles.operations}>
      {showNewOperation === true ? (
        <form className={styles.operationsForm}>
          <input
            name="description"
            value={newOperation.description}
            onChange={onChange}
          />
          <button
            className={styles.addOperationBtn}
            onClick={onSubmit}
            type="submit"
          >
            Add<span></span>
          </button>
        </form>
      ) : null}
      <ul className={styles.operationList}>
        {sortedOperations.map((operation) => {
          return (
            <Operation
              key={operation.id}
              onDeleteOperation={onDeleteOperation}
              operation={operation}
              onChangeTime={onChangeTime}
              taskStatus={taskStatus}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Operations;
