import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forms.css";

export default function Attendance() {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState({
    studentName: "",
    studentId: "",
    date: "",
    status: "present",
    remarks: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance({
      ...attendance,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance),
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedData(result.data);
        setSubmitted(true);
        alert("✅ Attendance recorded successfully!");
        setAttendance({
          studentName: "",
          studentId: "",
          date: "",
          status: "present",
          remarks: "",
        });
      } else {
        setError(result.message || "Failed to record attendance");
      }
    } catch (err) {
      setError("Error connecting to server: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Attendance Form</h1>
      {error && <div className="error-message">{error}</div>}

      {submitted && submittedData && (
        <div className="success-box">
          <h2>✅ Attendance Recorded Successfully!</h2>
          <div className="submitted-data">
            <p>
              <strong>Record ID:</strong> {submittedData.id}
            </p>
            <p>
              <strong>Student Name:</strong> {submittedData.studentName}
            </p>
            <p>
              <strong>Student ID:</strong> {submittedData.studentId}
            </p>
            <p>
              <strong>Date:</strong> {submittedData.date}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status-badge status-${submittedData.status}`}>
                {submittedData.status.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>Remarks:</strong>{" "}
              {submittedData.remarks || "No remarks"}
            </p>
            <p>
              <strong>Recorded At:</strong>{" "}
              {new Date(submittedData.recordedAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="reset-btn"
          >
            Record Another Attendance
          </button>
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentName">Student Name:</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={attendance.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student ID:</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={attendance.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={attendance.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={attendance.status}
              onChange={handleChange}
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="excused">Excused</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="remarks">Remarks:</label>
            <textarea
              id="remarks"
              name="remarks"
              value={attendance.remarks}
              onChange={handleChange}
              rows="4"
              placeholder="Add any remarks..."
            ></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Attendance"}
            </button>
          </div>
        </form>
      )}

      <div className="navigation">
        <button onClick={() => navigate("/")} className="nav-btn">
          Go to Feedback
        </button>
        <button onClick={() => navigate("/enrollment")} className="nav-btn">
          Go to Enrollment
        </button>
      </div>
    </div>
  );
}
