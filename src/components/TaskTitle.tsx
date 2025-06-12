import "./TaskCard.scss";

const TaskTitle = ({task}) => {
  return (
      <div className="task-title">
        {task.title} {task.completed || task.dateDue && <span className="due-date">(Due: {task.dateDue})</span>}
      </div>
  );
};

export default TaskTitle;
