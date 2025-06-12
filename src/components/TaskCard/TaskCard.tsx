import {Subtask, Task} from '../../types/domain.ts'
import "./TaskCard.scss";
import TaskHeader from "./TaskHeader";
import TaskDetails from "./TaskDetails";
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