import "./Checkbox.scss";
import TickIcon from "../../assets/TickIcon.tsx";
import type {Task} from "../../types/domain.ts";
import {toggleTaskCompleted} from "../../api";

interface Props {
  completed: boolean;
}

const Checkbox = ({completed, ...res}: Props) => {

  return (
      <div className={`checkbox ${completed ? "completed" : ""}`} {...res}>
        <TickIcon/>
      </div>
  );
};

export default Checkbox;