import Adder from "./Adder.tsx";
import Card, {MainContent, SideContent} from "../layout/Card";
import Checkbox from "../Checkbox";
import {HiOutlineArrowsExpand} from "react-icons/hi";
import type {Task} from "../../types/domain.ts";

interface Props {
  dateAssigned?: string;

  add(task: Task): void;
}

export default function TaskAdder({dateAssigned, add}: Props) {


  return (
      <Adder title="Add task">
        <form>
          <Card className="adder">
            <MainContent>
              <Checkbox/>
              <input type="text" name="title" autoFocus={true}/>
              <input name="dateAssigned" value={dateAssigned} hidden/>
            </MainContent>
            <SideContent>
              <HiOutlineArrowsExpand/> // todo link to new page
            </SideContent>
          </Card>
        </form>
      </Adder>
  );
}
