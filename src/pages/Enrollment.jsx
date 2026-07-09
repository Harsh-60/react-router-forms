import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forms.css";

export default function Enrollment() {
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    enrollmentDate: "",
    dateOfBirth: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnrollment({
      ...enrollment,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollment),
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedData(result.data);
        setSubmitted(true);
        alert("✅ Enrollment submitted successfully!");
        setEnrollment({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          course: "",
          enrollmentDate: "",
          dateOfBirth: "",
          address: "",
        });
      } else {
        setError(result.message || "Failed to submit enrollment");
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
      <h1>Enrollment Form</h1>
      {error && <div className="error-message">{error}</div>}

      {submitted && submittedData && (
        <div className="success-box">
          <h2>✅ Enrollment Submitted Successfully!</h2>
          <div className="submitted-data">
            <p>
              <strong>Enrollment ID:</strong> {submittedData.id}
            </p>
            <p>
              <strong>Full Name:</strong> {submittedData.firstName}{" "}
              {submittedData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Phone:</strong> {submittedData.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {submittedData.dateOfBirth}
            </p>
            <p>
              <strong>Course:</strong> {submittedData.course}
            </p>
            <p>
              <strong>Enrollment Date:</strong> {submittedData.enrollmentDate}
            </p>
            <p>
              <strong>Address:</strong> {submittedData.address}
            </p>
            <p>
              <strong>Registered At:</strong>{" "}
              {new Date(submittedData.registeredAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="reset-btn"
          >
            Enroll Another Student
          </button>
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={enrollment.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={enrollment.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={enrollment.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={enrollment.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={enrollment.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Select Course:</label>
            <select
              id="course"
              name="course"
              value={enrollment.course}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Course --</option>
              <option value="web-development">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="cloud-computing">Cloud Computing</option>
              <option value="cybersecurity">Cybersecurity</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="enrollmentDate">Enrollment Date:</label>
            <input
              type="date"
              id="enrollmentDate"
              name="enrollmentDate"
              value={enrollment.enrollmentDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={enrollment.address}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Enrollment"}
            </button>
          </div>
        </form>
      )}

      <div className="navigation">
        <button onClick={() => navigate("/")} className="nav-btn">
          Go to Feedback
        </button>
        <button onClick={() => navigate("/attendance")} className="nav-btn">
          Go to Attendance
        </button>
      </div>
    </div>
  );
}
