import Adder from "./Adder.tsx";
import Card, {MainContent} from "../layout/Card";
import Checkbox from "../Checkbox";
import type {CreateSubtaskDto} from "../../types/subtask.ts";
import {FormEvent, useState} from "react";
import type {CreateTaskDto} from "../../types/task.ts";

interface Props {
  add(subtask: CreateSubtaskDto): void;
}

export default function SubtaskAdder({add}: Props) {
  const [title, setTitle] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return; // ignore empty submissions

    const task: CreateSubtaskDto = {
      title: trimmed,
    };

    add(task);
  }

  return (
      <Adder title="Add subtask">
        <form onSubmit={handleSubmit}>
          <Card className="adder">
            <MainContent>
              <Checkbox/>
              <input type="text"
                     autoFocus
                     name="title"
                     placeholder="Subtask title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
              />
            </MainContent>
          </Card>
        </form>
      </Adder>
  );
}
