import {Subtask, Task} from '../types/domain'
import "./TaskCard.scss";
import Checkbox from "../components/Checkbox.tsx";
import TaskTitle from "./TaskTitle.tsx";
import TaskHeader from "./TaskHeader.tsx";
import TaskDetails from "./TaskDetails.tsx";
import {useState} from "react";

interface Props {
  task: Task | Subtask;
  key: string;
  // updateTaskList(): Promise<void>; todo: handler later
  // setTaskWithDetails(t: Task): void; todo: handler later
}

const TaskCard = ({task}: Props) => {
  const [inDetailView, setInDetailView] = useState(false);

  function toggleDetailsVisibility() {
    setInDetailView(prev => !prev);
  }

  return (
      <div className={`${task.completed && 'completed'} task-card`} onDoubleClick={toggleDetailsVisibility}>
        <TaskHeader task={task} inDetailView={inDetailView}/>
        {inDetailView && <TaskDetails task={task}/>}
      </div>
  );
};

export default TaskCard;