import Adder from "./Adder.tsx";
import Card, {MainContent, SideContent} from "../layout/Card";
import Checkbox from "../Checkbox";
import {HiOutlineArrowsExpand} from "react-icons/hi";
import type {CreateTaskDto} from "../../types/task.ts";
import type {FormEvent} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

interface Props {
  dateAssigned?: string;

  add(task: CreateTaskDto): void;
}

/**
 * Inline quick‑add card shown in task lists.
 * Collects a minimal Task (title + optional assigned date)
 * and sends it to the parent via the `add` callback.
 */
export default function TaskAdder({dateAssigned, add}: Props) {
  const [title, setTitle] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return; // ignore empty submissions

    const task: CreateTaskDto = {
      title: trimmed,
      dateAssigned: dateAssigned || undefined,
    };

    add(task);
  }

  return (
      <Adder title="Add task">
        <form onSubmit={handleSubmit}>
          <Card className="adder">
            <MainContent>
              <Checkbox/>
              <input type="text"
                     name="title"
                     autoFocus
                     placeholder="Task title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
              /> <input type="hidden" name="dateAssigned" value={dateAssigned}/>
            </MainContent>
            <SideContent>
              <Link
                  to={`/tasks/new?title=${encodeURIComponent(title)}${
                      dateAssigned ? `&date=${dateAssigned}` : ""
                  }`}
              >
                <button className="clear" style={{color: "#89D7FF"}} type="button">
                  <HiOutlineArrowsExpand/>
                </button>
              </Link>
            </SideContent>
          </Card>
        </form>
      </Adder>
  );
}
