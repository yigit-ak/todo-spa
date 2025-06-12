import "./Adder.scss"
import "./TaskCard.scss"
import AddIcon from "./AddIcon";
import {ChangeEvent, useEffect, useRef, useState} from "react";

interface Props {
  title: string;
  // add(): void; todo handle
}

const Adder = ({title}: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const [addingModeOn, setAddingModeOn] = useState<boolean>(false);

  useEffect(() => {
    if (addingModeOn && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [addingModeOn]);

  function toggleAddingMode() {
    setAddingModeOn(true);
  }

  function focusHandle() {
    setAddingModeOn(false);setNewTaskTitle("");
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      // todo add new task
      setAddingModeOn(false);
      setNewTaskTitle("");
    }
  }

  return (
      addingModeOn
          ? (
              <div className="new-task" onBlur={focusHandle}>
                <div className="checkbox"></div>
                <input ref={textFieldRef}
                       type="text"
                       className="task-title"
                       maxLength={255}
                    value={newTaskTitle}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
              </div>
          )
          : (
              <div className="adder" onClick={toggleAddingMode}>
                <AddIcon/>
                {title}
              </div>
          )
  );
};

export default Adder;