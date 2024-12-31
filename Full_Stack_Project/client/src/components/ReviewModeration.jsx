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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
          Review Moderation
        </h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-gray-200 pb-4 mb-4 last:border-none"
            >
              <p className="text-lg font-bold text-gray-800">
                {review.user.name} reviewed {review.vehicle.model}
              </p>
              <p className="text-gray-600">Rating: {review.rating} Star(s)</p>
              <p className="text-gray-600 mb-4">Comment: {review.comment}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => updateReviewStatus(review._id, 'approved')}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateReviewStatus(review._id, 'rejected')}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">No pending reviews.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewModeration;
