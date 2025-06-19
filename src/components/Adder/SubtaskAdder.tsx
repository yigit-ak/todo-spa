import {useState, KeyboardEvent} from "react";

import Adder from "./Adder";
import Card, {MainContent} from "../layout/Card";
import Checkbox from "../Checkbox";
import type {CreateSubtaskDto} from "../../types/subtask";

interface Props {
  add(subtask: CreateSubtaskDto): void;
}

export default function SubtaskAdder({add}: Props) {
  const [title, setTitle] = useState<string>("");

  function commit() {
    const trimmed = title.trim();
    if (!trimmed) return;

    const payload: CreateSubtaskDto = {
      title: trimmed,
    };

    add(payload);
    setTitle(""); // clear for the next entry
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // keep it from bubbling to parent <form>
      commit();
    }
  }

  return (
      <Adder title="Add subtask">
        <Card className="adder">
          <MainContent>
            <Checkbox/>
            <input
                type="text"
                autoFocus
                placeholder="Subtask title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
            />
          </MainContent>
        </Card>
      </Adder>
  );
}
