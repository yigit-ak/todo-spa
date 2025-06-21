import {useNavigate, useParams} from "react-router-dom";
import Container, {Body, Head, HeadMainContent, HeadSideContent} from "../../components/layout/Container";
import type {Task} from "../../types/domain";
import Checkbox from "../../components/Checkbox";
import {BiSolidEdit} from "react-icons/bi";
import {MdLoop, MdOutlineDateRange, MdWarningAmber} from "react-icons/md";
import Card, {MainContent} from "../../components/layout/Card";
import {SubtaskCard} from "../../components/TaskCard";
import {useEffect, useState} from "react";
import {getTask} from "../../api";

export default function TaskDetails() {
  const {taskId} = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) return;
    getTask(taskId)
        .then((res) => setTask(res))
        .catch((err) => {
          console.error(err);
          setError("Task not found.");
        });
  }, [taskId]);


  const handleEditClick = () => {
    if (!task.recurrence) {
      // plain task ➜ straight to task edit
      navigate(`/tasks/${task.id}/edit`);
    } else {
      // recurrent ➜ ask user which way
      navigate(`/recurrences/${task.recurrence.id}/edit`);
    }
  };

  return (
      <Container>
        <Head>
          <HeadMainContent>
            <Checkbox/>
            <span>{task.title}</span>
          </HeadMainContent>
          <HeadSideContent>
            <button
                className="passive info-hover clear"
                onClick={handleEditClick}
                title="Edit task"
            >
              <BiSolidEdit/>
            </button>
          </HeadSideContent>
        </Head>

        <Body>
          <Card>
            <MainContent>
              <MdOutlineDateRange/>
              <span>Assigned date: {task.dateAssigned || "-"}</span>
            </MainContent>
          </Card>

          <Card className="warning">
            <MainContent>
              <MdWarningAmber/>
              <span>Due date: {task.dateDue || "-"}</span>
            </MainContent>
          </Card>

          {task.recurrence && (
              <Card>
                <MainContent>
                  <MdLoop/>
                  <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                    <span>Start on {task.recurrence.startDate}</span>
                    <span>Repeat every {task.recurrence.period} day(s)</span>
                    {task.recurrence.endDate && <span>End on {task.recurrence.endDate}</span>}
                  </div>
                </MainContent>
              </Card>
          )}

          <Card>
            <MainContent>
              {task.description}
            </MainContent>
          </Card>

          {!!task.subtasks.length && task.subtasks.map(subtask => (
              <SubtaskCard task={subtask} key={subtask.id}/>
              )
          )}

        </Body>
      </Container>
  );
}
