import {useNavigate, useParams} from "react-router-dom";
import Container, {Body, Head, HeadMainContent, HeadSideContent} from "../../components/layout/Container";
import type {Task} from "../../types/domain.ts";
import Checkbox from "../../components/Checkbox";
import {BiSolidEdit} from "react-icons/bi";
import {MdLoop, MdOutlineDateRange, MdWarningAmber} from "react-icons/md";
import Card, {MainContent} from "../../components/layout/Card";

export default function TaskDetails() {
  const {taskId} = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task: Task = {
    id: "task-123",
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
      {
        id: "sub-002",
        title: "Review PR #42",
        completed: true,
        description: "Ensure integration tests pass"
      }
    ],
    recurrence: {
      id: "rec-100",
      startDate: "2025-06-19",
      endDate: "2025-12-31",
      period: 7
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
            <button className="passive info-hover clear" onClick={() => navigate(`/tasks/${taskId}/edit`)}>
              <BiSolidEdit/>
            </button>
          </HeadSideContent>
        </Head>


        <Body>
          <MainContent>
            <MdOutlineDateRange/> <span>Assigned date: {task.dateAssigned}</span>
          </MainContent>


        <label htmlFor="dateDue" className={dateDue ? "" : "passive"}>
          <Card>
            <MainContent>
              <MdWarningAmber/> <span>Due date: {task.dateDue}</span>
            </MainContent>
          </Card>
        </label>

        <MainContent className={!!task.recurrence ? "" : "passive"}>
          <MdLoop/>
          <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", gap: "10px"}} >
              <span>Start on {task.recurrence?.startDate}</span>
            </div>

            <div style={{display: "flex", gap: "10px"}} >
              <span>Repeat every {task.recurrence?.period} days</span>
            </div>

            <div style={{display: "flex", gap: "10px"}} >
              <span>End on {task.recurrence?.endDate}</span>
            </div>
          </div>
        </MainContent>

        </Body>

      </Container>
  );
}
