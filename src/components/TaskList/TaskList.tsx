import TaskCard from "../TaskCard";
import type {Task} from "../../types/domain.ts";
import "./TaskList.scss";
import Adder from "../Adder";
import {useEffect, useState} from "react";
import {getTasksForToday} from "../../api";

const TaskList = () => {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTasksForToday().then(tasks => setTasks(tasks))
  }, []);

  return (
      <div className="task-list">
        {tasks.map(task => <TaskCard task={task} key={task.id}/>)}
        <Adder title={"Add new task for today"}/>
      </div>
  );
};

export default TaskList;
