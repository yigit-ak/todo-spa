import {Task} from "../types/domain.ts";
import TaskCard from "./TaskCard.tsx";

import {MdLoop} from "react-icons/md";
import RecurrenceDetails from "./RecurrenceDetails.tsx";
import SubtaskList from "./SubtaskList.tsx";

interface Props {
  task: Task;
  // updateTaskList(): Promise<void>; todo: handler later
  // setTaskWithDetails(t: Task): void; todo: handler later
}

const TaskDetails = ({task}: Props) => {
  return (
      <div className="task-details">
        {task.recurrence && <RecurrenceDetails recurrence={task.recurrence}/>}
        {task.description}
        {!!task.subtasks?.length && <SubtaskList subtasks={task.subtasks}/>
        }
      </div>
  );
};

export default TaskDetails;
