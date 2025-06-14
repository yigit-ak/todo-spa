import "./NewTask.scss"
import {createTask} from "../../api";
import {useNavigate} from "react-router-dom";
import  {useState} from "react";
import type {CreateTaskDto} from "../../types/task.ts";

export default function NewTask() {
  const navigate = useNavigate();
  const fallback = "/";

  // State for the form, defaulting dateAssigned to today
  const [form, setForm] = useState<CreateTaskDto>({
    title: "",
    description: "",
    dateAssigned: "",
    dateDue: "",
    recurrenceId: "",
  });

  // Generic change‐handler for all inputs/textareas
  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit: call your API, then go back
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(form); // uses axiosInstance.post("/tasks", task) :contentReference[oaicite:0]{index=0}
      // if there's a history entry, go back, else go to /tasks
      if (window.history.length > 1) navigate(-1);
      else navigate(fallback, { replace: true });
    } catch (err) {
      console.error("Failed to create task:", err);
      // you could surface an error message here
    }
  };

  const handleCancel = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate(fallback, { replace: true });
  };

  return (
      <div className="page-container">
        <h1>Create New Task</h1>
        <form onSubmit={handleSubmit} className="task-form">
          <label>
            Title *
            <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={255}
            />
          </label>

          <label>
            Description
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
            />
          </label>

          <label>
            Assigned On
            <input
                type="date"
                name="dateAssigned"
                value={form.dateAssigned}
                onChange={handleChange}
            />
          </label>

          <label>
            Due Date
            <input
                type="date"
                name="dateDue"
                value={form.dateDue}
                onChange={handleChange}
            />
          </label>

          <label>
            Recurrence ID
            <input
                type="text"
                name="recurrenceId"
                value={form.recurrenceId}
                onChange={handleChange}
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
  );

}