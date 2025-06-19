import {useNavigate, useParams} from "react-router-dom";
import Container, {Body, Head, HeadMainContent, HeadSideContent} from "../../components/layout/Container";
import type {Task} from "../../types/domain";
import Checkbox from "../../components/Checkbox";
import {BiSolidEdit} from "react-icons/bi";
import {MdLoop, MdOutlineDateRange, MdWarningAmber} from "react-icons/md";
import Card, {MainContent} from "../../components/layout/Card";
import {SubtaskCard} from "../../components/TaskCard";

export default function TaskDetails() {
  const {taskId} = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  // TODO: Replace with API fetch by ID
  const task: Task = {
    id: taskId || "",
    title: "Implement new feature X",
    description: "Refactor module Y, add endpoints and update docs.",
    dateAssigned: "2025-06-20",
    dateDue: "2025-07-01",
    completed: false,
    subtasks: [
      {
        id: "sub-001",
        title: "Write unit tests",
        completed: false,
        description: "Cover all new service methods with Jest"
      },
      {id: "sub-002", title: "Review PR #42", completed: true, description: "Ensure integration tests pass"},
    ],
    recurrence: {
      id: "rec-100",
      startDate: "2025-06-19",
      endDate: "2025-12-31",
      period: 7,
    },
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
                onClick={() => navigate(`/tasks/${taskId}/edit`)}
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
