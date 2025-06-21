import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import type {Task} from "../../types/domain.ts";
import Container, {Body, Head, HeadMainContent, HeadSideContent} from "../../components/layout/Container";
import {getDateContainerHead} from "../../util/dateUtil.ts";
import TaskCard from "../../components/TaskCard";
import {TaskAdder} from "../../components/Adder";
import type {CreateTaskDto} from "../../types/task.ts";
import {createTask} from "../../api";

export default function TasksByDate() {
  const {date} = useParams<{ date: string }>();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Buy groceries",
      description: "Milk, eggs, bread, and fruits",
      dateAssigned: "2025-06-17",
      dateDue: "2025-06-18",
      completed: false,
      subtasks: [
        {id: "1-1", title: "Buy milk", completed: false},
        {id: "1-2", title: "Buy eggs", completed: true},
      ],
    },
    {
      id: "2",
      title: "Workout",
      description: "Morning gym session",
      dateAssigned: "2025-06-17",
      completed: false,
      subtasks: [],
      recurrence: {
        id: "r1",
        startDate: "2025-06-17",
        period: 2, // every 2 days
      },
    },
    {
      id: "3",
      title: "Study TypeScript",
      completed: true,
      subtasks: [
        {id: "3-1", title: "Read interfaces section", completed: true},
        {id: "3-2", title: "Do exercises", completed: true},
      ],
    },
    {
      id: "4",
      title: "Plan weekend trip",
      description: "Check options for a 2-day getaway",
      completed: false,
      dateDue: "2025-06-20",
      subtasks: [],
    },
    {
      id: "5",
      title: "Call parents",
      completed: true,
      subtasks: [],
    },
    {
      id: "6",
      title: "Team meeting",
      description: "Weekly sync with the project team",
      dateAssigned: "2025-06-16",
      dateDue: "2025-06-17",
      completed: false,
      subtasks: [
        {id: "6-1", title: "Prepare agenda", completed: true},
        {id: "6-2", title: "Join the call", completed: false},
      ],
      recurrence: {
        id: "r2",
        startDate: "2025-06-16",
        endDate: "2025-07-01",
        period: 7, // weekly
      },
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks for a given date
  useEffect(() => {
    if (!date) return;

    setLoading(true);
    getTasksByDate(date)
        .then(res => {
          setTasks(res.data);
          setError(null);
        })
        .catch(err => {
          console.error(err);
          setError("Failed to fetch tasks for this date.");
        })
        .finally(() => setLoading(false));
  }, [date]);

  // Add a new task to this date
  async function addTask(task: CreateTaskDto) {
    try {
      const response = await createTask({...task, dateAssigned: date});
      setTasks(prev => [...prev, response]);
    } catch (err) {
      console.error("Failed to create task", err);
      alert("Failed to create task. Try again later.");
    }
  }

  if (!date) return <p style={{padding: "1rem"}}>No date provided.</p>;
  if (loading) return <p style={{padding: "1rem"}}>Loading tasks...</p>;
  if (error) return <p style={{padding: "1rem", color: "red"}}>{error}</p>;

  const {mainContent, sideContent} = getDateContainerHead(new Date(date));

  return (
      <Container>

        <Head>
          <HeadMainContent>
            {mainContent}
          </HeadMainContent>
          <HeadSideContent className="passive">
            {sideContent}
          </HeadSideContent>
        </Head>

        <Body>
          {tasks.map(task => <TaskCard task={task} key={task.id}/>)}
          <TaskAdder dateAssigned={date} add={addTask}/>
          {/*add={} todo implement the add fnctn*/}
        </Body>

      </Container>
  );

}