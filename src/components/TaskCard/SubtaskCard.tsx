import {Subtask, Task} from "../../types/domain.ts";
import Card, {MainContent} from "../layout/Card";
import Checkbox from "../Checkbox";
import {toggleSubtaskCompleted} from "../../api";
import {useState} from "react";

interface Props {
  parent: Task;
  task: Subtask;
  key: string;
}

export default function SubtaskCard({parent, task}: Props) {
  const [completed, setCompleted] = useState<boolean>(task.completed);

  function toggleCompleted() {
    toggleSubtaskCompleted(parent.id, task.id);
    setCompleted(prev => !prev);
  }

  return (
      <Card className={completed ? 'completed' : ""}>
        <MainContent>
          <Checkbox completed={completed} onClick={toggleCompleted}/>
          <span>{task.title}</span>
        </MainContent>
      </Card>
  );

}