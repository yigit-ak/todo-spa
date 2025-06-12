import TaskCard from "./TaskCard";

const SubtaskList = ({subtasks}) => {
  return (
      <div className="task-list">
        {subtasks.map(subtask => {
          return <TaskCard key={subtask.id} task={subtask}/>
        })}
      </div>
  );
};

export default SubtaskList;
