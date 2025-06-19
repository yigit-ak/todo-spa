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
      <div
          className="adder-wrapper"
          tabIndex={-1}
          /*
           * onBlur fires every time focus leaves one descendant and enters
           * another, so we must check that the newly focused element is outside
           * the wrapper.  relatedTarget is the element gaining focus.
           */
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setAddMode(false);
            }
          }}
      >
        {children}
      </div>
  ) : (
      <Card className="adder" onClick={toggleAddMode}>
        <MainContent>
          <AddIcon/>
          <span className="title">{title}</span>
        </MainContent>
      </Card>
  );
}
