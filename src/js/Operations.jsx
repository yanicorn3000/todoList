import Operation from "./Operation";
import styles from "./Operations.module.scss";
import { useState, useMemo, useEffect } from "react";
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

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [showNewOperation]);

  const onChange = (e) => {
    const { name, value } = e.target;

    // if (value.length < 5) {
    //   setError("Operation Description must be at least 5 characters");
    // } else {
    //   setError("");
    // }

    setNewOperation((prevOperation) => ({
      ...prevOperation,
      [name]: value,
    }));
  };

  const onNewOperation = (newOperation) => {
    return addNewOperation(taskId, newOperation).then(refetchOperation);
  };

  const onDeleteOperation = (operation) => {
    deleteOperation(operation).then(refetchOperation);
  };

  const onChangeTime = (operation) => {
    addTimeSpent(operation).then(refetchOperation);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onNewOperation({ ...newOperation })
      .then(() => {
        setNewOperation({
          description: "",
          timeSpent: 0,
        });
        onAddNewOperation();
      })
      .catch((err) => {
        if (Array.isArray(err) && err.length > 0) {
          setError(err[0]);
        }
      });
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
            placeholder="Operation Description"
          />

          <button
            className={styles.addOperationBtn}
            onClick={onSubmit}
            type="submit"
          >
            Add<span></span>
          </button>
          {error && <p className={styles.formError}>{error}</p>}
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
