import type {Subtask, Task} from "../../types/domain.ts";
import Card, {MainContent, SideContent} from "../layout/Card";
import {Body} from "../layout/Container";
import Checkbox from "../Checkbox";
import {showHelperIcon} from "../../util/helperIconUtil.ts";
import {BiDetail, BiSolidEdit} from "react-icons/bi";

interface Props {
  task: Task
}

export default function DetailedTaskCard({task}: Props) {
  return (
      <div className="detailed-task-card">

        <div className="header">
          <MainContent>
            <Checkbox/>
            <span>{task.title}</span>
          </MainContent>

          <SideContent>
            <BiSolidEdit/>
          </SideContent>
        </div>

        <div className="recurrence-info">

        </div>

        <div className="due-date-info">

        </div>

        <div className="description">

        </div>

        {task.subtasks}

      </div>
  );
}