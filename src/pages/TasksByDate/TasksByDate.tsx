import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import type {Task} from "../../types/domain.ts";
import Container, {Body, Head, HeadMainContent, HeadSideContent} from "../../components/layout/Container";
import {getDateContainerHead} from "../../util/dateUtil.ts";
import TaskCard from "../../components/TaskCard";
import {TaskAdder} from "../../components/Adder";
import type {CreateTaskDto} from "../../types/task.ts";
import {createTask, getTasksByDate} from "../../api";

export default function TasksByDate() {
  const {date} = useParams<{ date: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1) Initial fetch
  const loadTasks = useCallback(async () => {
    if (!date) return;
    setLoading(true);
    try {
      const res = await getTasksByDate(date);
      setTasks(res);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadTasks();
  }, []);

  // 2) Create (incremental, using Location header)
  async function handleAdd(taskDto: CreateTaskDto) {
    try {
      // 2a) POST to create
      const newTask = await createTask({...taskDto, dateAssigned: date});
      setTasks(prev => [...prev, newTask]);
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
          <TaskAdder dateAssigned={date} add={handleAdd}/>
        </Body>

      </Container>
  );

}