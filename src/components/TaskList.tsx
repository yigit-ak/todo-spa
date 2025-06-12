import TaskCard from "./TaskCard.tsx";
import type {Task} from "../types/domain.ts";
import "./TaskList.scss";
import Adder from "./Adder.tsx";

const TaskList = () => {

  const tasks: Task[] = [
    /* 1 */
    {
      id: "task-001",
      title: "Buy groceries for the week",
      description: "Hit the market after work",
      dateAssigned: "2025-06-10",
      dateDue: "2025-06-11",
      completed: false,
      subtasks: [
        {id: "sub-001a", title: "Milk", completed: false},
        {id: "sub-001b", title: "Bread", completed: true},
        {id: "sub-001c", title: "Eggs", completed: false}
      ]
    },

    /* 2 */
    {
      id: "task-002",
      title: "Write blog post on TypeScript tips",
      dateAssigned: "2025-06-09",
      completed: false,
      subtasks: [
        {id: "sub-002a", title: "Outline sections", completed: true},
        {id: "sub-002b", title: "Draft content", completed: false},
        {id: "sub-002c", title: "Proof-read", completed: false}
      ]
    },

    /* 3 – daily recurrence */
    {
      id: "task-003",
      title: "Morning workout",
      dateAssigned: "2025-06-10",
      completed: false,
      subtasks: [
        {id: "sub-003a", title: "Warm-up", completed: true},
        {id: "sub-003b", title: "Cardio", completed: false},
        {id: "sub-003c", title: "Stretch", completed: false}
      ],
      recurrence: {
        id: "rec-daily-workout",
        startDate: "2025-06-10",
        endDate: null,          // open-ended
        period: 1               // every day
      }
    },

    /* 4 – monthly recurrence */
    {
      id: "task-004",
      title: "Monthly budget review",
      description: "Reconcile accounts and update spreadsheet",
      dateAssigned: "2025-06-01",
      dateDue: "2025-06-02",
      completed: true,
      subtasks: [],
      recurrence: {
        id: "rec-budget-monthly",
        startDate: "2025-01-01",
        endDate: null,
        period: 30              // ≈ monthly
      }
    },

    /* 5 */
    {
      id: "task-005",
      title: "Prepare Q3 presentation slides",
      dateAssigned: "2025-06-05",
      dateDue: "2025-06-15",
      completed: false,
      subtasks: [
        {id: "sub-005a", title: "Gather metrics", completed: true},
        {id: "sub-005b", title: "Create charts", completed: false},
        {id: "sub-005c", title: "Slide design", completed: false}
      ]
    },

    /* 6 */
    {
      id: "task-006",
      title: "Dentist appointment",
      description: "6-month check-up",
      dateAssigned: "2025-06-02",
      dateDue: "2025-06-12",
      completed: true,
      subtasks: [
        {id: "sub-006a", title: "Confirm time", completed: true}
      ]
    },

    /* 7 – short recurrence series */
    {
      id: "task-007",
      title: "Water balcony plants",
      dateAssigned: "2025-06-10",
      completed: false,
      subtasks: [],
      recurrence: {
        id: "rec-plants-summer",
        startDate: "2025-06-10",
        endDate: "2025-09-01",
        period: 2              // every 2 days
      }
    },

    /* 8 */
    {
      id: "task-008",
      title: "Read ‘Clean Architecture’ Chapter 4",
      dateAssigned: "2025-06-08",
      dateDue: "2025-06-14",
      completed: false,
      subtasks: [
        {id: "sub-008a", title: "Read pages 75-90", completed: false},
        {id: "sub-008b", title: "Summarize notes", completed: false}
      ]
    },

    /* 9 */
    {
      id: "task-009",
      title: "Book summer vacation",
      dateAssigned: "2025-06-07",
      completed: false,
      subtasks: [
        {id: "sub-009a", title: "Pick destination", completed: true},
        {id: "sub-009b", title: "Check flights", completed: false},
        {id: "sub-009c", title: "Reserve hotel", completed: false}
      ]
    },

    /* 10 */
    {
      id: "task-010",
      title: "Sync portfolio website with the latest projects",
      dateAssigned: "2025-06-06",
      completed: false,
      subtasks: [
        {id: "sub-010a", title: "Add AWS practice repo", completed: true},
        {id: "sub-010b", title: "Write project descriptions", completed: false},
        {id: "sub-010c", title: "Push to GitHub Pages", completed: false}
      ]
    }
  ]; // todo remove later

  return (
      <div className="task-list">
        {tasks.map(task => <TaskCard task={task} key={task.id}/>)}
        <Adder title={"Add new task for today"}/>
      </div>
  );
};

export default TaskList;
