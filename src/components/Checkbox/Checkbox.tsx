import "./Checkbox.scss";
import TickIcon from "../../assets/TickIcon.tsx";

interface Props {
  completed: boolean;
  onClick?: () => void;
}

const Checkbox = ({completed, ...res}: Props) => {

  return (
      <div className={`checkbox ${completed ? "completed" : ""}`} {...res}>
        <TickIcon/>
      </div>
  );
};

export default Checkbox;