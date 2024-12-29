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
    <div>
      <h3>Approved Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id}>
            <p>
              <strong>{review.user.name}</strong>: {review.rating} Star(s)
            </p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default VehicleReviews;
