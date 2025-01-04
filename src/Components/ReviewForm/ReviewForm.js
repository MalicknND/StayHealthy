import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ doctorName, specialty }) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Feedback submitted successfully!');
  };

  return (
    <div className="review-form">
      {submitted ? (
        <p className="thank-you-message">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Feedback Form</h3>
          <p><strong>Doctor Name:</strong> {doctorName}</p>
          <p><strong>Specialty:</strong> {specialty}</p>
          <textarea
            className="feedback-input"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <button className="submit-button" type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
