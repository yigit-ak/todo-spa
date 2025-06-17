import Card, {MainContent} from "../layout/Card";
import "./Adder.scss";
import AddIcon from "../../assets/AddIcon.tsx";

interface Props {
  title: string;
  add(): void;
}

export default function Adder({title, add}: Props) {
  return (
      <Card className="adder">
        <MainContent>
          <AddIcon/>
          <span className="title">{title}</span>
        </MainContent>
      </Card>
  );
}