import {Subtask} from "../../types/domain.ts";
import Card, {MainContent} from "../layout/Card";
import Checkbox from "../Checkbox";

interface Props {
  task: Subtask;
  key: string;
}

export default function SubtaskCard({task}: Props) {

  return (
      <Card className={task.completed && 'completed'}>
        <MainContent>
          <Checkbox/>
          <span>{task.title}</span>
        </MainContent>
      </Card>
  );

}