import {FormEvent, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import type {Recurrence} from "../../types/domain.ts";
import type {UpdateRecurrenceDto} from "../../types/recurrence.ts";
import type {CreateSubtaskDto} from "../../types/subtask.ts";

import Container, {Body, Head, HeadMainContent, HeadSideContent} from "../../components/layout/Container";
import Card, {MainContent, SideContent} from "../../components/layout/Card";
import Checkbox from "../../components/Checkbox";
import {SubtaskAdder} from "../../components/Adder";
import {RiDeleteBin5Line} from "react-icons/ri";
import {MdLoop, MdOutlineDateRange, MdWarningAmber} from "react-icons/md";
import {updateRecurrence} from "../../api"; // ✅ make sure this function exists

export default function EditRecurrence() {
  const {recurrenceId} = useParams<{ recurrenceId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: Fetch this from backend by recurrenceId
  const recurrence: Recurrence = {
    id: recurrenceId || "rec-123",
    startDate: "2025-06-20",
    endDate: "2025-12-20",
    period: 7,
    taskTemplate: {
      title: "Weekly Report Task",
      description: "Prepare and submit the weekly project report",
      subtasks: [
        {title: "Collect data", description: "Gather metrics"},
        {title: "Write summary", description: "Summarize key points"},
        {title: "Submit to manager", description: "Upload and notify"},
      ]
    }
  };

  // State
  const [startDate, setStartDate] = useState(recurrence.startDate);
  const [endDate, setEndDate] = useState(recurrence.endDate ?? "");
  const [period, setPeriod] = useState(recurrence.period.toString());

  const [title, setTitle] = useState(recurrence.taskTemplate.title);
  const [description, setDescription] = useState(recurrence.taskTemplate.description ?? "");
  const [subtasks, setSubtasks] = useState<CreateSubtaskDto[]>([...recurrence.taskTemplate.subtasks ?? []]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!recurrenceId) return;

    const dto: UpdateRecurrenceDto = {};

    if (startDate !== recurrence.startDate) dto.startDate = startDate;
    if (endDate !== (recurrence.endDate ?? "")) dto.endDate = endDate || null;
    if (period !== recurrence.period.toString()) dto.period = parseInt(period);

    const templateDiff: UpdateRecurrenceDto["taskTemplate"] = {};
    if (title !== recurrence.taskTemplate.title) templateDiff.title = title;
    if (description !== (recurrence.taskTemplate.description ?? "")) templateDiff.description = description;
    if (JSON.stringify(subtasks) !== JSON.stringify(recurrence.taskTemplate.subtasks ?? [])) {
      templateDiff.subtasks = subtasks;
    }
    if (Object.keys(templateDiff).length > 0) dto.taskTemplate = templateDiff;

    if (Object.keys(dto).length === 0) {
      navigate(location.state?.from ?? "/");
      return;
    }
    console.log(dto);
    await updateRecurrence(recurrenceId, dto);

    navigate(location.state?.from ?? "/");
  };

  const addSubtask = (title: string) => {
    setSubtasks(prev => [...prev, {title}]);
  };

  const handleSubtaskChange = (idx: number, field: keyof CreateSubtaskDto, value: string) => {
    setSubtasks(prev => {
      const updated = [...prev];
      updated[idx] = {...updated[idx], [field]: value};
      return updated;
    });
  };

  const removeSubtask = (idx: number) => {
    setSubtasks(prev => prev.filter((_, i) => i !== idx));
  };

  return (
      <form onSubmit={handleSave}>
        <Container>
          <Head>
            <HeadMainContent>
              <Checkbox/>
              <input
                  type="text"
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
              />
            </HeadMainContent>
            <HeadSideContent>
              <button
                  type="button"
                  className="passive warning-hover clear"
                  onClick={() => navigate(location.state?.from ?? "/")}
                  // handle click => delete the recurrence, go back where you came from
              >
                <RiDeleteBin5Line/>
              </button>
            </HeadSideContent>
          </Head>

          <Body>
            {/* Start Date */}
            <label htmlFor="startDate">
              <Card>
                <MainContent>
                  <MdOutlineDateRange/>
                  <span>Start date:</span>
                  <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                  />
                </MainContent>
              </Card>
            </label>

            {/* End Date */}
            <label htmlFor="endDate">
              <Card>
                <MainContent>
                  <MdWarningAmber/>
                  <span>End date:</span>
                  <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                  />
                </MainContent>
              </Card>
            </label>

            {/* Period */}
            <Card>
              <MainContent>
                <MdLoop/>
                <span>Repeat every</span>
                <input
                    type="number"
                    min={1}
                    style={{width: "4rem"}}
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                />
                <span>day(s)</span>
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

            {/* Subtasks */}
            {subtasks.map((st, idx) => (
                <Card key={idx}>
                  <MainContent>
                    <Checkbox/>
                    <input
                        type="text"
                        placeholder="Title"
                        value={st.title}
                        onChange={(e) => handleSubtaskChange(idx, "title", e.target.value)}
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

            <SubtaskAdder add={({title}) => addSubtask(title)} />

            {/* Save */}
            <div style={{marginTop: "1rem"}}>
              <button type="submit">Save</button>
            </div>
          </Body>
        </Container>
      </form>
  );
}
