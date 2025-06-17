import Today from "./pages/Today/Today.tsx";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./auth/AuthProvider.tsx";
import Callback from "./pages/Callback";
import NewTask from "./pages/NewTask";
import Login from "./pages/Login";

const App = () => {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/callback" element={<Callback/>}/>
            <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Today/>
                  </PrivateRoute>
                }
            />
            <Route path="/new-task" element={<NewTask/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App
