import {Subtask, Task} from "../../types/domain.ts";

import RecurrenceDetails from "./RecurrenceDetails";
import SubtaskList from "./SubtaskList";

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
