import {Task} from '../types/domain'
import "../components/TaskItem.scss";
import Checkbox from "../components/Checkbox.tsx";

interface Props {
  task: Task;
  // updateTaskList(): Promise<void>; todo: handler later
  // setTaskWithDetails(t: Task): void; todo: handler later
}

const TaskItem = ({task}: Props) => {
  return (
      <div className="task-item">
        <Checkbox/>
        <div>
          {task.title}
        </div>
      </div>
  );
};

export default TaskItem;