import {FormEvent, useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Container, {Body, Head, HeadMainContent, HeadSideContent,} from "../../components/layout/Container";
import Card, {MainContent, SideContent} from "../../components/layout/Card";
import {RiDeleteBin5Line} from "react-icons/ri";
import {MdLoop, MdOutlineDateRange, MdWarningAmber} from "react-icons/md";
import Checkbox from "../../components/Checkbox";
import {SubtaskAdder} from "../../components/Adder";
import {createSubtask, deleteSubtask, getTask, updateSubtask, updateTask,} from "../../api";
import type {UpdateTaskDto} from "../../types/task.ts";
import type {UpdateSubtaskDto} from "../../types/subtask.ts";
import type {Subtask, Task} from "../../types/domain.ts";

// ──────────────────────────────────────────────────────────
//  Local task seed (will later be replaced with a real fetch)
export default function EditTask() {
  const {taskId} = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [taskData, setTaskData] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ─── Form fields ──────────────────────────────
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateAssigned, setDateAssigned] = useState<string>("");
  const [dateDue, setDateDue] = useState<string>("");

  // ─── Subtasks list ────────────────────────────
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  // ─── Fetch the real task on mount ─────────────
  useEffect(() => {
    if (!taskId) return;
    setLoading(true);

    getTask(taskId)
        .then((t) => {
          setTaskData(t);
          setTitle(t.title);
          setDescription(t.description ?? "");
          setDateAssigned(t.dateAssigned ?? "");
          setDateDue(t.dateDue ?? "");
          setSubtasks(t.subtasks ?? []);
          setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load task.");
        })
        .finally(() => setLoading(false));
  }, [taskId]);

  if (loading)
    return <p style={{ padding: "1rem" }}>Loading task…</p>;
  if (error)
    return (
        <p style={{ padding: "1rem", color: "red" }}>
          {error}
        </p>
    );
  if (!taskData)
    return <p style={{ padding: "1rem" }}>No task found.</p>;

  // ─── Build a diff only for changed fields ──────
  const buildTaskDiff = (): UpdateTaskDto => {
    const diff: UpdateTaskDto = {};
    if (title !== taskData.title) diff.title = title;
    if (description !== (taskData.description ?? ""))
      diff.description = description;
    if (
        dateAssigned !== (taskData.dateAssigned ?? "")
    )
      diff.dateAssigned =
          dateAssigned || undefined;
    if (dateDue !== (taskData.dateDue ?? ""))
      diff.dateDue = dateDue || undefined;
    return diff;
  };


  const formIsValid = () => title.trim().length > 0;


  // ─── Save handler ─────────────────────────────
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!taskData) return;

    const dto = buildTaskDiff();
    // nothing changed → just go back
    if (Object.keys(dto).length === 0) {
      navigate(location.state?.from ?? "/");
      return;
    }

    try {
      await updateTask(taskData.id, dto);
      navigate(location.state?.from ?? "/");
    } catch (err) {
      console.error(err);
      alert("Failed to update task. Try again.");
    }
  };

  // ─── Sub‐task CRUD ────────────────────────────
  const addSubtask = async (title: string) => {
    if (!taskData) return;
    try {
      const newSub = await createSubtask(taskData.id, {
        title
      });
      setSubtasks((prev) => [...prev, newSub]);
    } catch (err) {
      console.error(err);
      alert("Failed to add subtask.");
    }
  };

  const handleSubtaskChange = useCallback(
      (
          idx: number,
          field: keyof UpdateSubtaskDto,
          value: string | boolean
      ) => {
        setSubtasks((prev) => {
          const copy = [...prev];
          const old = copy[idx];
          if (!old || old[field as any] === value)
            return prev;
          copy[idx] = { ...old, [field]: value };
          return copy;
        });

        // fire‐and‐forget
        if (taskData) {
          const dto = { [field]: value } as UpdateSubtaskDto;
          updateSubtask(
              taskData.id,
              subtasks[idx].id,
              dto
          ).catch(console.error);
        }
      },
      [subtasks, taskData]
  );

  const removeSubtask = async (idx: number) => {
    if (!taskData) return;
    const st = subtasks[idx];
    try {
      await deleteSubtask(taskData.id, st.id);
      setSubtasks((prev) =>
          prev.filter((_, i) => i !== idx)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete subtask.");
    }
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
