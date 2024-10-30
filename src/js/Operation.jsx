import styles from "./Operation.module.scss";
import { useState } from "react";

const Operation = ({
  operation,
  onDeleteOperation,
  onChangeTime,
  taskStatus,
}) => {
  const [timeInput, setTimeInput] = useState(true);
  const [time, setTime] = useState(0);

  const removeOperation = (operation) => {
    return (e) => {
      e.preventDefault();
      return onDeleteOperation(operation);
    };
  };

  const convertMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const changeTime = (e) => {
    e.preventDefault();

    closeTimeInput(e);
    if (time) {
      return onChangeTime({
        ...operation,
        timeSpent: operation.timeSpent + time,
      });
    }
  };

  const onChange = (e) => {
    const value = Number(e.target.value);
    setTime(value);
  };

  const showTimeInput = (e) => {
    e.preventDefault();
    setTimeInput(false);
  };

  const closeTimeInput = (e) => {
    e.preventDefault();
    setTimeInput(true);
  };

  console.log(timeInput);

  return (
    <li>
      <div className={styles.operationsItem}>
        <div className={styles.operationsContent}>
          <p>{operation.description}</p>
          <span className={styles.timeLabel}>
            {convertMinutes(operation.timeSpent)}
          </span>
        </div>
        <div className={styles.buttonGroup}>
          {timeInput ? (
            <>
              {taskStatus === "open" ? (
                <button onClick={showTimeInput} className={styles.addTimeBtn}>
                  Add time<span className={styles.icon}></span>
                </button>
              ) : null}
              <button
                className={styles.trashButton}
                onClick={removeOperation(operation)}
              >
                <span className={styles.icon}></span>
              </button>
            </>
          ) : (
            <div className={styles.timeInput}>
              <input
                type="number"
                name="time"
                placeholder="Spent time in minutes"
                onChange={onChange}
              />
              <button className={styles.saveBtn} onClick={changeTime}>
                <span className={styles.icon}></span>
              </button>
              <button className={styles.closeBtn} onClick={closeTimeInput}>
                <span className={styles.icon}></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Operation;
