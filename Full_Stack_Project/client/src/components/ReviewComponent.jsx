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
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto animate-fade-in">
      <h4 className="text-xl font-semibold text-indigo-600 text-center mb-4">Add Review</h4>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="0">Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 && 's'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Review</label>
          <textarea
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            rows="4"
          ></textarea>
        </div>
        <button
          type="button"
          onClick={submitReview}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Submit Review
        </button>
        {message && (
          <p className={`text-center mt-2 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ReviewComponent;