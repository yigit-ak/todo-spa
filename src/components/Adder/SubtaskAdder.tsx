import Adder from "./Adder.tsx";
import Card, {MainContent} from "../layout/Card";
import Checkbox from "../Checkbox";

interface Props {
  add() : void;
}

export default function SubtaskAdder() {
  return (
      <Adder title="Add subtask">
        <Card className="adder">
          <MainContent>
            <Checkbox/>
            <input type="text" autoFocus={true}/>
            {/*<input name="parentTaskId" value={parentTaskId} hidden/> todo think how to implement*/}
          </MainContent>
        </Card>
      </Adder>
  );
}
