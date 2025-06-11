import Title from "./Title.tsx";
import TaskList from "./TaskList.tsx";
import "./Today.scss";

const Today = () => {
  return (
      <div className="task-container">
        <Title/>
        <TaskList/>
      </div>
  );
};

export default Today;
