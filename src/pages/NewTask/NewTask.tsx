import {FormEvent, useState} from "react";
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import Container, {Body, Head, HeadMainContent, HeadSideContent} from "../../components/layout/Container";
import AddIcon from "../../assets/AddIcon";
import {RiDeleteBin5Line} from "react-icons/ri";
import {MdLoop, MdOutlineDateRange, MdWarningAmber} from "react-icons/md";
import Card, {MainContent, SideContent} from "../../components/layout/Card";
import type {CreateSubtaskDto} from "../../types/subtask.ts";
import type {CreateRecurrenceDto} from "../../types/recurrence.ts";
import {createRecurrence, createTask} from "../../api";
import type {CreateTaskDto} from "../../types/task.ts";
import {SubtaskAdder} from "../../components/Adder";
import Checkbox from "../../components/Checkbox";

/**
 * NewTask component – create a one‑off task or a recurrence.
 *
 * URL query parameters (all optional):
 *   - title:        pre‑fill the task title
 *   - date / dateAssigned: pre‑fill the assigned date (YYYY‑MM‑DD)
 *
 * Examples:
 *   /tasks/new?title=Buy%20milk
 *   /tasks/new?date=2025-06-21
 *   /tasks/new?title=Pay%20rent&dateAssigned=2025-07-01
 */
export default function NewTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // ---------- derived query params -------------
  const queryTitle = searchParams.get("title") ?? "";
  const queryDate =
      searchParams.get("date") ?? searchParams.get("dateAssigned") ?? "";

  // ---------- form state ----------------
  const [title, setTitle] = useState<string>(() => queryTitle);
  const [description, setDescription] = useState<string>("");
  const [dateAssigned, setDateAssigned] = useState<string>(() => queryDate);
  const [dateDue, setDateDue] = useState<string>("");

  // recurrence‑specific
  const [recStart, setRecStart] = useState<string>("");
  const [recPeriod, setRecPeriod] = useState<number>(0);
  const [recEnd, setRecEnd] = useState<string>("");
  const isRecurrent = Boolean(recStart && recPeriod > 0);

  // dynamic subtasks
  const [subtasks, setSubtasks] = useState<CreateSubtaskDto[]>([]);
  const addSubtask = (newSubtask: CreateSubtaskDto) => setSubtasks((prev) => [...prev, newSubtask]);

  const updateSubtask = (
      idx: number,
      key: "title" | "description",
      value: string,
  ) => setSubtasks((st) => st.map((s, i) => (i === idx ? {...s, [key]: value} : s)));
  const removeSubtask = (idx: number) =>
      setSubtasks((st) => st.filter((_, i) => i !== idx));

  // ---------- validation ---------------
  const formIsValid = () => {
    if (!title.trim()) return false;
    if (isRecurrent) {
      return !!recStart && recPeriod > 0;
    }
    return true;
  };

  // ---------- submit handler ------------
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formIsValid()) return;

    try {
      if (isRecurrent) {
        const payload: CreateRecurrenceDto = {
          taskTemplate: {
            title,
            description: description || undefined,
            subtasks: subtasks.filter((s) => s.title.trim()),
          },
          startDate: recStart,
          endDate: recEnd || undefined,
          period: recPeriod,
        };
        await createRecurrence(payload);
      } else {
        const payload: CreateTaskDto = {
          title,
          description,
          subtasks,
          dateAssigned,
          dateDue,
        };
        await createTask(payload);
      }

      // Go back to the originating page (or tasks list) after success
      navigate(location.state?.from ?? "/");
    } catch (err) {
      console.error(err);
      // TODO: display a toast / error banner
    }
  }

  // ---------- render --------------------
  return (
      <form onSubmit={handleSubmit}>
        <Container>
          <Head>
            <HeadMainContent>
              <AddIcon/>
              <input type="text"
                     placeholder="Enter task title"
                     required
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
              />
            </HeadMainContent>
            <HeadSideContent>
              {/* reset navigates back without saving */}
              <button className="passive warning-hover clear " onClick={() => navigate(location.state?.from ?? "/")}>
                <RiDeleteBin5Line/>
              </button>
            </HeadSideContent>
          </Head>

          <Body>
            {/* Assigned date */}
            <label htmlFor="dateAssigned" className={dateAssigned ? "" : "passive"}>
              <Card>
                <MainContent>
                  <MdOutlineDateRange/> <span>Assigned date:</span>
                  <input type="date"
                         id="dateAssigned"
                         value={dateAssigned}
                         onChange={(e) => setDateAssigned(e.target.value)}
                  />
                </MainContent>
              </Card>
            </label>

            {/* Due date */}
            <label htmlFor="dateDue" className={dateDue ? "" : "passive"}>
              <Card>
                <MainContent>
                  <MdWarningAmber/> <span>Due date:</span>
                  <input type="date"
                         id="dateDue"
                         value={dateDue}
                         onChange={(e) => setDateDue(e.target.value)}
                  />
                </MainContent>
              </Card>
            </label>

            {/* Recurrence */}
            <Card>
              <MainContent className={isRecurrent ? "" : "passive"}>
                <MdLoop/>
                <div style={{display: "flex", flexDirection: "column"}}>
                  <label style={{display: "flex", gap: "10px"}} htmlFor="recStart">
                    <span>Start on</span>
                    <input type="date"
                           id="recStart"
                           value={recStart}
                           onChange={(e) => setRecStart(e.target.value)}
                    />
                  </label>

                  <label style={{display: "flex", gap: "10px"}} htmlFor="recPeriod">
                    <span>Repeat every</span>
                    <input type="number"
                           id="recPeriod"
                           value={recPeriod}
                           onChange={(e) => setRecPeriod(Number(e.target.value))}
                    />
                    day(s)
                  </label>

                  <label style={{display: "flex", gap: "10px"}} htmlFor="recEnd">
                    <span>End on</span>
                    <input type="date"
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
              <textarea placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
              />
              </MainContent>
            </Card>

            {/* Sub‑tasks */}
            {subtasks.map((st, idx) => (
                <Card key={idx}>
                  <MainContent>
                    <Checkbox/>
                    <input type="text"
                           placeholder="Title"
                           value={st.title}
                           onChange={(e) => updateSubtask(idx, "title", e.target.value)}
                    />
                  </MainContent>
                  <SideContent>
                    <button className="passive clear warning-hover" onClick={() => removeSubtask(idx)}>
                      <RiDeleteBin5Line/>
                    </button>
                  </SideContent>
                </Card>

            ))}

            <SubtaskAdder add={addSubtask}/>

            {/* Save button */}
            <div>
              <button type="submit" disabled={!formIsValid()}>
                Save
              </button>
            </div>
          </Body>
        </Container>
      </form>
  );
}
