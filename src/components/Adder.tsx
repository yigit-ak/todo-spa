import "./Adder.scss"
import "./TaskCard.scss"
import AddIcon from "./AddIcon";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {MdLoop} from "react-icons/md";

interface Props {
  title: string;
  // add(): void; todo handle
}

const Adder = ({title}: Props) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const [addingModeOn, setAddingModeOn] = useState<boolean>(false);
  const [newTaskDetailsShown, setNewTaskDetailsShown] = useState<boolean>(false);

  useEffect(() => {
    setNewTaskDetailsShown(prevState => addingModeOn && prevState)
  }, [addingModeOn]);

  useEffect(() => {
    if (addingModeOn && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [addingModeOn]);

  function toggleAddingMode() {
    setAddingModeOn(true);
  }

  function focusHandle(e: FocusEvent) {
    // // e.currentTarget is the <div className="new-task">
    // // e.relatedTarget is the new focused element (or null)
    // const isInside = e.currentTarget.contains(e.relatedTarget as Node | null);
    //
    // if (!isInside) {
    //   // focus really left the box → close it
    //   setAddingModeOn(false);
    //   setNewTaskTitle("");
    // }
    // // otherwise: focus moved to a child (e.g. your textarea), do nothing

  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      console.warn("Ctrl+Enter pressed");
      setAddingModeOn(false);
      setNewTaskTitle("");
      // todo add new task
    } else if (e.key === "Enter") {
      // todo add new task
      setNewTaskDetailsShown(true);
    }
  }

  return (
      <div className="adder" onBlur={focusHandle}>
        {addingModeOn
            ? (
                <>
                  <div className="adder-header">
                    <div className="checkbox"></div>
                    <input ref={textFieldRef}
                           type="text"
                           className="task-title"
                           maxLength={255}
                           value={newTaskTitle}
                           onChange={handleInputChange}
                           onKeyDown={handleKeyDown}
                           placeholder="Add new task..."
                    />
                  </div>
                  {newTaskDetailsShown &&
                      <div className="adder-body">

                          <div className="dates">
                              <label htmlFor="dateAssigned">
                                  On: <input type="date" name="dateAssigned"/>
                              </label>

                              <label htmlFor="dateDue">
                                  Due: <input type="date" name="dateDue"/>
                              </label>

                          </div>

                          <div className={"recurrence-details-box"}>
                              <MdLoop className={"recurrence-icon"}/>
                              <div className={"recurrence-details-edit"}>
                                  <label htmlFor="recurrenceStartDate">
                                      Start from <input type="date" name="recurrenceStartDate"/>
                                  </label>
                                  <label htmlFor="recurrencePeriod">
                                      Repeat each <input name="recurrencePeriod" type="number" min={1}/> days.
                                  </label>
                                  <label htmlFor="recurrenceEndDate">
                                      Until <input name="recurrenceEndDate" type="date"/>
                                  </label>
                              </div>
                          </div>

                          <textarea className="task-details" placeholder="Add a description"/>
                          <div className={"subtasks"}>
                              <Adder title={"Add subtask"}/>
                          </div>
                      </div>
                  }
                </>
            )
            : (
                <div className="adder-header" onClick={toggleAddingMode}>
                  <AddIcon/>
                  {title}
                </div>
            )
        }      </div>
  );
};

export default Adder;