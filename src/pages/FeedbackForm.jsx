import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forms.css";

export default function FeedbackForm() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    feedbackType: "general",
    message: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedData(result.data);
        setSubmitted(true);
        alert("✅ Feedback submitted successfully!");
        setFeedback({
          name: "",
          email: "",
          feedbackType: "general",
          message: "",
          rating: 5,
        });
      } else {
        setError(result.message || "Failed to submit feedback");
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
      <h1>Feedback Form</h1>
      {error && <div className="error-message">{error}</div>}

      {submitted && submittedData && (
        <div className="success-box">
          <h2>✅ Feedback Submitted Successfully!</h2>
          <div className="submitted-data">
            <p>
              <strong>ID:</strong> {submittedData.id}
            </p>
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Feedback Type:</strong> {submittedData.feedbackType}
            </p>
            <p>
              <strong>Rating:</strong> {submittedData.rating}/10
            </p>
            <p>
              <strong>Message:</strong> {submittedData.message}
            </p>
            <p>
              <strong>Submitted At:</strong>{" "}
              {new Date(submittedData.submittedAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="reset-btn"
          >
            Submit Another Feedback
          </button>
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="feedbackType">Feedback Type:</label>
            <select
              id="feedbackType"
              name="feedbackType"
              value={feedback.feedbackType}
              onChange={handleChange}
            >
              <option value="general">General</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (1-10):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="10"
              value={feedback.rating}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={feedback.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      )}

      <div className="navigation">
        <button onClick={() => navigate("/attendance")} className="nav-btn">
          Go to Attendance
        </button>
      </div>
    </div>
  );
}
