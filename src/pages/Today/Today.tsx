import Title from "./Title";
import TaskList from "../../components/TaskList";
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
