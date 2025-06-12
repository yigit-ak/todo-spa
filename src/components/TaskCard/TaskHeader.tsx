import Checkbox from "../Checkbox";
import TaskTitle from "./TaskTitle";
import {BiDetail, BiSolidEdit} from "react-icons/bi";

const TaskHeader = ({task, inDetailView}) => {
  return (
      <div className="task-header">
        <Checkbox/>
        <TaskTitle task={task}/>
        {showHelperIcon(task, inDetailView)}

      </div>
  );
};

function showHelperIcon(task, inDetailView) {
  if (inDetailView)
    return <BiSolidEdit/>;

  if (task.description || task.subtasks?.length)
    return <BiDetail/>;

  return ""
}

export default TaskHeader;
