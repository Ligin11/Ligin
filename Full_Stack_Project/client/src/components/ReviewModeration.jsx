import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const { data } = await API.get('/reviews/pending');
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch pending reviews:', error);
    }
  };

  const updateReviewStatus = async (reviewId, status) => {
    try {
      await API.put(`/reviews/${reviewId}`, { status });
      fetchPendingReviews(); // Refresh reviews after status update
    } catch (error) {
      console.error(`Failed to ${status} review:`, error);
    }
  };

  return (
    <div>
      <h3>Review Moderation</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id}>
            <p>
              <strong>{review.user.name}</strong> reviewed {review.vehicle.model}
            </p>
            <p>Rating: {review.rating} Star(s)</p>
            <p>Comment: {review.comment}</p>
            <button onClick={() => updateReviewStatus(review._id, 'approved')}>Approve</button>
            <button onClick={() => updateReviewStatus(review._id, 'rejected')}>Reject</button>
          </div>
        ))
      ) : (
        <p>No pending reviews.</p>
      )}
    </div>
  );
};

export default ReviewModeration;
