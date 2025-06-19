import {FormEvent, useCallback, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Container, {Body, Head, HeadMainContent, HeadSideContent,} from "../../components/layout/Container";
import Card, {MainContent, SideContent} from "../../components/layout/Card";
import {RiDeleteBin5Line} from "react-icons/ri";
import {MdLoop, MdOutlineDateRange, MdWarningAmber} from "react-icons/md";
import Checkbox from "../../components/Checkbox";
import {SubtaskAdder} from "../../components/Adder";
import {createSubtask, deleteSubtask, updateSubtask, updateTask,} from "../../api";
import type {UpdateTaskDto} from "../../types/task.ts";
import type {UpdateSubtaskDto} from "../../types/subtask.ts";
import type {Task} from "../../types/domain.ts";

// ──────────────────────────────────────────────────────────
//  Local task seed (will later be replaced with a real fetch)
export default function EditTask() {
  const {taskId} = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // ----- local “task” object -----
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
        description: "Cover all new service methods with Jest",
      },
      {
        id: "sub-002",
        title: "Review PR #42",
        completed: true,
        description: "Ensure integration tests pass",
      },
    ],
    recurrence: {
      id: "rec-100",
      startDate: "2025-06-19",
      endDate: "2025-12-31",
      period: 7,
    },
  };

  // ----- task-level state -----
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dateAssigned, setDateAssigned] = useState(task.dateAssigned);
  const [dateDue, setDateDue] = useState(task.dateDue);

  // recurrence state
  const [isRecurrent, setIsRecurrent] = useState(!!task.recurrence);
  const [recStart, setRecStart] = useState(task.recurrence?.startDate ?? "");
  const [recPeriod, setRecPeriod] = useState(task.recurrence?.period ?? 1);
  const [recEnd, setRecEnd] = useState(task.recurrence?.endDate ?? "");

  // ----- sub-tasks state -----
  const [subtasks, setSubtasks] = useState([...task.subtasks]);

  /*──────────────── helpers ────────────────*/
  const buildTaskDiff = (): UpdateTaskDto => {
    const diff: UpdateTaskDto = {};

    if (title !== task.title) diff.title = title;
    if (description !== task.description) diff.description = description;
    if (dateAssigned !== task.dateAssigned) diff.dateAssigned = dateAssigned || undefined;
    if (dateDue !== task.dateDue) diff.dateDue = dateDue || undefined;
    /* completed intentionally skipped */

    return diff;
  };

  const formIsValid = () => title.trim().length > 0;

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!taskId) return;

    const dto = buildTaskDiff();
    // If nothing changed, just go back.
    if (Object.keys(dto).length === 0) {
      navigate(location.state?.from ?? "/");
      return;
    }

    await updateTask(taskId, dto);
    navigate(location.state?.from ?? "/");
  };

  /*──────────── sub-task CRUD ────────────*/
  const addSubtask = async (stTitle: string) => {
    if (!taskId) return;
    const newSub = await createSubtask(taskId, {title: stTitle});
    setSubtasks((prev) => [...prev, newSub]);
  };

  const handleSubtaskChange = useCallback(
      (
          idx: number,
          field: keyof UpdateSubtaskDto,
          value: string | boolean
      ) => {
        setSubtasks((prev) => {
          const clone = [...prev];
          const old = clone[idx];

          // nothing to do
          if (!old || old[field as keyof typeof old] === value) return prev;

          clone[idx] = {...old, [field]: value};
          return clone;
        });

        // Fire-and-forget API call (no await → UI stays responsive)
        if (taskId) {
          const dto: UpdateSubtaskDto = {[field]: value} as UpdateSubtaskDto;
          updateSubtask(taskId, subtasks[idx].id, dto).catch(console.error);
        }
      },
      [subtasks, taskId]
  );

  const removeSubtask = async (idx: number) => {
    const st = subtasks[idx];
    if (!taskId || !st) return;

    await deleteSubtask(taskId, st.id);
    setSubtasks((prev) => prev.filter((_, i) => i !== idx));
  };

  /*──────────────── UI ────────────────*/
  return (
      <form onSubmit={handleSave}>
        <Container>
          <Head>
            <HeadMainContent>
              <Checkbox/>
              <input
                  type="text"
                  placeholder="Enter task title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
            </HeadMainContent>
            <HeadSideContent>
              <button
                  type="button"
                  className="passive warning-hover clear"
                  onClick={() => navigate(location.state?.from ?? "/")}
              >
                <RiDeleteBin5Line/>
              </button>
            </HeadSideContent>
          </Head>

          <Body>
            {/* Assigned date */}
            <label htmlFor="dateAssigned">
              <Card>
                <MainContent>
                  <MdOutlineDateRange/> <span>Assigned date:</span>
                  <input
                      type="date"
                      id="dateAssigned"
                      value={dateAssigned}
                      onChange={(e) => setDateAssigned(e.target.value)}
                  />
                </MainContent>
              </Card>
            </label>

            {/* Due date */}
            <label htmlFor="dateDue">
              <Card>
                <MainContent>
                  <MdWarningAmber/> <span>Due date:</span>
                  <input
                      type="date"
                      id="dateDue"
                      value={dateDue}
                      onChange={(e) => setDateDue(e.target.value)}
                  />
                </MainContent>
              </Card>
            </label>

            {/* Recurrence */}
            <Card>
              <MainContent>
                <MdLoop/>
                <div style={{display: "flex", flexDirection: "column"}}>
                  <label style={{display: "flex", gap: "10px", alignItems: "center"}}>
                    <span>Start on</span>
                    <input
                        type="date"
                        id="recStart"
                        value={recStart}
                        onChange={(e) => setRecStart(e.target.value)}
                    />
                  </label>

                  <label style={{display: "flex", gap: "10px", alignItems: "center"}}>
                    <span>Repeat every</span>
                    <input
                        type="number"
                        id="recPeriod"
                        min={1}
                        value={recPeriod}
                        onChange={(e) => setRecPeriod(Number(e.target.value))}
                        style={{width: 60}}
                    />
                    <span>day(s)</span>
                  </label>

                  <label style={{display: "flex", gap: "10px", alignItems: "center"}}>
                    <span>End on</span>
                    <input
                        type="date"
                        id="recEnd"
                        value={recEnd}
                        onChange={(e) => setRecEnd(e.target.value)}
                    />
                  </label>
                </div>
              </MainContent>
            </Card>

            {/* Description */}
            <Card>
              <MainContent>
              <textarea
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
              </MainContent>
            </Card>

            {/* Sub-tasks */}
            {subtasks.map((st, idx) => (
                <Card key={st.id}>
                  <MainContent>
                    <Checkbox
                        // onChange={(checked) => todo handle later
                        //     handleSubtaskChange(idx, "completed", checked)
                        // }
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        value={st.title}
                        onChange={(e) =>
                            handleSubtaskChange(idx, "title", e.target.value)
                        }
                    />
                  </MainContent>
                  <SideContent>
                    <button
                        type="button"
                        className="passive clear warning-hover"
                        onClick={() => removeSubtask(idx)}
                    >
                      <RiDeleteBin5Line/>
                    </button>
                  </SideContent>
                </Card>
            ))}

            <SubtaskAdder add={({title}) => addSubtask(title)}/>

            {/* Save */}
            <div style={{marginTop: "1rem"}}>
              <button type="submit" disabled={!formIsValid()}>
                Save
              </button>
            </div>
          </Body>
        </Container>
      </form>
  );
};
