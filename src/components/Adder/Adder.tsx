import Card, {MainContent} from "../layout/Card";
import {FaPlus} from "react-icons/fa";
import "./Adder.scss";

interface Props {
  title: string;

  action(): void;
}

export default function Adder({ title, action }: Props) {
  return (
      <Card className="adder" onClick={action}>
        <MainContent>
          <span className="icon"><FaPlus/></span>
          <span className="title">{title}</span>
        </MainContent>
      </Card>
  );
}