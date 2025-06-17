import Card, {MainContent, SideContent} from "../layout/Card";
import {Subtask, Task} from "../../types/domain.ts";
import {showHelperIcon} from "../../util/helperIconUtil.ts";
import Checkbox from "../Checkbox";
import {BiDetail} from "react-icons/bi";
import "./TaskCard.scss";
import {useState} from "react";
import DetailedTaskCard from "../DetailedTaskCard";

interface Props {
  task: Task;
  key: string;
}

export default function TaskCard({task}: Props) {
  const [detailedView, setDetailedView] = useState<boolean>(false);

  const className = `task-card ${task.completed && 'completed'} ${!!task.dateDue && 'due'}`

  function toggleDetailedView() {
    setDetailedView(prev => !prev);
  }

  return detailedView ? (
      <DetailedTaskCard task={task}/>
  ) : (
      <Card className={className}>

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