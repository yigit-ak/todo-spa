import Card, {MainContent, SideContent} from "../layout/Card";
import {Task} from "../../types/domain.ts";
import {showHelperIcon} from "../../util/helperIconUtil.ts";
import Checkbox from "../Checkbox";
import {BiDetail} from "react-icons/bi";
import "./TaskCard.scss";
import {useState} from "react";
import DetailedTaskCard from "./DetailedTaskCard";
import {getDayDifference} from "../../util/dateUtil.ts";
import {toggleTaskCompleted} from "../../api";

interface Props {
  task: Task;
  key: string;
}

export default function TaskCard({task}: Props) {
  const [detailedView, setDetailedView] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(task.completed);

  let className = `task-card ${completed && 'completed'}`;
  className += !completed && task.dateDue && (getDayDifference(new Date(task.dateDue)) >= 0) ? ' warning' : "";

  async function toggleCompleted() {
    await toggleTaskCompleted(task.id);
    setCompleted(prev => !prev);
  }

  function toggleDetailedView() {
    setDetailedView(prev => !prev);
  }

  return detailedView ? (
      <DetailedTaskCard task={task} onDoubleClick={toggleDetailedView}/>
  ) : (
      <Card className={className} onDoubleClick={toggleDetailedView}>

        <MainContent>
          <Checkbox completed={completed} onClick={toggleCompleted}/>
          <span>{task.title}</span>
        </MainContent>

        {showHelperIcon(task) &&
            <SideContent>
                <BiDetail/>
            </SideContent>
        }

      </Card>
  );
}