import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const VehicleReviews = ({ vehicleId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/reviews/vehicle/${vehicleId}`);
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto animate-fade-in">
      <h3 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
        Approved Reviews
      </h3>
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-gray-200 pb-4 last:border-none"
            >
              <p className="text-lg font-bold text-gray-800">
                {review.user.name} - {review.rating} Star{review.rating > 1 ? 's' : ''}
              </p>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center">No reviews yet.</p>
      )}
    </div>
  );
};

export default VehicleReviews;
