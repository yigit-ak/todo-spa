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

interface Props {
  task: Task
  toggleDetailedView(): void;
}

export default function DetailedTaskCard({task, toggleDetailedView}: Props) {
  const recurrence = task.recurrence;
  return (
      <div className="detailed-task-card" onDoubleClick={toggleDetailedView} >

        <div className="header">
          <MainContent>
            <Checkbox/>
            <span>{task.title}</span>
          </MainContent>

          <SideContent>
            <BiSolidEdit/>
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