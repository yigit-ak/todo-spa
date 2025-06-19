import Card, {MainContent} from "../layout/Card";
import "./Adder.scss";
import AddIcon from "../../assets/AddIcon.tsx";
import {useState} from "react";

interface Props {
  children: any;
  title: string;
}

export default function Adder({children, title, add}: Props) {
  const [addMode, setAddMode] = useState(false);
  const toggleAddMode = () => setAddMode(prev => !prev);

  return addMode ? (
      <>{children}</>
  ) : (
      <Card className="adder" onClick={toggleAddMode}>
        <MainContent>
          <AddIcon/>
          <span className="title">{title}</span>
        </MainContent>
      </Card>
  );
}
