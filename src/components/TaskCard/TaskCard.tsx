import Card, {MainContent, SideContent} from "../layout/Card";
import {Task} from "../../types/domain.ts";
import {showHelperIcon} from "../../util/helperIconUtil.ts";
import Checkbox from "../Checkbox";
import {BiDetail} from "react-icons/bi";
import "./TaskCard.scss";
import {useState} from "react";
import DetailedTaskCard from "./DetailedTaskCard";
import {getDayDifference} from "../../util/dateUtil.ts";

interface Props {
  task: Task;
  key: string;
}

export default function TaskCard({task}: Props) {
  const [detailedView, setDetailedView] = useState<boolean>(false);

  let className = `task-card ${task.completed && 'completed'}`;
  className += !task.completed && task.dateDue && (getDayDifference(new Date(task.dateDue)) >= 0) ? ' warning' : "";

  function toggleDetailedView() {
    setDetailedView(prev => !prev);
  }

  return detailedView ? (
      <DetailedTaskCard task={task} onDoubleClick={toggleDetailedView}/>
  ) : (
      <Card className={className} onDoubleClick={toggleDetailedView}>

        <MainContent>
          <Checkbox/>
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