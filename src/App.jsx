import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import Attendance from "./pages/Attendance";
import Enrollment from "./pages/Enrollment";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/enrollment" element={<Enrollment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;