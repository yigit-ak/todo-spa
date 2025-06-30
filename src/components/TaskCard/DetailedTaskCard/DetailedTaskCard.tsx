import type {Recurrence, Subtask, Task} from "../../../types/domain.ts";
import Card, {MainContent, SideContent} from "../../layout/Card";
import {Body} from "../../layout/Container";
import Checkbox from "../../Checkbox";
import {showHelperIcon} from "../../../util/helperIconUtil.ts";
import {BiDetail, BiSolidEdit} from "react-icons/bi";
import {SubtaskCard} from "../index.ts";
import "./DetailedTaskCard.scss";
import {MdLoop, MdWarningAmber} from "react-icons/md";
import {getRelativeDueDate} from "../../../util/dateUtil.ts";
import {useState} from "react";
import {toggleTaskCompleted} from "../../../api";
import {useNavigate} from "react-router-dom";

interface Props {
  task: Task
}

export default function DetailedTaskCard({task, ...res}: Props) {
  const [completed, setCompleted] = useState<boolean>(task.completed);
  const navigate = useNavigate();

  function toggleCompleted() {
    setCompleted(prev => !prev);
    toggleTaskCompleted(task.id);
  }

  function goEdit() {
    if (!task.recurrence) {
      // one-off task → go to task-edit
      navigate(`/tasks/${task.id}/edit`);
    } else {
      // recurring task → go to recurrence-edit
      navigate(`/recurrences/${(task.recurrence as Recurrence).id}/edit`);
    }
  }

  const recurrence = task.recurrence;
  return (
      <div className="detailed-task-card" {...res} >

        <div className="header">
          <MainContent>
            <Checkbox completed={completed} onClick={toggleCompleted}/>
            <span>{task.title}</span>
          </MainContent>

          <SideContent>
            <BiSolidEdit onClick={goEdit}/>
          </SideContent>
        </div>

        {recurrence && <div className="recurrence-info">
            <MdLoop/> Repeats {recurrence.period > 1 ? `every ${recurrence.period} days` : "each day"}
        </div>}

        {task.dateDue &&
            <div className="due-date-info">
                <MdWarningAmber/>
              {getRelativeDueDate(task.dateDue)}
            </div>
        }

        {!!task.description &&
            <div className="description">
              {task.description}
            </div>
        }

        {!!task.subtasks.length &&
            <div className="subtask-list">
              {task.subtasks.map(subtask => (
                  <SubtaskCard task={subtask} key={subtask.id}/>
              ))}
            </div>
        }

      </div>
  );
}