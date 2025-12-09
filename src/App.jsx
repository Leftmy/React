import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TrafficLightsProvider } from "./context/TrafficLightsContext";

import Header from "./Header";
import Home from "./Pages/Home";
import Vertical from "./Pages/Vertical";
import Horizontal from "./Pages/Horizontal";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TrafficLightsProvider>

          <Header />

          <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200 text-base-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/vertical"
                element={
                  <ProtectedRoute>
                    <Vertical />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/horizontal"
                element={
                  <ProtectedRoute>
                    <Horizontal />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>

        </TrafficLightsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
