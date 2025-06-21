import PrivateRoute from "./auth/PrivateRoute.tsx";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {AuthProvider} from "./auth/AuthProvider.tsx";
import Callback from "./pages/Callback";
import TasksByDate from "./pages/TasksByDate";
import NewTask from "./pages/NewTask"
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import EditRecurrence from "./pages/EditRecurrence";

const App = () => {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* redirect root → today’s date view */}
            <Route path="/" element={<Navigate to={`/date/${new Date().toISOString().slice(0, 10)}`} replace/>}/>

            {/* top-level date route: /date/2025-06-17 */}
            <Route path="date/:date" element={<TasksByDate/>}/>

            {/*/!* other task views under /tasks *!/*/}
            <Route path="tasks">
            {/*  <Route path="due" element={<TasksByDue/>}/>*/}
            {/*  <Route path="unassigned" element={<UnassignedTasks/>}/>*/}
              <Route path="new" element={<NewTask/>}/>

              {/* per-task details & edit */}
              <Route path=":taskId">
                <Route index element={<TaskDetails/>}/>
                {/*<Route path="edit" element={<EditTask/>}/>*/}
              </Route>
            </Route>

            <Route path="recurrences">
              <Route path=":recurrenceId">
                <Route path="edit" element={<EditRecurrence/>}/>
              </Route>
            </Route>

            {/*/!* list pages *!/*/}
            {/*<Route path="lists">*/}
            {/*  <Route index element={<ListsOverview/>}/>*/}
            {/*  <Route path=":listId" element={<ListDetail/>}/>*/}
            {/*</Route>*/}

            <Route path="/callback" element={<Callback/>}/>

            {/*/!* catch-all *!/*/}
            {/*<Route path="*" element={<NotFound/>}/>*/}

          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App
