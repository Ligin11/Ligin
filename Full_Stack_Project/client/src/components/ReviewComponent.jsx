import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const ReviewComponent = ({ vehicleId, bookingId, userId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  useEffect(() => {
    fetchExistingReview();
  }, []);

  const fetchExistingReview = async () => {
    try {
      const { data } = await API.get(`/reviews/user/${userId}/vehicle/${vehicleId}`);
      if (data) {
        setIsReviewSubmitted(true); // Mark as submitted if review exists
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error fetching existing review:', error);
      }
    }
  };

  const submitReview = async () => {
    try {
      await API.post('/reviews', { userId, vehicleId, rating, comment });
      setMessage('Review submitted successfully!');
      setIsReviewSubmitted(true); // Mark as submitted after review
      onReviewSubmitted(); // Notify parent component
    } catch (error) {
      console.error('Failed to submit review:', error);
      setMessage('Failed to submit review.');
    }
  };

  if (isReviewSubmitted) {
    return null; // Hide the component if the review is already submitted
  }

  return (
    <div>
      <h4>Add Review</h4>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        <option value="0">Select Rating</option>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} Star{star > 1 && 's'}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Write your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={submitReview}>Submit Review</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReviewComponent;
